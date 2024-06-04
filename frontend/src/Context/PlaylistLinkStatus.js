import React, { createContext, useState } from 'react';

const PlaylistLinkStatusContext = createContext();

const PlaylistLinkStatusProvider = ({ children }) => {
    const [isPlaylistLinkSet, setIsPlaylistLinkSet] = useState(false);
    const [isPlaylistLinkValid, setIsPlaylistLinkValid] = useState(true);
    const [PlaylistID, setPlaylistID] = useState('');

    return (
        <PlaylistLinkStatusContext.Provider value={{ isPlaylistLinkSet, setIsPlaylistLinkSet, isPlaylistLinkValid, setIsPlaylistLinkValid, PlaylistID, setPlaylistID }}>
            {children}
        </PlaylistLinkStatusContext.Provider>
    );
};

export { PlaylistLinkStatusContext, PlaylistLinkStatusProvider };