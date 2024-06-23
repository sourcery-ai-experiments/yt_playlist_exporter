import React, { useContext, useEffect } from 'react'
import './SongList.css'
import Loader from '../Loader/Loader'
import PlaylistSongs from '../PlaylistSongs/PlaylistSongs'
import { SongsContext } from '../../Context/Songs'
import { PlaylistLinkStatusContext } from '../../Context/PlaylistLinkStatus'

const SongList = () => {
  const { isPlaylistLinkSet, isPlaylistLinkValid } = useContext(PlaylistLinkStatusContext);
  const { isLoading, isDataFetched, playlistDetails } = useContext(SongsContext);
  console.log(playlistDetails);
  return (
    <div className='SongList-container'>
      {
        isLoading ?
          <>
            <div className='SongList-Header'>
              <span>Playlist Songs:</span>
            </div>
            <div className='Loader-Container'>
            <Loader/>
            </div>
            
          </>
          :
          isPlaylistLinkSet && isPlaylistLinkValid ?
            isDataFetched ?
              <>
                <div className='SongList-Header'>
                  <span>Playlist Songs:</span>
                </div>
                <PlaylistSongs />
              </>

              :
              <div className='Link-Not-Found'>
                <h1>Oops!</h1>
                <p>Sorry, we couldn't find any songs in this playlist. Try another one!</p>
              </div>
            :
            isPlaylistLinkValid ?
              <div className='Link-Not-Found'>
                <h1>Hi there!</h1>
                <p>Connect your Youtube and Spotify accounts to get started!</p>
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