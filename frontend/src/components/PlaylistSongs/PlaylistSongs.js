import React,{useContext} from 'react'
import './PlaylistSongs.css'
import SongCard from '../SongCard/SongCard'
import { SongsContext } from '../../Context/Songs'

const PlaylistSongs = () => {
    const {playlistDetails} = useContext(SongsContext);
  return (
    <div className='PlaylistSongs-Container'>
        <div className='PlaylistSongs-List'>
            {playlistDetails.videoInfo.map((video, index) => (
                <SongCard key={index} SongArtist={video.artist} SongTitle={video.title} Thumbnail={video.thumbnail} />
            ))}
        </div>
    </div>
  )
}

export default PlaylistSongs