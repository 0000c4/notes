import React, { useEffect, useMemo, useState } from 'react';
import styles from './NoteViewer.module.css'
import ContentEditable from 'react-contenteditable'
import Modal from '../UI/Modal/Modal';
import Back from '../UI/Buttons/Back/Back';
import Remove from '../UI/Buttons/Remove/Remove';
import ImageAdd from '../UI/Buttons/ImageAdd/ImageAdd';
import anchor from '../utils/anchor';
import { AddImage,BoldText, normalText } from '../utils/editorFunctions';
function NoteViewer({ note, isActive, callback, removeCallback }) {
    const [editingNote, setEditingNote] = useState(note); //эта переменная нужна для временного изменения. финальная запись будет при закрытии.
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);
    useEffect(()=>{
        if(isActive){
            console.log('оно работает один раз вроде')
            setEditingNote(note)
        }
    },[isActive])
    useMemo(() => { //при обновления стейта происходит перерендер компонента, чтобы функция сработала один раз тSут useMemo

        anchor('/', '#editor', isActive, () => {
            callback(editingNote);

        })
    }, [isActive])

    return (
        <Modal isActive={isActive} onClick={() => { window.history.back() }}>
            <div className={styles.viewer}>
                <ContentEditable

                    placeholder="Title..."
                    spellCheck={false}
                    className={styles.viewer__title}
                    html={editingNote.title} // innerHTML of the editable div
                    onChange={evt => { setEditingNote({ ...editingNote, title: evt.target.value }); }} // handle innerHTML change
                />
                <ContentEditable
                    placeholder="Enter text here..."
                    spellCheck={false}
                    tagName="div"
                    className={styles.viewer__body}
                    html={editingNote.body} // innerHTML of the editable div
                    onChange={evt => { setEditingNote({ ...editingNote, body: evt.target.value }); }} // handle innerHTML change
                />
                <div className={styles.viewer__bar}>
                    <Back onClick={() => { window.history.back() }} />
                    
                    <ImageAdd onChange={async (e) => { setEditingNote({ ...editingNote, body: editingNote.body + await AddImage(e.target.files[0])}); }} />
                    {/*<Remove onClick={() => { editingNote.body += BoldText(); forceUpdate(); }} />
                    <Back onClick={() => { editingNote.body += normalText(); forceUpdate(); }} />*/}
                    {/*<Back onClick={() => { editingNote.body+='<img src="https://www.gstatic.com/webp/gallery3/1.sm.png" alt="" srcset="">';forceUpdate(); }} />*/}
                    <Remove onClick={() => { removeCallback(editingNote); }}></Remove>
                </div>
            </div>
        </Modal>
    )
}

export default NoteViewer;