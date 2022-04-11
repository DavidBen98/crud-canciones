import { useParams } from "react-router-dom";

const Usuario = () => {
    let { username } = useParams();
    return ( 
        <div>
            <h3>Perifl del Usuario</h3>
            <p>Nombre de usuario:<b>{username}</b></p>
        </div>
     );
}
 
export default Usuario;