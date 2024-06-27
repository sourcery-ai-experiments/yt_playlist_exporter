import React from 'react'
import './CreatePlaylist.css'

const CreatePlaylist = () => {
  return (
    <div className='Create-Playlist-Container'>
      <div className='Create-Playlist-Header'>
        <p>Create New Playlist</p>
      </div>
      <div className='Create-Playlist-Info'>
        <div className='Create-Playlist-Img'>

        </div>
        <div className='Create-Playlist-Details'>
          <div className='Create-Playlist-Title'>
            <input
              type="text"
              placeholder="Enter Playlist Title"
              className='TitleInputBox'
               />
          </div>
          <div className='Create-Playlist-Desc'>
            <input
              type="text"
              placeholder="Enter Playlist Description"
              className='TitleInputBox'
              style={{
                height: '85%',
              }}  
               />
          </div>
        </div>
      </div>

    </div>
  )
}

export default CreatePlaylist