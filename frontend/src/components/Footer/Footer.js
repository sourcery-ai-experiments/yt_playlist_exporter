import React from 'react'
import './Footer.css'
const Footer = () => {
    const HarshGitLink = "https://github.com/code-Harsh247/yt_playlist_exporter"
    return (
        <div className='Footer'>
            <div>
                <p>Created by Harsh</p>
            </div>
            <div className='ProjectRepo'>
                <a href={HarshGitLink} target="_blank" rel="noreferrer">Project Repo</a>
            </div>
        </div>
    )
}

export default Footer
