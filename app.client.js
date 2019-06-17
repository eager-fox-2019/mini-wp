$('#toggle-sidebar').click(() => {
    $('#sidebar').toggleClass('collapsed');
})

$(document).ready(() => {
    let quill = new Quill('#quill', {
        theme: 'snow'
    });
})

$('#content .card button').click(() => {
    window.open('/form.html')
})


$('#newArticle').click(() => {
    window.open('/form.html')
})

