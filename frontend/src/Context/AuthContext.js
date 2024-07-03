import React, { createContext, useState,useEffect } from 'react';


// Create the AuthContext
export const AuthContext = createContext();

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
    // State to store authentication status
    const [isYouTubeAuthenticated, setIsYouTubeAuthenticated] = useState(false);
    const [isSpotifyAuthenticated, setIsSpotifyAuthenticated] = useState(false);
    const [YTProfile, setYTProfile] = useState(null);
    const [SpotProfile, setSpotProfile] = useState(null);

    return (
        <AuthContext.Provider
            value={{
                isYouTubeAuthenticated,
                setIsYouTubeAuthenticated,
                isSpotifyAuthenticated,
                setIsSpotifyAuthenticated,
                YTProfile,
                setYTProfile,
                SpotProfile,
                setSpotProfile
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};