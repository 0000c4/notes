import React, { useState, useContext } from 'react';
import Context from '../index';
import Nsearch from '../UI/Nsearch/Nsearch';
import Burger from '../UI/Burger/Burger';
import AddButton from '../UI/AddButton/AddButton';
import NoteViewer from './NoteViewer';
import Sidebar from './Sidebar';
import anchor from '../utils/anchor';
function Header({search, setSearch }) {
    const {store} = useContext(Context);
    const [noteIsEdit, setNoteIsEdit] = useState(false);
    const [sidemenu, setSidemenu] = useState(false);
    const callback = (e) => {
        setNoteIsEdit(false);
        store.AddNote(e);
    }
    anchor('/', '#sidebar', sidemenu, ()=>{
        setSidemenu(false);
    })
    return (
        <div className='container'>
            <div className="header">
                <Burger onClick={()=>{setSidemenu(true)}}></Burger>
                <Sidebar isActive={sidemenu} setActive={setSidemenu} onClick={()=>{setSidemenu(false);}} ></Sidebar>
                <Nsearch search={search} setSearch={setSearch}></Nsearch>
                <AddButton onClick={() => { setNoteIsEdit(true); }}></AddButton>
                <NoteViewer note={{title: "", body: ""}} isActive={noteIsEdit} callback={callback} removeCallback={()=>{window.history.back()}}></NoteViewer>
            </div>
        </div>
    )
}

export default Header;