import React,{useContext} from 'react'
import './YoutubeBtn.css'
import ytPlay from '../../Assets/play.png'
import { AuthContext } from '../../Context/AuthContext'
import Alert from '../Alert/Alert'
import Ok from '../OkAlert/Ok'
import axios from 'axios'

const YoutubeBtn = () => {
    const {isYouTubeAuthenticated,YTProfile,setIsYouTubeAuthenticated} = useContext(AuthContext);
    console.log("YTProfile : ",YTProfile);

    const onClickFunction = async () => {
        try {
            console.log("Authenticating with YouTube");
            const response = await axios.get('http://localhost:4000/videos/auth',{withCredentials: true});
            if (response.data.isYouTubeAuthenticated) {
                setIsYouTubeAuthenticated(true); // Update authentication state
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