import React from 'react'
import './Ok.css'
import alertImg from '../../Assets/ok.svg'

const Ok = () => {
  return (
    <div className='ok-Alert-Container'>
        <img src={alertImg} alt='Alert'/>
    </div>
  )
}

export default Ok