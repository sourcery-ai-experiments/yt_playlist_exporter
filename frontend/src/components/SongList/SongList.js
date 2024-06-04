import React, { useContext, useEffect } from 'react'
import './SongList.css'
import { SongsContext } from '../../Context/Songs'
import { PlaylistLinkStatusContext } from '../../Context/PlaylistLinkStatus'

const SongList = () => {
  const { isPlaylistLinkSet, isPlaylistLinkValid } = useContext(PlaylistLinkStatusContext);
  const {videoTitles, isLoading, isDataFetched} = useContext(SongsContext);
  console.log(videoTitles);
  return (
    <div className='SongList-container'>
      {
        isLoading ? 
        <div>Loading...</div> :
        isPlaylistLinkSet && isPlaylistLinkValid ?
          isDataFetched?
            null
            :
            <div className='Link-Not-Found'>
              <h1>Oops!</h1>
              <p>Sorry, we couldn't find any songs in this playlist. Try another one!</p>
            </div>
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
      }
    </div>
  )
}

export default SongList