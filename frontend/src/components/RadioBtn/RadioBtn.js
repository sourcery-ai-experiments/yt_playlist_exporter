import React from 'react'
import './RadioBtn.css'

const RadioBtn = () => {
  return (
    <div className='radio-container'>
        <input type='radio' id='radio' className='RadioBtn'></input>
        <label for='radio'></label>
    </div>
  )
}

export default RadioBtn