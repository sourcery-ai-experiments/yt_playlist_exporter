import React, { useContext, useRef, useState } from 'react';
import './CreatePlaylist.css';
import defaultThumbnail from '../../Assets/DefaultThumbnail.jpg';
import Btn from '../Btn/Btn';
import { SongsContext } from '../../Context/Songs';

const CreatePlaylist = () => {
  const { playlistDetails } = useContext(SongsContext);

  const plName = playlistDetails.playlistName;
  const default_desc = 'Playlist created by SpotyTube.me. Enjoy the music!';

  const [thumb, setThumb] = useState(playlistDetails.thumbnail || null);
  const [title, setTitle] = useState(plName || ''); // State for the playlist title
  const [description, setDescription] = useState(default_desc); // State for the playlist description
  const inputRef = useRef(null);

  const handleBtnClick = () => {
    inputRef.current.click();
  };

  const CreatePlaylist = () => {
    console.log("Create Playlist");
    console.log("Playlist Img : ", thumb);
    console.log("Playlist Title : ", title);
    console.log("Playlist Desc : ", description);
  }

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setThumb(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className='Create-Playlist-Container'>
      <input
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        ref={inputRef}
        onChange={handleImageChange}
      />
      <div className='Create-Playlist-Header'>
        <p>Create New Playlist</p>
      </div>
      <div className='Create-Playlist-Info'>
        <div className='Create-Playlist-Img'>
          <div className='Create-Playlist-Img-Container'>
            <img src={thumb || defaultThumbnail} alt="Playlist-Img"></img>
          </div>
          <Btn 
            BtnText="Upload Image"
            BtnWidth="70%"
            onClickFunction={handleBtnClick}
          />
        </div>
        <div className='Create-Playlist-Details'>
          <div className='Create-Playlist-Title'>
            <input
              type="text"
              placeholder="Enter Playlist Title"
              className='TitleInputBox'
              value={title} // Bind state to input
              onChange={(e) => setTitle(e.target.value)} // Update state on change
            />
          </div>
          <div className='Create-Playlist-Desc'>
            <textarea
              placeholder="Enter Playlist Description"
              className='TitleInputBox'
              style={{ height: '75%', padding: '10px' }}
              value={description} // Bind state to textarea
              onChange={(e) => setDescription(e.target.value)} // Update state on change
            />
          </div>
        </div>
      </div>
      <div style={{width:"100%", marginTop:"10px"}}>
      <Btn 
      BtnText="Create Playlist"
      BtnWidth="100%"
      onClickFunction={CreatePlaylist}/>
      </div>
      
    </div>
  );
};

export default CreatePlaylist;