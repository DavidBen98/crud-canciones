import React, { useState, useEffect } from 'react';

const SongArtist = ({artist}) => {
    return ( 
        <section>
            <h3>{artist.strArtist}</h3>
            <div className='content-artist'>
                <div className='content-artist__info'>
                    <p>{artist.intBornYear} - {artist.intDiedYear || "Presente"}</p>
                    <p>{artist.strCountry}</p>
                    <p>{artist.strGenre} - {artist.strStyle}</p>
                    <a href={`http://${artist.strWebsite}`} target="_blank" rel="noreferrer">Sitio Web Oficial</a>
                </div>
                <img src={artist.strArtistThumb} alt= "{artist.strArtists}"/>
            </div>
            <p>{artist.strBiographyEN}</p>
        </section>
    );
}
 
export default SongArtist;