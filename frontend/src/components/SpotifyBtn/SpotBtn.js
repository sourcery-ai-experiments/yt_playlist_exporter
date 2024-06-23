import React,{useContext,useEffect} from 'react'
import axios from '../AxiosConfig/axiosConfig'
import './SpotBtn.css'
import SpotPlay from '../../Assets/Spotify.png'
import { AuthContext } from '../../Context/AuthContext'
import Alert from '../Alert/Alert'
import Ok from '../OkAlert/Ok'

const SpotBtn = () => {
    const {isSpotifyAuthenticated, SpotProfile, setSpotProfile, setIsSpotifyAuthenticated} = useContext(AuthContext);

    useEffect(() => {
        const fetchAuthStatus = async () => {
            try {
                console.log("Fetching Spotify authentication status");
                const response = await axios.get('/spotify/auth-status', { withCredentials: true });
                const { isSpotyAuthenticated, SpotyProfile } = response.data;
                console.log("Spot Auth json: ",response.data);
                setIsSpotifyAuthenticated(isSpotyAuthenticated);
                if (isSpotyAuthenticated) {
                    setSpotProfile(SpotyProfile);
                }
            } catch (error) {
                console.error('Error fetching authentication status:', error);
            }
        };
    
        // Call fetchAuthStatus immediately
        fetchAuthStatus();
    
        // Add an event listener for the focus event
        const onFocus = () => {
            fetchAuthStatus();
        };
        window.addEventListener('focus', onFocus);
    
        // Cleanup: remove the event listener when the component is unmounted
        return () => {
            window.removeEventListener('focus', onFocus);
        };
    }, []);

    const onClickFunction = async () => {
        try{
            console.log("Authenticating with Spotify");
            const response = await axios.get('/spotify/login',{withCredentials: true});
            if(response.data.url){
                window.location.href = response.data.url; // Redirect to Spotify OAuth page
            }
        }
        catch(error){
            console.error('Error authenticating with Spotify:', error);
        }
    }

    return (
        <div className='SpotBtn-Container'>
            <button
                onClick={onClickFunction}
                className='SpotBtn'
            >
                <div>
                <img src={SpotPlay} alt='Spotify'/>
                </div>
            </button>
            {isSpotifyAuthenticated? 
                <div className='Ok-Alert-Container-Spot'>
                    <Ok profileImg={SpotProfile ? SpotProfile.photoUrl : ''} />
                </div>
                :
                <div className='Alert-Container-Spot'>
                    <Alert/>
                </div>
            }
        </div>
    )
}

export default SpotBtn