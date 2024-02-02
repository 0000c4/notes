import React from 'react';
import styles from './Burger.module.css'
function Burger({...props}) {
    return (
        <div className={styles.burger__container} {...props}>
            <div className={styles.burger}>
                <span></span>
            </div>
        </div>
    )
}

export default Burger;