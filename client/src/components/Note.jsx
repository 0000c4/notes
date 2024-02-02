import React, { useState, useContext } from 'react';
import Context from '../index';
import styles from './Note.module.css'
import NoteViewer from './NoteViewer';
function Note({ note}) {
    const {store} = useContext(Context)
    const [noteIsEdit, setNoteIsEdit] = useState(false);
    return (
        <div className={styles.note} onClick={()=>{setNoteIsEdit(!noteIsEdit)}}>
            <div className={styles.note__title}dangerouslySetInnerHTML={{__html: note.title}}></div>
            <div className={styles.note__body} dangerouslySetInnerHTML={{__html: note.body}}></div>
            
                <NoteViewer note={note} isActive={noteIsEdit} callback={(e)=>{store.editNote(e);setNoteIsEdit(false);}} removeCallback={(e)=>{store.RemoveNote(e);setNoteIsEdit(false);}}></NoteViewer>
        </div>
    )
}

export default Note;