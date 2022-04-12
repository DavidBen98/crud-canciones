import React, { useState, useEffect } from 'react';
import SongArtist from './SongArtist';
import SongLyric from './SongLyric';
import Message from './Message';

const SongDetails = ({search, lyric, bio}) => {
    if(!lyric || !bio) return null;
    
    return ( 
        <>
            {lyric.error || lyric. err || lyric.name === "AbortError" ?
            <Message 
                msg={`Error: no existe la canción "${search.song}"`}
                bgColor="#dc3545"
            /> : <SongLyric title={search.song} lyrics={lyric.lyrics}></SongLyric>}
            {bio.artists? 
            <SongArtist artist={bio.artists[0]}></SongArtist> : 
            <Message
                msg={`Error: no existe el interprete "${search.artist}"`}
                bgColor="#dc3545"
            />}
        </>
    );
}
 
export default SongDetails;