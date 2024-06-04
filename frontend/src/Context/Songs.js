import React, {useState, useEffect, createContext, useContext} from 'react';
import { PlaylistLinkStatusContext } from './PlaylistLinkStatus';
import axios from '../components/AxiosConfig/axiosConfig'

const SongsContext = createContext();

const SongsProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isDataFetched, setIsDataFetched] = useState(false);
    const [playlistDetails, setPlaylistDetails] = useState({playlistName: '', creator: '', datePublished: '', videoTitles: []});
    const {isPlaylistLinkSet, isPlaylistLinkValid, PlaylistID} = useContext(PlaylistLinkStatusContext);

    useEffect(() => {
        if (isPlaylistLinkSet && isPlaylistLinkValid && PlaylistID !== "") {
            setIsLoading(true);
            axios.get(`/videos/${PlaylistID}`)
                .then(res => {
                    setPlaylistDetails({
                        playlistName: res.data.playlistName,
                        creator: res.data.creator,
                        datePublished: res.data.datePublished,
                        videoTitles: res.data.videoTitles
                    });
                    setIsLoading(false);
                    setIsDataFetched(true);
                })
                .catch(err => {
                    console.log(err);
                    setIsLoading(false);
                    setIsDataFetched(false);
                    setPlaylistDetails({playlistName: '', creator: '', datePublished: '', videoTitles: []});
                })
        }
    }, [isPlaylistLinkSet, isPlaylistLinkValid, PlaylistID])

    return (
        <SongsContext.Provider value={{isLoading, isDataFetched, playlistDetails}}>
            {children}
        </SongsContext.Provider>
    )
}

export { SongsContext, SongsProvider };