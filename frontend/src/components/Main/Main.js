import React, {useState} from 'react'
import './Main.css'
import Btn from '../Btn/Btn'
import InputBox from '../InputBox/InputBox'

const Main = () => {

  const [playlistLink, setPlaylistLink] = useState('');

  //Send to Youtube API
  const handleBtnClick = () => {
    console.log("Playlist Link is ",playlistLink);
  }

  return (
    <div className='Main-container'>
      <div className='Title'>
        <span>SpotyTube.me</span>
      </div>
      <div className='PlaylistLink'>
        <div className='PlaylistLink-InputBox'>
        <InputBox setPlaylistLink={setPlaylistLink}/>
        </div>
        <div className='PlaylistLink-Btn'>
        <Btn BtnText="Get Songs >" BtnWidth="142px" onClickFunction={handleBtnClick}/>
        </div>
      </div>

    </div>
  )
}

export default Main