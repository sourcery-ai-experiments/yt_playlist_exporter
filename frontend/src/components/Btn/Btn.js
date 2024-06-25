import React from 'react'
import './Btn.css'

const Btn = ({ BtnText, onClickFunction, BtnWidth }) => {
    return (

        <button
            onClick={onClickFunction}
            className='Btn'
            style={{ width: BtnWidth }}>
            {BtnText}
        </button>

    )
}

export default Btn