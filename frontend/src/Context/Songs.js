import React, {useState, useEffect, createContext, useContext} from 'react';
import { PlaylistLinkStatusContext } from './PlaylistLinkStatus';
import axios from '../components/AxiosConfig/axiosConfig'

const SongsContext = createContext();

const SongsProvider = ({children}) => {
    const [videoTitles, setVideoTitles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isDataFetched, setIsDataFetched] = useState(false);
    const {isPlaylistLinkSet, isPlaylistLinkValid, PlaylistID} = useContext(PlaylistLinkStatusContext);

    useEffect(() => {
        if (isPlaylistLinkSet && isPlaylistLinkValid && PlaylistID !== "") {
            setIsLoading(true);
            axios.get(`/videos/${PlaylistID}`)
                .then(res => {
                    setVideoTitles(res.data);
                    setIsLoading(false);
                    setIsDataFetched(true);
                })
                .catch(err => {
                    console.log(err);
                    setIsLoading(false);
                    setIsDataFetched(false);
                    setVideoTitles([]);
                })
        }
    }, [isPlaylistLinkSet, isPlaylistLinkValid, PlaylistID])

    return (
        <SongsContext.Provider value={{videoTitles, setVideoTitles, isLoading, isDataFetched}}>
            {children}
        </SongsContext.Provider>
    )
}

export { SongsContext, SongsProvider };