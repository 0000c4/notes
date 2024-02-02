import React, { Children } from 'react';
import styles from './SpanButton.module.css'
function SpanButton({children, ...props}) {
    return (
        <span {...props} className={styles.SpanButton}>{children}</span>
    )
}

export default SpanButton;