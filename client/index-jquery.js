const toggleSidebarButton = document.getElementById('toggleSidebar');

toggleSidebarButton.addEventListener('click', _ => {
  document.getElementById('sidebar').classList.toggle('collapsed');
})

const togglePostButton = document.getElementById('togglePostButton')

togglePostButton.addEventListener('click', () => {
	togglePostArticleForm()
})

function togglePostArticleForm(){
	let textIs = $("#togglePostButton").text()
	if (textIs == "Post") {
		$("#togglePostButton").text("Cancel")
	} else {
		$("#togglePostButton").text("Post")
	}
	$("#postForm").toggle()
}

$(document).ready(() => {
	$('#postArticle').submit( e => {
		e.preventDefault()

		let title = $(`#postArticle input[name='title']`).val()
    let body = $(`#postArticle textarea[name='body']`).val()

    addArticle(title, body)
	})

});

//addArticle from title and body input
function addArticle(title, body){
	togglePostArticleForm()
	let articleHtml = `
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">${title}</h5>
          <div class="card-text">${body}</div><br>
          <a href="#" class="btn btn-primary">Edit</a>
          <a href="#" class="btn btn-danger">Delete</a>
        </div>
	`
	$('#articlesContainer').append(articleHtml)

	document.location.href = '#articlesContainer'
}


//filter article cards by title/name
function myFunction() {
  // Declare variables
  let input, filter, div, card, title, body, i, txtTitle, txtBody;
  input = document.getElementById('myInput');
  filter = input.value.toUpperCase();
  div = document.getElementById("articlesContainer");
  card = div.getElementsByClassName('card');

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < card.length; i++) {
  	//card-title and card-text
    let hasTitle, hasBody
    title = card[i].getElementsByClassName("card-title")[0];
    body = card[i].getElementsByClassName("card-text")[0];
    txtTitle = title.textContent || title.innerText;
    txtBody = body.textContent || body.innerText;
    hasTitle = (txtTitle.toUpperCase().indexOf(filter) > -1)
    hasBody = (txtBody.toUpperCase().indexOf(filter) > -1)
    if (hasTitle || hasBody) {
      card[i].style.display = "";
    } else {
      card[i].style.display = "none";
    }
  }
}