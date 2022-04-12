import React, { useState } from 'react';
import swal from 'sweetalert';

const initialForm = {
    artist: "",
    song: "",
}

const SongForm = ({handleSearch, handleSaveSong}) => {
    const [form, setForm] = useState(initialForm);
    const [isDisabled, setIsDisabled] = useState(true);

    const handleChange = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!form.artist ||!form.song){
            swal ("Datos incompletos","Complete todas las casillas por favor","error");
            setIsDisabled(true);
            return;
        }

        handleSearch(form);
        setForm(initialForm);
        setIsDisabled(false);
    }

    return ( 
        <>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="artist" 
                    placeholder="Nombre del intérprete" 
                    onChange={handleChange}
                    value={form.artist}
                />

                <input 
                    type="text" 
                    name="song" 
                    placeholder="Nombre de la canción" 
                    onChange={handleChange}
                    value={form.song}
                />

                <input type="submit" value="Enviar" />
                <input type="button" onClick={()=> {handleSaveSong(); setIsDisabled(true);}} disabled={isDisabled} value="Guardar canción" />
            </form>
        </>
    );
}
 
export default SongForm;