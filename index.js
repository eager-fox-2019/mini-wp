const toggleSidebarButton = document.getElementById('toggleSidebar');

toggleSidebarButton.addEventListener('click', _ => {
  document.getElementById('sidebar').classList.toggle('collapsed');
})

const togglePostButton = document.getElementById('togglePostButton')

togglePostButton.addEventListener('click', () => {
	let textIs = $("#togglePostButton").text()
	if (textIs == "Post") {
		$("#togglePostButton").text("Cancel")
	} else {
		$("#togglePostButton").text("Post")
	}
	$("#postForm").toggle()
})