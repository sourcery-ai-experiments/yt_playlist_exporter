import React, { useState } from 'react';
import './RadioBtn.css';

const RadioBtn = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleRadioClick = () => {
    // Toggle the checked state
    setIsChecked(!isChecked);
  };

  return (
    <div className='radio-container'>
        <input 
          type='radio' 
          id='radio' 
          className='RadioBtn' 
          checked={isChecked} 
          onChange={handleRadioClick} 
          onClick={handleRadioClick}
        />
        <label htmlFor='radio'></label>
    </div>
  );
}

export default RadioBtn;