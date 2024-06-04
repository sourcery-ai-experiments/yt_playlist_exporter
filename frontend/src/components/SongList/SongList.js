import React, { useState, useContext } from 'react'
import './SongList.css'
import { PlaylistLinkStatusContext } from '../../Context/PlaylistLinkStatus'

const SongList = () => {
  const { isPlaylistLinkSet, isPlaylistLinkValid } = useContext(PlaylistLinkStatusContext);

  return (
    <div className='SongList-container'>
      {
        isPlaylistLinkSet && isPlaylistLinkValid ?
          null //list down songs here
          :
          isPlaylistLinkValid ?
            <div className='Link-Not-Found'>
              <h1>Hi there!</h1>
              <p>Paste your youtube playlist link to get started!</p>
            </div>
            :
            <div className='Link-Not-Found'>
              <h1>Oops!</h1>
              <p>Thats an invalid link. Paste a valid youtube playlist link only.</p>
            </div>
          // <div className='Link-Not-Found'>  
          //   <h1>Hi there!</h1>
          //   <p>Paste your youtube playlist link to get started!</p>
          // </div>
      }
    </div>
  )
}

export default SongList