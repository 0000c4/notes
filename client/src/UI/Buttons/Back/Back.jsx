import React from 'react';
import img from "./back.png";
import styles from './Back.module.css'
function Back({...props}) {
    return (
        <div {...props}>
            <img className={styles.img}  src={img} alt="" />
        </div>
    )
}

export default Back;