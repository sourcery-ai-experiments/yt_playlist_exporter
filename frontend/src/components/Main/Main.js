import React, { useState, useEffect, useContext } from 'react'
import './Main.css'
import { PlaylistLinkStatusContext } from '../../Context/PlaylistLinkStatus'
import Btn from '../Btn/Btn'
import InputBox from '../InputBox/InputBox'
import RadioBtn from '../RadioBtn/RadioBtn'

const Main = () => {
  const { setIsPlaylistLinkSet, isPlaylistLinkSet, setIsPlaylistLinkValid, setPlaylistID, PlaylistID } = useContext(PlaylistLinkStatusContext);
  const [playlistLink, setPlaylistLink] = useState('');

  //Send to Youtube API
  const handleBtnClick = () => {
    const youtubePlaylistRegex = /^https?:\/\/(www\.)?youtube\.com\/(watch\?.*v=[\w-]+&list=|playlist\?list=)[\w-]+(&.*)?$/;
    if (playlistLink !== '' && youtubePlaylistRegex.test(playlistLink)) {
      setIsPlaylistLinkValid(true);
      const link = new URL(playlistLink);
      const params = new URLSearchParams(link.search)
      setPlaylistID(params.get('list'));
      setIsPlaylistLinkSet(true);
    } else {
      if (playlistLink === '') {
        console.log("Playlist link is empty");
      } else {
        console.log("Invalid Youtube Playlist Link");
      }
      setIsPlaylistLinkSet(false);
      setIsPlaylistLinkValid(false);
    }
  }

  useEffect(() => {
    console.log("Is Playlist Link Set ?", isPlaylistLinkSet);
  }, [isPlaylistLinkSet])

  useEffect(() => {
    PlaylistID !== "" ? console.log("Playlist ID is ", PlaylistID) : console.log("Playlist ID is null");
  }, [PlaylistID])


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