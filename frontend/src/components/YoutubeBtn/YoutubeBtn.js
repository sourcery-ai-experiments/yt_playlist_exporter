import React,{useContext} from 'react'
import './YoutubeBtn.css'
import ytPlay from '../../Assets/play.png'
import { AuthContext } from '../../Context/AuthContext'
import Alert from '../Alert/Alert'
import Ok from '../OkAlert/Ok'

const YoutubeBtn = ({ onClickFunction }) => {
    const {isYouTubeAuthenticated} = useContext(AuthContext);
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
                    <Ok/>
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