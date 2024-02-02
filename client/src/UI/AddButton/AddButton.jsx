import React from 'react';
import styles from './Burger.module.css'
function AddButton({...props}) {
    return (
        <div {...props} className={styles.addBtn__container}>
            <div className={styles.addBtn}>
                <span></span>
            </div>
        </div>
    )
}

export default AddButton;