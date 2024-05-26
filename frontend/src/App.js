import React from "react";
import SongList from "./components/SongList/SongList";
import Main from "./components/Main/Main";
import "./App.css";

const App = () => {
  return (
    <>
      <div className="App-Wrapper">
        <div className="Main-App-Container">
          <Main />
        </div>
        <div className="SongList-App-Container">
          <SongList />
        </div>
      </div>
    </>
  )
};

export default App;