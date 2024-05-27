import React from 'react'
import './Btn.css'

const Btn = ({BtnText, onClickFunction,BtnWidth}) => {
return (
    <div className='Btn-Container'>
            <button 
            onClick={onClickFunction} 
            className='Btn'
            style={{ width: BtnWidth }}>
            {BtnText}
            </button>
    </div>
)
}

export default Btn