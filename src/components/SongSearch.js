import React, { useState, useEffect } from 'react';
import SongDetails from './SongDetails';
import SongForm from './SongForm';
import Loader from './Loader';
import { helpHttp } from '../helpers/helpHttp';
import { HashRouter, Link, Routes, Route } from 'react-router-dom';
import SongTable from './SongTable';
import SongPage from '../pages/SongPage';
import { GrFavorite, GrHome } from "react-icons/gr";

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

        localStorage.setItem("mySongs", JSON.stringify(mySongs));
    }, [search, mySongs]);

    const handleSaveSong = () => {
        let currentSong = {
            search,
            lyric,
            bio
        }

        let songs = [...mySongs, currentSong];
        setMySongs(songs);
        setSearch(null);
        localStorage.setItem("mySongs", JSON.stringify(songs));
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
                <Link to="/"><GrFavorite/></Link>
            </header>

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