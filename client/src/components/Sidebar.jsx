import React, { useState, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import LoginForm from './LoginForm';
import RegForm from './RegForm';
import Context from '../index'
import styles from './Sidebar.module.css'
import Back from '../UI/Buttons/Back/Back';
import anchor from '../utils/anchor';
function Sidebar({ isActive, setActive, ...props }) {
    const { store } = useContext(Context)
    const [loginForm, setLoginForm] = useState(false);
    const [regForm, setRegForm] = useState(false);
    let style = styles.Modal;
    let ContentStyle = styles.ModalContent;
    if (isActive === true) { style += ' ' + styles.active; ContentStyle += ' ' + styles.active }
    
    anchor('#sidebar', '#sidebar#login', loginForm, ()=>{
        setLoginForm(false);
    })
    anchor('#sidebar#login', '#sidebar#login#reg', regForm, ()=>{
        setRegForm(false);
    })
    return (
        <div className={style}
            {...props}
        >
            <div className={ContentStyle} onClick={(event) => event.stopPropagation()}>
                {store.isAuth ?
                    <div className={styles.authBlock}>
                        <span className={styles.authBlock__name}>{store.user.name}</span>
                        <span className={styles.authBlock__logout}
                            onClick={async () => {
                               await store.logout();
                               window.location.reload();
                            }}
                        >logout</span>
                    </div>
                    :
                    <div className={styles.authBlock}>
                        <span className={styles.authBlock__name}>sign in to your account for sync</span>
                        <span className={styles.authBlock__text} onClick={() => { setLoginForm(true) }}>login</span>
                    </div>}
                <LoginForm isActive={loginForm} setActive={setLoginForm} setRegForm={setRegForm}></LoginForm>
                <RegForm isActive={regForm} setActive={setRegForm}></RegForm>
                <Back className={styles.backButton} onClick={() => {window.history.back() }}></Back>
            </div>
        </div>
    )
}

export default observer(Sidebar)