document.addEventListener("DOMContentLoaded", function () {
  // API Key - You'll need to replace this with your own YouTube API key
  const API_KEY = CONFIG.API_KEY;

  // DOM Elements
  const searchBtn = document.getElementById("search-btn");
  const playlistUrlInput = document.getElementById("playlist-url");
  const notFoundElement = document.getElementById("not-found");
  const loadingElement = document.getElementById("loading");
  const playlistResultElement = document.getElementById("playlist-result");

  // Result Elements
  const videoCountElement = document.getElementById("video-count");
  const totalDurationElement = document.getElementById("total-duration");
  const channelTitleElement = document.getElementById("channel-title");
  const speed125Element = document.getElementById("speed-1-25");
  const speed150Element = document.getElementById("speed-1-5");
  const speed175Element = document.getElementById("speed-1-75");
  const speed200Element = document.getElementById("speed-2");

  // Event Listeners
  searchBtn.addEventListener("click", handleSearch);
  playlistUrlInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      handleSearch();
    }
  });

  // Main search function
  async function handleSearch() {
    const playlistUrl = playlistUrlInput.value.trim();
    const playlistId = extractPlaylistId(playlistUrl);

    if (!playlistId) {
      showNotFound();
      return;
    }

    showLoading();

    try {
      const results = await fetchPlaylistData(playlistId);
      displayResults(results);
    } catch (error) {
      console.error("Error fetching playlist data:", error);
      showNotFound();
    }
  }

  // Extract playlist ID from URL
  function extractPlaylistId(url) {
    try {
      const urlObj = new URL(url);
      const params = new URLSearchParams(urlObj.search);
      return params.get("list");
    } catch (error) {
      return null;
    }
  }

  // Fetch playlist data from YouTube API
  async function fetchPlaylistData(playlistId) {
    let nextPageToken = null;
    let allVideos = [];
    let totalResults = 0;
    let channelTitle = "";

    do {
      const playlistResponse = await fetch(
        `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&part=contentDetails&maxResults=50&playlistId=${playlistId}&key=${API_KEY}${
          nextPageToken ? `&pageToken=${nextPageToken}` : ""
        }`
      );

      if (!playlistResponse.ok) {
        throw new Error("Failed to fetch playlist data");
      }

      const playlistData = await playlistResponse.json();

      // Set channel title from first item if available
      if (
        playlistData.items &&
        playlistData.items.length > 0 &&
        !channelTitle
      ) {
        channelTitle = playlistData.items[0].snippet.channelTitle;
      }

      totalResults = playlistData.pageInfo.totalResults;

      // Get video IDs
      const videoIds = playlistData.items.map(
        (item) => item.contentDetails.videoId
      );

      // Fetch video details in batches to avoid exceeding API quota
      for (let i = 0; i < videoIds.length; i += 10) {
        const batchIds = videoIds.slice(i, i + 10).join(",");
        const videoResponse = await fetch(
          `https://youtube.googleapis.com/youtube/v3/videos?part=contentDetails&id=${batchIds}&key=${API_KEY}`
        );

        if (!videoResponse.ok) {
          throw new Error("Failed to fetch video data");
        }

        const videoData = await videoResponse.json();

        // Extract durations
        const videoDurations = videoData.items.map(
          (item) => item.contentDetails.duration
        );
        allVideos = [...allVideos, ...videoDurations];
      }

      nextPageToken = playlistData.nextPageToken;
    } while (nextPageToken);

    // Calculate total duration
    const totalDurationInSeconds = allVideos.reduce((total, duration) => {
      return total + convertDurationToSeconds(duration);
    }, 0);

    return {
      totalVideos: totalResults,
      totalDurationInSeconds,
      channelTitle,
    };
  }

  // Convert ISO 8601 duration format to seconds
  function convertDurationToSeconds(duration) {
    const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
    const matches = duration.match(regex);

    if (!matches) return 0;

    const hours = matches[1] ? parseInt(matches[1]) : 0;
    const minutes = matches[2] ? parseInt(matches[2]) : 0;
    const seconds = matches[3] ? parseInt(matches[3]) : 0;

    return hours * 3600 + minutes * 60 + seconds;
  }

  // Format seconds to human-readable duration
  function formatDuration(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    return `${hours}h ${minutes}m ${seconds}s`;
  }

  // Display results on the page
  function displayResults(results) {
    videoCountElement.textContent = results.totalVideos;
    totalDurationElement.textContent = formatDuration(
      results.totalDurationInSeconds
    );
    channelTitleElement.textContent = results.channelTitle;

    // Calculate and display speeds
    speed125Element.textContent = formatDuration(
      results.totalDurationInSeconds / 1.25
    );
    speed150Element.textContent = formatDuration(
      results.totalDurationInSeconds / 1.5
    );
    speed175Element.textContent = formatDuration(
      results.totalDurationInSeconds / 1.75
    );
    speed200Element.textContent = formatDuration(
      results.totalDurationInSeconds / 2
    );

    hideLoading();
    playlistResultElement.classList.remove("hidden");
  }

  // UI state functions
  function showNotFound() {
    hideLoading();
    playlistResultElement.classList.add("hidden");
    notFoundElement.classList.remove("hidden");
  }

  function showLoading() {
    notFoundElement.classList.add("hidden");
    playlistResultElement.classList.add("hidden");
    loadingElement.classList.remove("hidden");
  }

  function hideLoading() {
    loadingElement.classList.add("hidden");
  }
});
