import React,{useContext, useEffect} from 'react'
import './PlaylistSongs.css'
import SongCard from '../SongCard/SongCard'
import { SongsContext } from '../../Context/Songs'

const PlaylistSongs = () => {
    const {playlistDetails,setSelectedSongs,selectedSongs} = useContext(SongsContext);

    const toggleChecked = (index) => {
      const isCurrentlyChecked = playlistDetails.videoInfo[index].checked;
      playlistDetails.videoInfo[index].checked = !isCurrentlyChecked;
    
      setSelectedSongs([...playlistDetails.videoInfo.filter(video => video.checked)]);
    };

  useEffect(() => {
    console.log("Selected Songs : ", selectedSongs);
  },[selectedSongs])  
  
  return (
    <div className='PlaylistSongs-Container'>
        <div className='PlaylistSongs-List'>
            {playlistDetails.videoInfo.map((video, index) => (
                <SongCard key={index} SongArtist={video.artist} SongTitle={video.title} Thumbnail={video.thumbnail}
                selected = {video.checked}
                onToggle={()=>toggleChecked(index)} />
            ))}
        </div>
    </div>
  )
}

export default PlaylistSongs