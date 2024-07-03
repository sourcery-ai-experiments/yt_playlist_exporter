import React, { useState, useEffect, useContext, useRef } from 'react'
import './Main.css'
import { PlaylistLinkStatusContext } from '../../Context/PlaylistLinkStatus'
import { SongsContext } from '../../Context/Songs'
import Btn from '../Btn/Btn'
import PlaylistCard from '../PlaylistCard/PlaylistCard'
import InputBox from '../InputBox/InputBox'
import YoutubeBtn from '../YoutubeBtn/YoutubeBtn'
import SpotBtn from '../SpotifyBtn/SpotBtn'
import CreatePlaylist from '../CreatePlaylist/CreatePlaylist'
import { AuthContext } from '../../Context/AuthContext'


const Main = () => {
  const { setIsPlaylistLinkSet, isPlaylistLinkSet, setIsPlaylistLinkValid, setPlaylistID, PlaylistID, setIdType,setMixLink } = useContext(PlaylistLinkStatusContext);
  const {isYouTubeAuthenticated, isSpotifyAuthenticated} = useContext(AuthContext);
  const [playlistLink, setPlaylistLink] = useState('');
  const [option, setOption] = useState(null);
  const createPlaylistRef = useRef(null);

  const handleOptionSelect = (opt)=>{
    if(isSpotifyAuthenticated){
      setOption(opt);
    console.log("Option Selected ", opt);
    }
    else {
      alert("Please Connect to Spotify First");
    }
    
  }

  const {playlistDetails} = useContext(SongsContext);

  useEffect(() => {
    if (option === 1 && createPlaylistRef.current) {
      createPlaylistRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [option]);

  useEffect(() => {
    console.log("Video Titles Count ", playlistDetails.videoInfo.length); // Changed videoTitles to videoInfo
  },[playlistDetails])

  //Send to Youtube API
  const handleBtnClick = () => {
    if(isYouTubeAuthenticated){
      const youtubePlaylistRegex = /^https?:\/\/(www\.)?youtube\.com\/(watch\?.*v=[\w-]+&list=|playlist\?list=)[\w-]+(&.*)?$/;
    if (playlistLink !== '' && youtubePlaylistRegex.test(playlistLink)) {
      setIsPlaylistLinkValid(true);
      const link = new URL(playlistLink);
      const params = new URLSearchParams(link.search)
      const plId = params.get('list');
      if(plId.substring(0, 2) === 'RD') {
        setMixLink(playlistLink);
        setIdType('Mix');
      }else {
        setIdType('Playlist');
      }
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
    else{
      alert("Please Connect to Youtube First");
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
        <>
          <PlaylistCard 
        PlaylistName={playlistDetails.playlistName}
        PlaylistCreator={playlistDetails.creator}
        VidCount={playlistDetails.videoInfo.length} // Changed videoTitles to videoInfo
        DatePub={playlistDetails.datePublished}
        Thumbnail={playlistDetails.thumbnail}
        />
        <div className='Option-Section'>
        <div className='Option-Section-Header'>
          <p>What do you wanna do?</p>
        </div>
        <div className='Options-Container'>
        <Btn BtnText="Create New Playlist" BtnWidth="49%" onClickFunction={()=>handleOptionSelect(1)} />
        <Btn BtnText="Add Songs to a Playlist" BtnWidth="49%" onClickFunction={()=>handleOptionSelect(2)} />
        </div>
      </div>
        </>
        :
        null
      }
      <div className='Connect-Section'>
        <YoutubeBtn/>
        <SpotBtn/>
      </div> 
      
      {
        option === 1 ? 
        <>
        <CreatePlaylist/>
        <div className='Empty' ref={createPlaylistRef}></div>
        </>
        
        :
        null
      
      }
    </div>
  )
}

export default Main