# YT Duration Tracker

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Chrome Extension](#chrome-extension)
- [Technologies Used](#technologies-used)
- [Usage](#usage)

## Overview
YT Duration Tracker is a web application that allows users to analyze YouTube playlists effortlessly. By simply pasting the playlist link and clicking on the search button, users can access valuable insights such as the number of videos, total duration, youtuber details, and durations at different playback speeds.

## Features
- **Playlist Analysis**: Paste your YouTube playlist link to instantly retrieve information about the playlist.
- **Comprehensive Metrics**: Get insights on the number of videos, total duration, and the youtuber associated with the playlist.
- **Playback Speeds**: Explore video durations at different playback speeds - 1x, 1.25x, 1.5x, 1.75x, and 2x.
- **Error Handling**: Receive a "Not Found" message when an invalid or non-existent link is entered.

## Demo
https://github.com/Anuprita579/YT_Duration_Tracker/assets/141035951/eabbe2b4-cb0d-40a0-a0bb-bbab7fea8e87

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/Anuprita579/YT_Duration_Tracker.git
   ```
2. Navigate to project directory
   ```
   cd YT-Duration-Tracker
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Start the application:
   ```
   npm run dev
   ```
Open your browser and visit http://localhost:5173


## Chrome Extension

Want to access the YT Duration Tracker directly from your browser? Follow these steps to install the Chrome Extension:
1.  Get a YouTube API Key
   * Go to Google Cloud Console
   * Create a new project
   * Enable YouTube Data API v3
   * Go to APIs & Services
   * Credentials
   * Click Create Credentials
   * API Key
   * Copy your API Key

2. Add API Key to config.js
Create a file named `config.js` inside the `chrome-extension` folder and paste the following:
```
const CONFIG = {
  API_KEY: 'YOUR-YOUTUBE-API-KEY-HERE'
};
```
Replace `YOUR-YOUTUBE-API-KEY-HERE` with the API key you generated.

3. Install the Extension
   * Download this repository as a ZIP file
   * Extract the `chrome-extension` folder from the ZIP file and place it in a directory of your choice.
   * Open Chrome and go to `chrome://extensions`
   * Enable Developer mode (top right)
   * Click Load unpacked
   * Select the `chrome-extension` folder

The extension is now installed and ready to use!

https://github.com/user-attachments/assets/825450ca-2a0b-4baf-87c2-f2fac695f1d7


## Technologies Used
- React: Frontend
- Axios: API fetching
- SASS: Styling
- Vite: Bundler

## Usage
- **Paste Link**: Enter the YouTube playlist link into the provided input field.
- **Click Search**: Initiate the analysis by clicking the search button.
- **View Results**: Explore the detailed results, including video count, total duration, youtuber information, and durations at various playback speeds.