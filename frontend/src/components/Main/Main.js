import React, { useState, useEffect, useContext } from 'react'
import './Main.css'
import { PlaylistLinkStatusContext } from '../../Context/PlaylistLinkStatus'
import Btn from '../Btn/Btn'
import InputBox from '../InputBox/InputBox'
import RadioBtn from '../RadioBtn/RadioBtn'

const Main = () => {
  const { setIsPlaylistLinkSet, isPlaylistLinkSet } = useContext(PlaylistLinkStatusContext);
  const [playlistLink, setPlaylistLink] = useState('');
  const [playlistID, setPlaylistID] = useState('');

  //Send to Youtube API
  const handleBtnClick = () => {
    const youtubePlaylistRegex = /^https?:\/\/(www\.)?youtube\.com\/playlist\?list=[\w-]+$/;
    if (!youtubePlaylistRegex.test(playlistLink)) {
      if (playlistLink !== '') {
        const link = new URL(playlistLink);
        const params = new URLSearchParams(link.search)
        setPlaylistID(params.get('list'));
        setIsPlaylistLinkSet(true);
      } else {
        console.log("Playlist link is empty");
        setIsPlaylistLinkSet(false);
      }
    }
    else {
      console.log("Invalid Youtube Playlist Link");
      setIsPlaylistLinkSet(false);
    }
  }

  useEffect(() => {
    console.log("Is Playlist Link Set ?", isPlaylistLinkSet);
  }, [isPlaylistLinkSet])

  useEffect(() => {
    playlistID != "" ? console.log("Playlist ID is ", playlistID) : console.log("Playlist ID is null");
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