import React, {useState, useEffect, createContext, useContext} from 'react';
import { PlaylistLinkStatusContext } from './PlaylistLinkStatus';
import axios from '../components/AxiosConfig/axiosConfig'

const SongsContext = createContext();

const SongsProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isDataFetched, setIsDataFetched] = useState(false);
    const [playlistDetails, setPlaylistDetails] = useState({playlistName: '', creator: '', datePublished: '', videoInfo: []}); 
    const [selectedSongs, setSelectedSongs] = useState([]); // [ {title: '', artist: '', thumbnail: ''}
    const {isPlaylistLinkSet, isPlaylistLinkValid, PlaylistID, IdType,mixLink} = useContext(PlaylistLinkStatusContext);

    useEffect(() => {
        if (isPlaylistLinkSet && isPlaylistLinkValid && PlaylistID !== "") {
            setIsLoading(true);
            console.log("Playlist ID at Songs is ", PlaylistID);
            console.log("Id type : ", IdType);

            if(IdType === 'Mix') {
                console.log("Mix Link is : ", mixLink);
                axios.get('/videos/mix', { params: { mixUrl: mixLink }, withCredentials: true })
                .then(res => {
                    console.log(res.data.videoInfo);
                    setPlaylistDetails({
                        playlistName: res.data.mixName,
                        creator: 'Youtube',
                        datePublished: '',
                        videoInfo: res.data.videoInfo,
                        thumbnail: res.data.firstVideoThumbnail
                    });
                    setIsLoading(false);
                    setIsDataFetched(true);
                })
                .catch(err => {
                    console.log(err);
                    setIsLoading(false);
                    setIsDataFetched(false);
                    setPlaylistDetails({playlistName: '', creator: '', datePublished: '', videoInfo: [], thumbnail: ''}); 
                })
            }
            else if(IdType === 'Playlist') {
                axios.get(`/videos/${PlaylistID}`, {withCredentials: true})
                .then(res => {

                    const newVideoInfo = res.data.videoInfo.map(video => ({
                        ...video,
                        checked: true
                    }));

                    setPlaylistDetails({
                        playlistName: res.data.playlistName,
                        creator: res.data.creator,
                        datePublished: res.data.datePublished,
                        videoInfo: newVideoInfo,
                        thumbnail: res.data.firstVideoThumbnail
                    });
                    setIsLoading(false);
                    setIsDataFetched(true);
                })
                .catch(err => {
                    console.log(err);
                    setIsLoading(false);
                    setIsDataFetched(false);
                    setPlaylistDetails({playlistName: '', creator: '', datePublished: '', videoInfo: [], thumbnail: ''}); // videoTitles is now videoInfo
                })
            }
            else{
                    //video playlist
            }

            
        }
    }, [isPlaylistLinkSet, isPlaylistLinkValid, PlaylistID])

    return (
        <SongsContext.Provider value={{isLoading, isDataFetched, playlistDetails,selectedSongs,setSelectedSongs,setPlaylistDetails}}>
            {children}
        </SongsContext.Provider>
    )
}

export { SongsContext, SongsProvider };