import React, { createContext, useState } from 'react';

const PlaylistLinkStatusContext = createContext();

const PlaylistLinkStatusProvider = ({ children }) => {
    const [isPlaylistLinkSet, setIsPlaylistLinkSet] = useState(false);
    const [isPlaylistLinkValid, setIsPlaylistLinkValid] = useState(true);

    return (
        <PlaylistLinkStatusContext.Provider value={{ isPlaylistLinkSet, setIsPlaylistLinkSet, isPlaylistLinkValid, setIsPlaylistLinkValid }}>
            {children}
        </PlaylistLinkStatusContext.Provider>
    );
};

export { PlaylistLinkStatusContext, PlaylistLinkStatusProvider };