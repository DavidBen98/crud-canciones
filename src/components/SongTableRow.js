import { useNavigate } from "react-router-dom";

const SongTableRow = ({id,handleDeleteSong, el}) => {
    let navigate = useNavigate();

    let {bio, search} =  el;
    let avatar = bio.artists[0].strArtistThumb;
    let avatarStyles = {
        width: "auto",
        height:"40px"
    }
    return ( 
        <tr>
            <td>
                <img src={avatar} style= {avatarStyles} alt={search.artist}/>
            </td>
            <td>{search.artist}</td>
            <td>{search.song}</td>
            <td>
                <button onClick={() => navigate(`/canciones/${id}`)}>Ver</button>
                <button onClick={() => handleDeleteSong(id, el)}>Eliminar</button>
            </td>
        </tr>
    );
}
 
export default SongTableRow;