function toast_error(err) {
    let msg
    if (typeof (err) === 'string') {
        msg = err
    } else {
        msg = err.response && err.response.data || 'unknown error: ' + err.message
    }

    Toastify({
        text: `An error occured! ${msg}`,
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
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
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        positionLeft: true, // `true` or `false`
        backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
        stopOnFocus: true // Prevents dismissing of toast on hover
    }).showToast();
}


