import React from 'react'
import { useState } from 'react'
import NotFound from './NotFound';
import PlaylistLength from './PlaylistLength';

function Searchbar() {
    const [searchText, setSearchText] = useState("");
    const [notFound, setNotFound] = useState(false);
    const [displayResult, setDisplayResult] = useState(false);

    const handleSearch = async() => {
        if (searchText===""){
            setNotFound(true);
            setDisplayResult(false);
        }
        else{
            setNotFound(false);
            setDisplayResult(true);
        }
    };

    const extractPlaylistId = (url) => {
        try{
            const urlObject = new URL(url);
            const params = new URLSearchParams(urlObject.search);
            return params.get('list');
        }
        catch{
            return null;
        }
    }
    
    const playlistId = extractPlaylistId(searchText);
  return(
    <>
        <div className='searchbar'>
            <input type="text" placeholder='Paste the link of the playlist here' value={searchText} onChange={(e)=>setSearchText(e.target.value)}/>
            <button onClick={handleSearch}>Search</button>
        </div>

        {notFound && <NotFound />}
        {displayResult && <PlaylistLength playlistId={playlistId}/>}
    </>
  )
}

export default Searchbar
