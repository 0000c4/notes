import React from 'react';
import styles from './Ninput.module.css'
function Ninput({...props}) {
    return (
        <input className={styles.search} {...props}/>
    )
}

export default Ninput;