import React, { useState, useContext } from 'react';
import { observer } from 'mobx-react-lite'
import Context from '../index';
import { emailValidation, passwordValidation, nameValidation, comparePasswords } from '../utils/validation'
import styles from './RegForm.module.css'
import Ninput from '../UI/Ninput/Ninput';
import SpanButton from '../UI/Buttons/SpanButton/SpanButton';
import Loading from '../UI/Loading/Loading';
function RefForm({ isActive, setActive }) {
    const { store } = useContext(Context);
    const [userReg, setUserReg] = useState({ name: "", email: "", password: "" })
    const [retryPassword, setRetryPassword] = useState('');
    const [error, setError] = useState({ password: 'password is empty', email: 'email is empty', name: 'name is empty' });
    const [regButton, setRegButton] = useState(false);
    const [loading, setLoading] = useState(false);
    let style = styles.LoginForm;
    if (isActive === true) { style += ' ' + styles.active; }
    const RegButtonFunc = async () => {
        if (error.password != "" || error.email != "" || error.name != "") {
            setRegButton(true);
        }
        else {
            setLoading(true)
            const externalError = await store.registration(userReg.email, userReg.password,userReg.name);
            if(typeof externalError != "undefined"){
                setRegButton(true);
                setError({ ...error, password: externalError?.message == undefined ? 'check network connection' : externalError.message})
            }
            else{setActive(false)}
            setLoading(false)
        }
    }
    return (
        <div className={style}>
            {loading && <Loading></Loading>}
            <Ninput placeholder="name"
                value={userReg.name}
                onChange={(e) => {
                    setRegButton(false);
                    setUserReg({ ...userReg, name: e.target.value, });
                    nameValidation(e.target.value, setError, error)
                }}
            ></Ninput>
            {regButton && <div style={{ color: "red" }}>{error.name}</div>}
            <Ninput placeholder="email"
                value={userReg.email}
                onChange={(e) => {
                    setRegButton(false);
                    setUserReg({ ...userReg, email: e.target.value, });
                    emailValidation(e.target.value, setError, error)
                }}
            ></Ninput>
            {regButton && <div style={{ color: "red" }}>{error.email}</div>}
            <Ninput type="password" placeholder="password"
                value={userReg.password}
                onChange={(e) => {
                    setRegButton(false);
                    setUserReg({ ...userReg, password: e.target.value, });
                    passwordValidation(e.target.value, setError, error)
                }}
            ></Ninput>
            <Ninput type="password" placeholder=" retry password"
                value={retryPassword}
                onChange={(e) => {
                    setRegButton(false);
                    setRetryPassword(e.target.value);
                    comparePasswords(e.target.value, userReg.password, setError, error)
                }}
            ></Ninput>
            {regButton && <div style={{ color: "red" }}>{error.password}</div>}
            <SpanButton onClick={() => { RegButtonFunc();}}>Sign up</SpanButton>
        </div>
    )
}

export default observer(RefForm);