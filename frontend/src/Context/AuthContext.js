import React, { createContext, useState } from 'react';

// Create the AuthContext
export const AuthContext = createContext();

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
    // State to store authentication status
    const [isYouTubeAuthenticated, setIsYouTubeAuthenticated] = useState(false);
    const [isSpotifyAuthenticated, setIsSpotifyAuthenticated] = useState(false);

    return (
        <AuthContext.Provider
            value={{
                isYouTubeAuthenticated,
                setIsYouTubeAuthenticated,
                isSpotifyAuthenticated,
                setIsSpotifyAuthenticated,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};