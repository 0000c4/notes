import React, { useState, useContext, useEffect, useMemo } from 'react';
import { observer } from 'mobx-react-lite'
import Context from '../index';
import { emailValidation, passwordValidation } from '../utils/validation'
import styles from './LoginForm.module.css'
import Ninput from '../UI/Ninput/Ninput';
import SpanButton from '../UI/Buttons/SpanButton/SpanButton';
import Loading from '../UI/Loading/Loading';
import anchor from '../utils/anchor';
function LoginForm({ isActive, setActive, setRegForm }) {

    const { store } = useContext(Context);

    const [userLogin, setUserLogin] = useState({ email: "", password: "" })
    const [error, setError] = useState({ password: 'password is empty', email: 'email is empty' });
    const [loginButton, setLoginButton] = useState(false);
    const [resetPassword, setResetPassword] = useState(false);
    const [successEmail, setSuccessEmail] = useState(false);
    const [loading, setLoading] = useState(false)
    let style = styles.LoginForm;
    if (isActive === true) { style += ' ' + styles.active; }
    anchor('#sidebar#login', '#sidebar#login#resetpassword', resetPassword, () => {
        setResetPassword(false);
    })
    const loginButtonFunc = async () => {
        console.log(error)
        if (error.password != "" || error.email != "") {
            setLoginButton(true);
        }
        else {
            setLoading(true)
            const externalError = await store.login(userLogin.email, userLogin.password);
            if (typeof externalError != "undefined") {
                setLoginButton(true);
                setError({ ...error, password: externalError?.message == undefined ? 'check network connection' : externalError.message })
            }
            else { setActive(false) }
            setLoading(false)
        }
    }

    const sendButtonFunc = async () => { //функция отправки письма восстановления
        if (error.email != "") {
            setLoginButton(true);
        }
        else {
            setLoading(true)
            const externalError = await store.sendResetPasswordEmail(userLogin.email);
            if (typeof externalError != "undefined") {
                setLoginButton(true);
                setError({ ...error, email: 'error' })
            }
            else {
                setSuccessEmail(true)
            }
            setLoading(false)
        }
    }


    return (
        resetPassword ?//!
            /*форма восстановления пароля*/
            <div className={style}>
                {loading && <Loading></Loading>}
                <Ninput placeholder="email"
                    value={userLogin.email}
                    onChange={(e) => {
                        setLoginButton(false);
                        setUserLogin({ ...userLogin, email: e.target.value, });
                        emailValidation(e.target.value, setError, error)
                    }}
                ></Ninput>
                {loginButton && <div style={{ color: "red" }}>{error.email}</div>}
                <span>We will send a password reset link to your email</span>
                <SpanButton style={{ marginTop: "12px" }} onClick={() => { sendButtonFunc() }}>Send</SpanButton>
                {successEmail &&
                    <div style={{ position: "absolute", width: "100%", height: "100%", backgroundColor: "white", display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <span>reset password link was sent successfully</span>
                        <SpanButton style={{ marginTop: "12px" }} onClick={() => { setResetPassword(false); setActive(false); }}>Confirm</SpanButton>
                    </div>}
            </div>
            :


            <div className={style}>
                {loading && <Loading></Loading>}
                <Ninput placeholder="email"
                    value={userLogin.email}
                    onChange={(e) => {
                        setLoginButton(false);
                        setUserLogin({ ...userLogin, email: e.target.value, });
                        emailValidation(e.target.value, setError, error)
                    }}
                ></Ninput>
                {loginButton && <div style={{ color: "red" }}>{error.email}</div>}
                <Ninput placeholder="password"
                    type="password"
                    value={userLogin.password}
                    onChange={(e) => {
                        setLoginButton(false);
                        setUserLogin({ ...userLogin, password: e.target.value })
                        passwordValidation(e.target.value, setError, error)
                    }}
                ></Ninput>
                {loginButton && <div style={{ color: "red" }}>{error.password}</div>}


                <div className={styles.LoginForm__buttons}>
                    <div className={styles.LoginForm__buttons_block}>
                        <SpanButton onClick={() => { loginButtonFunc() }}>Login</SpanButton>
                        ⠀or⠀<a onClick={() => { setRegForm(true) }} className={styles.loginForm__link} >Sign up</a>
                    </div>
                    <span className={styles.loginForm__link} onClick={() => { setResetPassword(true) }}>Forgot password?</span>
                </div>
            </div>

    )
}

export default observer(LoginForm);