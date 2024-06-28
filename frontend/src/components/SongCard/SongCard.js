import React,{useContext} from 'react'
import './SongCard.css'
import defaultThumbnail from '../../Assets/DefaultThumbnail.jpg'


const SongCard = ({ SongTitle, SongArtist, Thumbnail, selected, onToggle }) => {
    return (
        <div className='SongCard-Container'>
            <div className='Song-Thumbnail'>
                <img src={Thumbnail || defaultThumbnail} alt="Song Thumbnail" />
            </div>
            <div className='Song-details'>
                <div className='Song-Title'>
                    <p>{SongTitle}</p>
                </div>
                <div className='Song-Artist'>
                    <span>{SongArtist}</span>
                </div>
            </div>
            <div className='Song-Check'>
                <label className="container">
                    <input type="checkbox" checked={selected} onChange={onToggle}/>
                    <div className="checkmark"></div>
                </label>
            </div>
        </div>
    )
}

export default SongCard