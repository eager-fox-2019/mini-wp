function loadfeedspage() {
  $("#app").html(`
        
    `);
  populatefeeds();
}
function populatefeeds() {

  var feeds = [
    {
      title: "Judul Artikel 1",
      content: "Konten Artikel 1",
      snippet: "Snippet 1",
      tags: ["Tags 1", "Tags 1"],
      image:
        "https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.schloss-lichtenstein.de%2Fimages%2Fos_imagegallery_109%2Foriginal%2Fgalerie8-b.jpg&f=1",
      author: "Author 1"
    },
    {
      title: "Judul Artikel 2",
      content: "Konten Artikel 2",
      snippet: "Snippet 2",
      tags: ["Tags 2", "Tags 2"],
      image:
        "https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.vemco.com%2Fwp-content%2Fuploads%2F2012%2F09%2Fimage-banner2.jpg&f=1",
      author: "Author 2"
    }
  ];

  feeds.forEach(card => {
    $("#feeds").append(`
    <div class="card mb-3" style="max-width: 540px;">
      <div class="row no-gutters">
        <div class="col-md-4">
          <img src="..." class="card-img" alt="...">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
          </div>
        </div>
      </div>
    </div>
    `);
  });
}
