import React, { useState, useEffect } from 'react';
import SongDetails from './SongDetails';
import SongForm from './SongForm';
import Loader from './Loader';
import { helpHttp } from '../helpers/helpHttp';

const SongSearch = () => {
    const [search, setSearch] = useState(null);
    const [lyric, setLyric] = useState(null);
    const [bio, setBio] = useState(null);
    const [loading, setLoading] = useState(false);

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
    }, [search]);

    return (  
        <div>
            <article className='grid-1'>
                <SongForm handleSearch={handleSearch}></SongForm>
            </article>
            {loading && 
                <article className='loader'>
                    <Loader />
                </article>
            }
            <article className='grid-1-2'>
                {search && !loading && (
                    <SongDetails search={search} lyric={lyric} bio={bio}></SongDetails>
                    )}
            </article>
        </div>
    );
}
 
export default SongSearch;