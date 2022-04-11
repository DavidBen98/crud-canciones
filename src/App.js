import SongSearch from "./components/SongSearch";
import "./App.css";
import { HashRouter, Link, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div id="content">
      <h1>
        Buscador de canciones
      </h1>
      <HashRouter>
        <SongSearch></SongSearch>
      </HashRouter>
    </div>
  );
}

export default App;