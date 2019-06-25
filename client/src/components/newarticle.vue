<template>
  <div>
    <div class="container-fluid row w-100 px-0 mx-0 justify-content-center">
      <div class="col-lg-9 p-3 d-flex justify-content-center">
        <div class="row">
          <div class="col-12 mt-2" style="margin-bottom: -2px;">
            <input
              type="text"
              @change="autosave"
              v-model="inputArticle.title"
              placeholder="Article Title"
              class="form-control heading"
            >
          </div>
          <div class="col-12">
            <div id="editor"></div>
          </div>
          <div class="col-12 my-2">
            <div class="row mt-2">
              <div class="col-auto d-flex">
                <label for="selectedPicture">Upload Featured Image</label>
                <small class="text-danger" v-if="inputArticle.picture == '' ">&emsp;Required</small>
              </div>
              <div class="col-8">
                <input
                  @change="selectArticlePic"
                  id="selectedPicture"
                  type="file"
                  class="form-control-file"
                  placeholder="Profile Picture"
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-2 p-3 d-flex justify-content-center">
        <div class="row p-2 d-flex">
          <div class="col-12">
            <div class="px-3 pb-3">
              <div>
                <h5>Author</h5>
                <i class="fa fa-user"></i>
                {{ loggedInUser.name }}
              </div>
              <div class="mt-5">
                <h5>Date</h5>
                <i class="fa fa-calendar"></i>
                {{ new Date().toDateString() }}
              </div>
              <form class="mt-5 mb-3" @submit.prevent="addTag">
                <label for="tags">
                  <h5>Tags</h5>
                </label>
                <input
                  class="form-control"
                  id="tags"
                  type="text"
                  placeholder="Tag"
                  v-model="inputTag"
                >
              </form>
              <div v-if="inputArticle.tags.length > 0">
                <div class="row mx-1">
                  <div v-for="tag in inputArticle.tags" :key="tag">
                    <p class="mx-2 custom-hov-red" @click.prevent="removeTag(tag)">
                      <span class="badge badge-secondary">
                        <i class="fa fa-tags mr-1"></i>
                        {{ tag }}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 align-self-end">
            <div class="row">
              <button class="btn btn-block btn-success mx-auto mb-3" @click="newArticle('post')">
                <i class="fa fa-paper-plane fa-1x" aria-hidden="true"></i>
                POST
              </button>
              <button class="btn btn-block btn-warning mx-auto" @click="newArticle('save')">
                <i class="fa fa-floppy-o fa-1x" aria-hidden="true"></i> SAVE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["ax"],
  data() {
    return {
      loggedInUser: {},
      inputArticle: {
        title: "",
        content: "",
        rawHTML: "",
        picture: "",
        tags: []
      },
      inputTag: "",
      editor: ""
    };
  },
  created() {
    this.loggedInUser = JSON.parse(localStorage.getItem("user"));
    this.lastsave();
    setTimeout(() => {
      this.load_editor();
    }, 100);
  },
  mounted() {},
  methods: {
    lastsave() {
      let str = this.loggedInUser._id + "_write";
      if (localStorage.getItem(str)) {
        this.inputArticle = JSON.parse(localStorage.getItem(str));
      }
    },
    autosave() {
      let str = this.loggedInUser._id + "_write";
      localStorage.setItem(str, JSON.stringify(this.inputArticle));
    },
    r_inputArticle() {
      this.inputArticle = {
        title: "",
        content: "",
        rawHTML: "",
        picture: "",
        tags: []
      };
    },
    selectArticlePic(event) {
      this.inputArticle.picture = event.target.files[0];
      this.autosave();
    },
    // QUILL EDITOR RELATED
    load_editor() {
      var toolbarOptions = [
        ["bold", "italic", "underline", "strike"], // toggled buttons
        ["blockquote", "code-block"],
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: "ordered" }, { list: "bullet" }],
        [{ script: "sub" }, { script: "super" }], // superscript/subscript
        [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
        [{ direction: "rtl" }], // text direction
        [{ size: ["small", false, "large", "huge"] }], // custom dropdown
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        [{ font: [] }],
        [{ align: [] }],
        ["link", "image"],
        ["clean"] // remove formatting button
      ];
      if (document.querySelector("#editor")) {
        var quill = new Quill("#editor", {
          theme: "snow",
          toolbar: toolbarOptions
        });
        this.editor = quill;

        quill.on("text-change", (delta, oldDelta, source) => {
          this.inputArticle.content = quill.getText();
          this.inputArticle.rawHTML = quill.root.innerHTML;
          this.autosave();
        });

        if (this.inputArticle.rawHTML) {
          quill.root.innerHTML = this.inputArticle.rawHTML;
        }
      }
    },

    // HELPERS FUNCTION
    toTitleCase(str) {
      let temp = str.split("");
      temp[0] = temp[0].toUpperCase();
      for (let i = 1; i < temp.length; i++) {
        temp[i] = temp[i].toLowerCase();
      }
      str = temp.join("");
      return str;
    },

    // ARTICLE RELATED FUNCTION
    newArticle(status) {
      let quill = this.editor;
      let content = quill.getText();
      let rawHTML = quill.root.innerHTML;
      let { picture, title, tags } = this.inputArticle;
      let inputVal = {
        title: this.toTitleCase(title),
        content,
        rawHTML,
        status,
        tags,
        picture
      };
      if (status.toLowerCase() === "post") {
        inputVal.postedAt = new Date();
      }

      let errmsg = "";
      if (inputVal.rawHTML == "<p><br></p>" || inputVal.content == "\n") {
        errmsg += "Content of an article should not be empty\n";
      }
      if (inputVal.title == "") {
        errmsg += "Title of an article should not be empty\n";
      }
      if (inputVal.tags == "") {
        errmsg += "Article should have at least one tag\n";
      }
      if (inputVal.picture == "") {
        errmsg += "Article should have a featured picture\n";
      }

      if (errmsg !== "") {
        swal("Attention", errmsg, "info");
      } else {
        swal({
          title: "Confirmation",
          text: `${status} this article?`,
          icon: "info",
          buttons: true,
          dangerMode: true
        }).then(confirm => {
          if (confirm) {
            const blob = new Blob([inputVal.picture], {
              type: inputVal.picture.type
            });

            const formdata = new FormData();
            formdata.append("image", blob);

            this.ax({
              method: "POST",
              url: "/uploadimg",
              data: formdata,
              headers: {
                "Content-Type": "multipart/form-data",
                token: localStorage.getItem("token")
              }
            })
              .then(({ data }) => {
                this.inputArticle.picture = data;
                inputVal.picture = data;
                return this.ax({
                  method: "POST",
                  url: "/articles",
                  data: inputVal
                });
              })
              .then(({ data }) => {
                this.r_inputArticle();
                quill.setText("");
                $("#selectedPicture").val("");
                this.autosave();
                swal("Yay", `Article ${this.toTitleCase(status)}ed`, "success");
              })
              .catch(err => {
                swal("Sorry", "Problem occured, try again later", "error");
                console.log(
                  "error new article dengan upload gambar",
                  JSON.stringify(err, null, 2)
                );
                console.log(err);
              });
          }
        });
      }
    },
    addTag() {
      if (this.inputTag !== "") {
        if (!this.inputArticle.tags) {
          this.inputArticle.tags = [];
        }
        if (this.inputArticle.tags.length >= 5) {
          swal("you can only add 5 tags per article");
        } else {
          let tags = this.inputArticle.tags;
          let input = this.inputTag;
          if (input.match(/^[A-Za-z]+$/)) {
            if (tags.indexOf(input) === -1) {
              if (input.length > 12 || input.length < 3) {
                swal("Tags should consists of 3 - 12 characters");
              } else {
                this.inputArticle.tags.push(input.toLowerCase());
                this.autosave();
              }
            }
          } else {
            swal(
              "Tags shouldnt contain any number, special character, and spaces!"
            );
          }
        }
        this.inputTag = "";
      }
    },
    removeTag(tag) {
      let tags = this.inputArticle.tags;
      let index = tags.indexOf(tag);
      if (index >= 0) {
        tags.splice(index, 1);
      }
      this.autosave();
    }
  }
};
</script>

<style scoped>
</style>

