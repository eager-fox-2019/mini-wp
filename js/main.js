$('#article-list').hide()
$('#article-add').hide()

$('#list-article').click(function() {
    $('#article-add').hide()
    $('#article-list').show()
})

$('#add-article').click(function() {
    $('#article-add').show()
    $('#article-list').hide()
})