import React, { useState, useEffect, useContext } from 'react'
import './Main.css'
import { PlaylistLinkStatusContext } from '../../Context/PlaylistLinkStatus'
import { SongsContext } from '../../Context/Songs'
import Btn from '../Btn/Btn'
import PlaylistCard from '../PlaylistCard/PlaylistCard'
import InputBox from '../InputBox/InputBox'
import YoutubeBtn from '../YoutubeBtn/YoutubeBtn'
import SpotBtn from '../SpotifyBtn/SpotBtn'
import RadioBtn from '../RadioBtn/RadioBtn'


const Main = () => {
  const { setIsPlaylistLinkSet, isPlaylistLinkSet, setIsPlaylistLinkValid, setPlaylistID, PlaylistID } = useContext(PlaylistLinkStatusContext);
  const [playlistLink, setPlaylistLink] = useState('');

  const {playlistDetails} = useContext(SongsContext);

  useEffect(() => {
    console.log("Video Titles Count ", playlistDetails.videoInfo.length); // Changed videoTitles to videoInfo
  },[playlistDetails])

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
      {playlistDetails.videoInfo.length>0 ?
        <PlaylistCard 
        PlaylistName={playlistDetails.playlistName}
        PlaylistCreator={playlistDetails.creator}
        VidCount={playlistDetails.videoInfo.length} // Changed videoTitles to videoInfo
        DatePub={playlistDetails.datePublished}
        Thumbnail={playlistDetails.thumbnail}
        />
        :
        null
      }
      <div className='Connect-Section'>
        <YoutubeBtn/>
        <SpotBtn/>
      </div> 
      

    </div>
  )
}

export default Main