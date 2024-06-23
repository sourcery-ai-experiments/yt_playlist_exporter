import React from "react";
import { PlaylistLinkStatusProvider } from "./Context/PlaylistLinkStatus";
import SongList from "./components/SongList/SongList";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import "./App.css";
import { SongsProvider } from "./Context/Songs";
import { AuthProvider } from "./Context/AuthContext";

const App = () => {
  return (
    <>
      <AuthProvider>
      <PlaylistLinkStatusProvider>
        <SongsProvider>
          <div className="App-Wrapper">
            <div className="Main-App-Container">
              <Main />
            </div>
            <div className="SongList-App-Container">
              <SongList />
            </div>
            <div className="Footer-Container">
              <Footer />
            </div>
          </div>
        </SongsProvider>
      </PlaylistLinkStatusProvider>
      </AuthProvider>
    </>
  )
};

export default App;