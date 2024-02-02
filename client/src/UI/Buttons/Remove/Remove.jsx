import React from 'react';
import img from "./remove.png";
import styles from './Remove.module.css'
function Remove({...props}) {
    return (
        <div {...props}>
            <img className={styles.img}  src={img} alt="" />
        </div>
    )
}

export default Remove;