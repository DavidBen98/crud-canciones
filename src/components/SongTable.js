import SongTableRow from "./SongTableRow";

const SongTable = ({mySongs, handleDeleteSong}) => {
    return (  
        <div className="favoritos">
            <h3 style={{minHeight:"20px", textAlign:"center"}}>Mis canciones favoritas</h3>
            <table style={{minHeight:"140px"}}>
                <thead>
                    <tr>
                        <th colSpan="2">Artista</th>
                        <th>Canción</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>      
                    {mySongs.length > 0? (
                        mySongs.map((el,index) => 
                            <SongTableRow key={index} el={el} id={index} handleDeleteSong={handleDeleteSong}/>
                        )
                    ) : (
                        <tr>
                            <td colSpan="4"> Sin canciones favoritas </td>
                        </tr> 
                    )
                    }
                </tbody>
            </table>
        </div>
    );
}
 
export default SongTable;