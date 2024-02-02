import React from 'react'
import styles from './Modal.module.css'
function Modal({children, isActive,...props}){
    let style = styles.Modal;
    let ContentStyle = styles.ModalContent;
    if(isActive === true){ style += ' ' + styles.active; ContentStyle += ' ' + styles.active}
    return(
        <div className={style}
            {...props}
        >
            <div className={ContentStyle}  onClick={(event)=> event.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

export default Modal