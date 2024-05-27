import React from 'react'
import './InputBox.css'

const InputBox = ({ setPlaylistLink }) => {
    const handleLink = (e) => {
        setPlaylistLink(e.target.value);
        // console.log("Link is ", e.target.value);
    }

    return (
        <div>
            <input
                type="text"
                placeholder="Paste your Youtube Playlist link"
                className='InputBox' 
                onChange={handleLink}/>
        </div>
    )
}

export default InputBox