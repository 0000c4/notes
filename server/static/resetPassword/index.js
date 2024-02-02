const errorsHtml = document.getElementById("errors");
const form = document.getElementById("resetForm");
const title = document.getElementById("title");
const success_image = document.getElementById("success_image");

let errorMsg = '';

const validatePassword = (password) => {
    if (password.length < 5) {
        errorMsg = 'Password must be longer than 5'
    }
    else if (password.length > 32) {
        errorMsg = 'Password must be shorter than 32'
    }

    else {
        errorMsg = '';
        return password
    }
}
const comparePassword = (password, password_retry) => {
    if (password.length == 0) {
        errorMsg = 'Password is empty';
    }
    if (password === password_retry) {
        return password
    }
    else {
        errorMsg = 'Passwords arent match';
    }
}

const showMsgOK = () => {
    form.style.display = "none";
    success_image.classList.add('active')
    title.innerHTML = "Password was reset successfully";
}



form.password.onfocus = () => {
    errorsHtml.innerHTML = '';
    errorMsg = '';
}
form.retry_password.onfocus = () => {
    errorsHtml.innerHTML = '';
    errorMsg = '';
}


form.onsubmit = async (event) => {
    event.preventDefault();

    const compared_password = comparePassword(form.password.value, form.retry_password.value)
    const validated_password = compared_password ? validatePassword(compared_password) : undefined;
    errorsHtml.innerHTML = errorMsg;

    if (errorMsg === '') {
        const resetLink = window.location.pathname.split('/');
        console.log(resetLink[resetLink.length - 1])
        const response = await fetch('/api/auth/reset', {
            method: "POST",
            body: JSON.stringify({
                link: resetLink[resetLink.length - 1],
                password: validated_password
            }),
            headers: { "Content-Type": "application/json" }
        });
        if (response.status == 200) {
            showMsgOK();
        }
        else {
            errorMsg = response.statusText;
            errorsHtml.innerHTML = errorMsg;
        }
    }
}