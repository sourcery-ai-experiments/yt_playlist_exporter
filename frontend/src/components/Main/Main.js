import React, { useState, useEffect } from 'react'
import './Main.css'
import Btn from '../Btn/Btn'
import InputBox from '../InputBox/InputBox'
import RadioBtn from '../RadioBtn/RadioBtn'

const Main = () => {

  const [playlistLink, setPlaylistLink] = useState('');
  const [playlistID, setPlaylistID] = useState('');

  //Send to Youtube API
  const handleBtnClick = () => {
    if (playlistLink !== '') {
      console.log("Link is ", playlistLink);
      const link = new URL(playlistLink);
      const params = new URLSearchParams(link.search)
      setPlaylistID(params.get('list'));
    } else {
      console.log("Playlist link is empty");
    }
  }

  useEffect(() => {
    console.log("Playlist ID is ", playlistID);
  }, [playlistID])


  return (
    <div className='Main-container'>
      <div className='Title'>
        <span>SpotyTube.me</span>
      </div>
      <div className='PlaylistLink'>
        <div className='PlaylistLink-InputBox'>
          <InputBox setPlaylistLink={setPlaylistLink} />
        </div>
        <div className='PlaylistLink-Btn'>
          <Btn BtnText="Get Songs >" BtnWidth="142px" onClickFunction={handleBtnClick} />
        </div>
      </div>
      <div className='RadioSection'>
        <div className='Radio-Option'>
        <RadioBtn />
        <p>Create a new Spotify Playlist</p>
        </div>
        
      </div>

    </div>
  )
}

export default Main