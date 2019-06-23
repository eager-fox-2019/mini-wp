import Toastify from '../assets/js/toastify'

function toast_error(err) {
    let msg
    if (typeof (err) === 'string') {
        msg = err
    } else {
        msg = err.response && err.response.data || 'unknown error: ' + err.message
    }

    msg = stripHtml(msg)
    Toastify({
        text: `An error occured! ${msg}`,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        positionLeft: true, // `true` or `false`
        backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
        stopOnFocus: true // Prevents dismissing of toast on hover
    }).showToast();
}

function toast_success(msg, title='Success!') {
    Toastify({
        text: `${title} ${msg}`,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        positionLeft: true, // `true` or `false`
        backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
        stopOnFocus: true // Prevents dismissing of toast on hover
    }).showToast();
}

function stripHtml(htmlText) {
    let tmp = document.createElement("div");
    tmp.innerHTML = htmlText;
    return tmp.textContent || tmp.innerText || "";
}

function getFirstNString(str, n) {
    return str.substring(0, n)
}

export default {
    toast_error,
    toast_success,
    stripHtml,
    getFirstNString
}