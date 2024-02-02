export const passwordValidation = (password,setErrors, errors) => {
    if (password.length === 0) {
        setErrors({ ...errors, password: 'password is empty' })
    }
    else if (password.length < 5) {
        setErrors({ ...errors, password: 'password must be longer than 5' })
    }
    else if (password.length > 32) {
        setErrors({ ...errors, password: 'password must be shorter than 32' })
    }

    else {
        setErrors({ ...errors, password: '' })
    }
}
export function emailValidation(email,setErrors,errors) {
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!re.test(String(email).toLowerCase())) {
        setErrors({ ...errors, email: 'invalid email' })
    }

    else {
        setErrors({ ...errors, email: ''})
    }
    if (!email) {
        setErrors({ ...errors, email: 'email is empty' })
    }


}
export function nameValidation(email,setErrors,errors) {
    const re = /^[a-z0-9]+$/i;
    if (!re.test(String(email).toLowerCase())) {
        setErrors({ ...errors, name: 'name can contains 0-9 and a-b symbols' })
    }

    else {
        setErrors({ ...errors, name: ''})
    }
    if (!email) {
        setErrors({ ...errors, name: 'name is empty' })
    }


}
export function comparePasswords(password, passwordRetry,setErrors,errors){
    if(password === passwordRetry){
        setErrors({ ...errors, password: '' })
    }

    else{
        setErrors({ ...errors, password: 'passwords arent match' })
    }
}
