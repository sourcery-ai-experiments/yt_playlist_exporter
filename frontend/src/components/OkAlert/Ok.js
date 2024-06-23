import React from 'react'
import './Ok.css'


const Ok = ({profileImg}) => {
  return (
    <div className='ok-Alert-Container'>
        <img src={profileImg} alt='Alert'/>
    </div>
  )
}

export default Ok