'use client';
import React from 'react'

import SubscriptionsIcon from '@mui/icons-material/Subscriptions';

function Header() {
  return (
    <>
        <div className='header'>
          <SubscriptionsIcon className='yt-logo'></SubscriptionsIcon>
          <h1>YT <span>Duration Tracker</span></h1>
        </div>
    </>
  )
}

export default Header
