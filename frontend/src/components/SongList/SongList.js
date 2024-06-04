import React, { useState, useContext } from 'react'
import './SongList.css'
import { PlaylistLinkStatusContext } from '../../Context/PlaylistLinkStatus'

const SongList = () => {
  const { isPlaylistLinkSet } = useContext(PlaylistLinkStatusContext);

  return (
    <div className='SongList-container'>
      {
        isPlaylistLinkSet ?
          null
          :
          <div className='Link-Not-Found'>  
            <h1>Hi there!</h1>
            <p>Paste your youtube playlist link to get started!</p>
          </div>
      }
    </div>
  )
}

export default SongList