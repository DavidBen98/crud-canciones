import SongLyric from "./SongLyric";
import "./SongFavorite.css";

const SongFavorite = ({mySongs, handleDeleteSong}) => {
    return (
        <div>
            <h1>Mis canciones</h1>
            <div className="fav">
                {mySongs.map((el,index) => 
                    <>
                        <SongLyric title={el.search.song} lyrics={el.lyric.lyrics} />
                    </>
                )}
            </div>
        </div>
      );
}
 
export default SongFavorite;