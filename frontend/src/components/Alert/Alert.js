import React from 'react'
import './Alert.css'
import alertImg from '../../Assets/Alert.svg'

const Alert = () => {
  return (
    <div className='Alert-Container'>
        <img src={alertImg} alt='Alert'/>
    </div>
  )
}

export default Alert