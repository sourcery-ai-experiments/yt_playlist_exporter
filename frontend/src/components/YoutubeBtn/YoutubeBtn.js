import React,{useContext, useEffect} from 'react'
import './YoutubeBtn.css'
import ytPlay from '../../Assets/play.png'
import { AuthContext } from '../../Context/AuthContext'
import Alert from '../Alert/Alert'
import Ok from '../OkAlert/Ok'
import axios from '../AxiosConfig/axiosConfig'

const YoutubeBtn = () => {
    const {isYouTubeAuthenticated,YTProfile,setYTProfile,setIsYouTubeAuthenticated} = useContext(AuthContext);

    useEffect(() => {
        const fetchAuthStatus = async () => {
            try {
                console.log("Fetching YT authentication status");
                const response = await axios.get('/videos/auth-status', { withCredentials: true });
                const { isGoogleAuthenticated, GoogleProfile } = response.data;
                console.log("YT Auth json: ",response.data);
                setIsYouTubeAuthenticated(isGoogleAuthenticated);
                if (isGoogleAuthenticated) {
                    setYTProfile(GoogleProfile);
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
        try {
            console.log("Authenticating with YouTube");
            const response = await axios.get('/videos/auth',{withCredentials: true});
    
            if (response.data.url) {
                window.location.href = response.data.url; // Redirect to Google OAuth page
            }
    
        } catch (error) {
            console.error('Error authenticating with YouTube:', error);
        }
    };

    return (
        <div className='YtBtn-Container'>
            <button
                onClick={onClickFunction}
                className='YtBtn'
            >
                <div>
                <img src={ytPlay} alt='Youtube'/>
                </div>
            </button>
            {isYouTubeAuthenticated? 
                <div className='Ok-Alert-Container-yt'>
                   <Ok profileImg={YTProfile ? YTProfile.photoUrl : ''} />
                </div>
                :
                <div className='Alert-Container-yt'>
                    <Alert/>
                </div>
            }
        </div>
    )
}

export default YoutubeBtn