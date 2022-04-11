import { Link, Routes , Route, useMatch, useParams, Outlet } from 'react-router-dom';

const ReactTopics = () => {

    return ( 
        <div>
            <h3>Temas de React</h3>
            <ul>
                <li>
                    <Link to="jsx">JSX</Link>
                </li>
                <li>
                    <Link to="props">Props</Link>
                </li>
                <li>
                    <Link to="estado">Estado</Link>
                </li>
                <li>
                    <Link to="componentes">Componentes</Link>
                </li>
            </ul>

            {/* <Routes>
                <Route path=":topic" element={<Topic />} />
            </Routes>   */}

            <Outlet/>
            {/* Básicamente lo que hace es que en lugar de crear un 
            nuevo Routes en el archivo de ReactTopics, 
            usamos el principal y le decimos que en la ruta 
            /react habrá una ruta anidada y especificamos el 
            nombre de ese nivel de anidamiento 
            (en este caso la sacamos por parámetro) y 
            el componente que debe renderizar para esa ruta.
            Con esto, el componente <ReactTopics /> 
            sabe que tiene que renderizar algo cuando 
            entremos en sus rutas anidada, pero no sabe dónde. 
            Le decimos el lugar con el componente <Outlet /> , 
            y donde esté el <Outlet /> se  pondrá el componente 
            que corresponde con la ruta anidada.   */}
        </div>
    );
}
 
export default ReactTopics;