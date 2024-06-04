import React, { createContext, useState } from 'react';

const PlaylistLinkStatusContext = createContext();

const PlaylistLinkStatusProvider = ({ children }) => {
    const [isPlaylistLinkSet, setIsPlaylistLinkSet] = useState(false);

    return (
        <PlaylistLinkStatusContext.Provider value={{ isPlaylistLinkSet, setIsPlaylistLinkSet }}>
            {children}
        </PlaylistLinkStatusContext.Provider>
    );
};

export { PlaylistLinkStatusContext, PlaylistLinkStatusProvider };