import React, { useState, useEffect } from 'react';
import SongDetails from './SongDetails';
import SongForm from './SongForm';
import Loader from './Loader';
import { helpHttp } from '../helpers/helpHttp';
import { HashRouter, Link, Routes, Route } from 'react-router-dom';
import SongTable from './SongTable';
import SongPage from '../pages/SongPage';
import { GrFavorite, GrHome } from "react-icons/gr";
import SongFavorite from './SongFavorite';
import { isDisabled } from '@testing-library/user-event/dist/utils';

let mySongsInit = JSON.parse(localStorage.getItem("mySongs" )) || [];

const SongSearch = () => {
    const [search, setSearch] = useState(null);
    const [lyric, setLyric] = useState(null);
    const [bio, setBio] = useState(null);
    const [loading, setLoading] = useState(false);
    const [mySongs, setMySongs] = useState(mySongsInit);

    const handleSearch = (data) => {
        setSearch(data);
    }

    useEffect(() => {
        if (search === null) return;
        
        const fetchData = async () => {
            const {artist,song} = search;

            let artistUrl = `https://www.theaudiodb.com/api/v1/json/2/search.php?s=${artist}`;
            let songUrl = `https://api.lyrics.ovh/v1/${artist}/${song}`;

            setLoading(true);
            const [artistRes, songRes] = await Promise.all([
                helpHttp().get(artistUrl), 
                helpHttp().get(songUrl),
            ]);

            setBio(artistRes);
            setLyric(songRes);
            setLoading(false);
        }

        fetchData();

        if (bio !== null){
            localStorage.setItem("mySongs", JSON.stringify(mySongs));
        } 
    }, [search, mySongs]);

    const handleSaveSong = () => {
        let currentSong = {
            search,
            lyric,
            bio
        }

        console.log(currentSong);

        let songRepeat = mySongs.find(el => el.search.artist.toLowerCase() === currentSong.search.artist.toLowerCase() 
            && el.search.song.toLowerCase() === currentSong.search.song.toLowerCase());

        if (songRepeat) {
            alert("La canción ya está añadida a su lista de favoritos");
        } else if (currentSong.bio.artists === null){
            alert("El artista es nulo, reintente por favor");
        }
        else if (currentSong.lyric.code === 20 || currentSong.lyric.status === 404){
            alert("La canción no ha sido encontrada, reintente por favor");
        }
        else {
            let songs = [...mySongs, currentSong];
            setMySongs(songs);
            localStorage.setItem("mySongs", JSON.stringify(songs));
            alert("La canción se ha añadido a su lista de favoritos");
        }

        setSearch(null);
    }

    const handleDeleteSong = (id) => {
        let isDelete = window.confirm(`¿Estas seguro de eliminar la cancion con el id "${id}?`);     

        if (isDelete){
            let songs = mySongs.filter((el,index) => index !== id);
            setMySongs(songs);
            localStorage.setItem("mySongs", JSON.stringify(songs));
        }
    }

    return (  
        <div>
            <header>
                <Link to="/"><GrHome/></Link>
                <Link to="/canciones"><GrFavorite/></Link>
            </header>

            <Routes>
                <Route path="/canciones" element={<SongFavorite mySongs={mySongs} handleDeleteSong={handleDeleteSong} />}/>
            </Routes>

            <article className='grid-1-2'>
                <Routes>
                    <Route path="/" element={
                        <>
                            <SongForm handleSearch={handleSearch} handleSaveSong={handleSaveSong}></SongForm>
                            <SongTable mySongs={mySongs} handleDeleteSong={handleDeleteSong} />
                            {search && !loading && (
                                <SongDetails search={search} lyric={lyric} bio={bio}/>
                            )}
                        </>
                    }/>    

                    <Route path="/canciones/:id" element={<SongPage mySongs={mySongs}/>}/>
                </Routes>    
            </article>

            {loading && 
                <article className='loader'>
                    <Loader />
                </article>
            }
        </div>
    );
}
 
export default SongSearch;