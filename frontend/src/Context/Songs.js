import React, {useState, useEffect, createContext, useContext} from 'react';
import { PlaylistLinkStatusContext } from './PlaylistLinkStatus';
import axios from '../components/AxiosConfig/axiosConfig'

const SongsContext = createContext();

const SongsProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isDataFetched, setIsDataFetched] = useState(false);
    const [playlistDetails, setPlaylistDetails] = useState({playlistName: '', creator: '', datePublished: '', videoInfo: []}); // Renamed videoTitles to videoInfo
    const {isPlaylistLinkSet, isPlaylistLinkValid, PlaylistID, IdType} = useContext(PlaylistLinkStatusContext);

    useEffect(() => {
        if (isPlaylistLinkSet && isPlaylistLinkValid && PlaylistID !== "") {
            setIsLoading(true);
            console.log("Playlist ID at Songs is ", PlaylistID);
            console.log("Id type : ", IdType);

            if(IdType === 'Mix') {
                //Hit the mix endpoint. Mix endpoint not yet tested
            }
            else if(IdType === 'Playlist') {
                axios.get(`/videos/${PlaylistID}`, {withCredentials: true})
                .then(res => {
                    setPlaylistDetails({
                        playlistName: res.data.playlistName,
                        creator: res.data.creator,
                        datePublished: res.data.datePublished,
                        videoInfo: res.data.videoInfo, //videoTitles is now videoInfo
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
        <SongsContext.Provider value={{isLoading, isDataFetched, playlistDetails}}>
            {children}
        </SongsContext.Provider>
    )
}

export { SongsContext, SongsProvider };