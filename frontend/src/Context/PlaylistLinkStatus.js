import React, { createContext, useState } from 'react';

const PlaylistLinkStatusContext = createContext();

const PlaylistLinkStatusProvider = ({ children }) => {
    const [isPlaylistLinkSet, setIsPlaylistLinkSet] = useState(false);
    const [isPlaylistLinkValid, setIsPlaylistLinkValid] = useState(true);
    const [PlaylistID, setPlaylistID] = useState('');
    const [IdType, setIdType] = useState('');
    const [mixLink, setMixLink] = useState('');

    return (
        <PlaylistLinkStatusContext.Provider value={{ isPlaylistLinkSet, setIsPlaylistLinkSet, isPlaylistLinkValid, setIsPlaylistLinkValid, PlaylistID, setPlaylistID, IdType, setIdType,mixLink, setMixLink }}>
            {children}
        </PlaylistLinkStatusContext.Provider>
    );
};

export { PlaylistLinkStatusContext, PlaylistLinkStatusProvider };