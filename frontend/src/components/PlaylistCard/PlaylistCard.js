import React, {useContext} from 'react'
import './PlaylistCard.css'
import defaultThumbnail from '../../Assets/DefaultThumbnail.jpg'
import { PlaylistLinkStatusContext } from '../../Context/PlaylistLinkStatus'

const PlaylistCard = ({ PlaylistName, PlaylistCreator, VidCount, DatePub, Thumbnail }) => {
    const {IdType} = useContext(PlaylistLinkStatusContext)
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
                    {DatePub && <span>Published on {new Date(DatePub).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })}</span>}
                </div>
                <div className='ID-type'> 
                        <span>{IdType}</span>
                </div>
            </div>
        </div>
    )
}

export default PlaylistCard