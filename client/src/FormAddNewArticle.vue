<template>
    <div>
            <div class="col-12 offset-4 py-5 border">
                <form @submit.prevent="addNewArticle()" enctype="multipart/form-data">
                    <div class="form-group">
                        <label for="exampleFormControlFile1">Thumbnail</label>
                        <input v-on:change="getImage"  type="file" class="form-control-file" id="exampleFormControlFile1">
                        <small >{{errorNoImage}}</small>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Title</label>
                        <input  v-model="newArticle.newArticleTitle"  type="text" class="form-control" id="exampleInputPassword1"
                            placeholder="Title">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Content</label>
                        <div id="editor"></div>
                        <!-- <wysiwyg v-model="newArticle.newArticleContent"></wysiwyg> -->
                    </div>
                    <div>
                        <label for="categoryArticleRadioButton">Category</label><br>
                        <div id='categoryArticleRadioButton' class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" id="inlineCheckbox1" v-model="newArticle.newArticleCategory" value="Fashion">
                            <label class="form-check-label" for="inlineCheckbox1">Fashion</label>
                            </div>
                            <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" id="inlineCheckbox2" v-model="newArticle.newArticleCategory" value="Food & Drink">
                            <label class="form-check-label" for="inlineCheckbox2">Food & Drink</label>
                            </div>
                            <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" id="inlineCheckbox3" v-model="newArticle.newArticleCategory" value="Automotive">
                            <label class="form-check-label" for="inlineCheckbox3">Automotive</label>
                            </div>
                            <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" id="inlineCheckbox3" v-model="newArticle.newArticleCategory" value="Technology">
                            <label class="form-check-label" for="inlineCheckbox3">Technology</label>
                            </div>
                            <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" id="inlineCheckbox3" v-model="newArticle.newArticleCategory" value="Film">
                            <label class="form-check-label" for="inlineCheckbox3">Film</label>
                            </div>
                            <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" id="inlineCheckbox3" v-model="newArticle.newArticleCategory" value="Education">
                            <label class="form-check-label" for="inlineCheckbox3">Education</label>
                            </div>
                    </div>
                    <button type="submit" class="btn btn-primary btn-block mt-4">Submit</button>
                </form>
            </div>
    </div>
</template>


<script>
export default {
    props : ['errorNoImage'],   
    data : function(){

        return {
            image : null,
            newArticle : {
                newArticleTitle : "",
                newArticleContent : "",
                newArticleCreatedAt: "",
                newArticleCategory : ""
            },
            editor : ""
        }
        
    },
    methods : {
        getImage(){
            this.image = event.target.files[0]
            console.log(this.image);
            
        },
        addNewArticle(){
            this.$emit("newArticle",{
                image : this.image,
                title : this.newArticle.newArticleTitle,
                content : this.newArticle.newArticleContent,
                category : this.newArticle.newArticleCategory
            })
        },
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
        ["clean"] // remove formatting button
      ];
      if (document.querySelector("#editor")) {
        var quill = new Quill("#editor", {
          theme: "snow",
          toolbar: toolbarOptions
        });
        this.editor = quill;
        quill.on("text-change", (delta, oldDelta, source) => {
            
          this.newArticle.newArticleContent = quill.root.innerHTML;
        })
      }
    },

    },
    created(){
        setTimeout(() => {
      this.load_editor();
    }, 100);
    }
}


</script>

<style scoped>

</style>


