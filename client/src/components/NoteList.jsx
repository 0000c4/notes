import React,{useContext} from 'react';
import { observer } from 'mobx-react-lite';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Note from './Note';
import Context from '../index';
function NoteList() {
    const {store} = useContext(Context);
    return (
        <TransitionGroup className='body'>
        {store.searchedNotes.map(note => {
            return (
                <CSSTransition
                    key={note._id}
                    timeout={300}
                    classNames="item"
                >
                    <Note note={note} key={note._id}></Note>
                </CSSTransition>)
        })}
        <div className='ghost_note'></div>
        <div className='ghost_note'></div>
    </TransitionGroup>
    )
}

export default observer(NoteList);