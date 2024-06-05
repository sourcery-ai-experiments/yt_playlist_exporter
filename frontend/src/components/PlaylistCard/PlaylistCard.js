import React from 'react'
import './PlaylistCard.css'
import defaultThumbnail from '../../Assets/DefaultThumbnail.jpg'

const PlaylistCard = ({ PlaylistName, PlaylistCreator, VidCount, DatePub, Thumbnail }) => {
    return (
        <div className='PlaylistCard-Container'>
            <div className='Playlist-Thumbnail'>
                <img src={Thumbnail || defaultThumbnail} alt="Playlist Thumbnail" />
            </div>
            <div className='Playlist-Info'>
                <div className='Playlist-Title'>
                    <div className='Playlist-Name'>
                        <p>{PlaylistName}</p>
                    </div>
                    <div className='Playlist-Creator'>
                        <span>By {PlaylistCreator}</span>
                    </div>
                </div>
                <div className='Other-info'>
                    <span>{VidCount} videos</span>
                    <span>Published on {new Date(DatePub).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>
            </div>
        </div>
    )
}

export default PlaylistCard