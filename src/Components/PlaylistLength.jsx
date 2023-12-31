import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PlaylistLength({playlistId}) {
  const [playlistItem, setPlaylistItem] = useState({items: []});
  const [duration, setDuration] = useState(0);
  
  useEffect(()=>{
    const fetchPlaylistData = async() =>{
      try{
        const playlistResponse = await axios.get(`https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&part=contentDetails&maxResults=50&playlistId=${playlistId}&key=${import.meta.env.VITE_API_KEY}`);
        const playlistData = playlistResponse.data;
        setPlaylistItem(playlistData);

        const videoIds = playlistData.items.map(item => item.contentDetails.videoId);
        const videoDetails = await Promise.all(
          videoIds.map(async videoId => {
            const videoResponse = await axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&part=contentDetails&id=${videoId}&key=${import.meta.env.VITE_API_KEY}`);
            const videoData = videoResponse.data;
            return videoData?.items[0]?.contentDetails?.duration;
          })
        );

        console.log(videoDetails);

        const totalDurationInSeconds = videoDetails.reduce((total, duration)=>{
          return total + convertDurationToSeconds(duration);
        }, 0);
        setDuration(totalDurationInSeconds);
      }
      catch{
        console.log("Error ")
      }  
    }

  fetchPlaylistData();
  },[playlistId]);

  const convertDurationToSeconds = (duration) => {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    const hours = parseInt(match[1]) || 0;
    const minutes = parseInt(match[2]) || 0;
    const seconds = parseInt(match[3]) || 0;
    return hours*3600 + minutes *60 + seconds;
  }

  const formatDuration = (totalSeconds) => {
    const hours = Math.floor(totalSeconds/3600);
    const minutes = Math.floor((totalSeconds%3600) / 60);
    const seconds = totalSeconds%60;
    return `${hours}h ${minutes}m ${seconds}`;
  }

  const post = playlistItem.items[0];
  
  return (
    <>
      <div className='playlist-length' key={post?.id}>
        <h3>Number of Videos : <span> {playlistItem?.pageInfo?.totalResults}</span> </h3>
        <h3>Total Duration : <span> {formatDuration(duration)}</span> </h3>
        <h3>Youtuber : <span> {post?.snippet?.channelTitle}</span> </h3>
      </div>    
    </>
  )
}

export default PlaylistLength
