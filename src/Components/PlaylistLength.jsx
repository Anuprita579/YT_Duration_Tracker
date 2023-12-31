import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PlaylistLength({playlistId}) {
  const [playlistItem, setPlaylistItem] = useState({items: []});
  
  useEffect(()=>{
    axios
      .get(`https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&part=contentDetails&maxResults=5000&playlistId=${playlistId}&key=${import.meta.env.VITE_API_KEY}`)
      .then((res)=> setPlaylistItem(res.data));
  },[playlistId]);

  const post = playlistItem.items[0];
  if(!post || !post.snippet){
    return(
      <div className='not-found'>
        <h1>Playlist not found</h1>
      </div>
    )
  }
  return (
    <>
      <div className='playlist-length' key={post?.id}>
        <h3>Number of Videos : <span> {playlistItem?.pageInfo?.totalResults}</span> </h3>
        <h3>Total Duration : <span> 1hr 45 min</span> </h3>
        <h3>Youtuber : <span> {post?.snippet?.channelTitle}</span> </h3>
      </div>    
    </>
  )
}

export default PlaylistLength
