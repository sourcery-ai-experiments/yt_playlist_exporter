import React from 'react'
import './Main.css'
import Btn from '../Btn/Btn'

const Main = () => {
  return (
    <div className='Main-container'>
      <h1>Click the button below to see the magic happen!</h1>
      <Btn BtnText='Click me!' 
      onClickFunction={() => console.log('Hello, World!')} 
      BtnWidth="142px"/>
    </div>
  )
}

export default Main