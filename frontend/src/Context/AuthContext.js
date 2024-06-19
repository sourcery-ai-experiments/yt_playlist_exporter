import React, { createContext, useState,useEffect } from 'react';
import axios from '../components/AxiosConfig/axiosConfig';

// Create the AuthContext
export const AuthContext = createContext();

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
    // State to store authentication status
    const [isYouTubeAuthenticated, setIsYouTubeAuthenticated] = useState(true);
    const [isSpotifyAuthenticated, setIsSpotifyAuthenticated] = useState(false);
    const [YTProfile, setYTProfile] = useState(null);

    useEffect(() => {
        // Function to fetch authentication status and profile from backend
        const fetchAuthStatus = async () => {
          try {
            const response = await axios.get('videos/auth-status'); 
            const { isGoogleAuthenticated, GoogleProfile } = response.data;
            setIsYouTubeAuthenticated(isGoogleAuthenticated);
            if (isGoogleAuthenticated) {
              setYTProfile(GoogleProfile);
            }
          } catch (error) {
            console.error('Error fetching authentication status:', error);
          }
        };
    
        fetchAuthStatus();
      }, []);

    return (
        <AuthContext.Provider
            value={{
                isYouTubeAuthenticated,
                setIsYouTubeAuthenticated,
                isSpotifyAuthenticated,
                setIsSpotifyAuthenticated,
                YTProfile
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};