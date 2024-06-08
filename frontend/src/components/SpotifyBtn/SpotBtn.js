import React,{useContext} from 'react'
import './SpotBtn.css'
import SpotPlay from '../../Assets/Spotify.png'
import { AuthContext } from '../../Context/AuthContext'
import Alert from '../Alert/Alert'
import Ok from '../OkAlert/Ok'

const SpotBtn = ({ onClickFunction }) => {
    const {isSpotifyAuthenticated} = useContext(AuthContext);
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
                    <Ok/>
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