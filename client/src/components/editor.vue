<template>
  <div ref="editor" :style="{'min-height': '250px'}"></div>
</template>

<script>
import Quill from "quill";
import miniwp from "../api/miniwp";
export default {
  props: {
    value: {
      type: String,
      default: ""
    },
    importeddata: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      editor: null
    };
  },
  methods: {
    initQuill: function() {},
    update() {
      // console.log(this.editor.getText);
      this.$emit(
        "input",
        this.editor.getText() ? this.editor.root.innerHTML : ""
      );
    },
    imageHandler(img) {
      console.log(img);
      const input = document.createElement("input");
      input.setAttribute("type", "file");
      input.click();
      input.onchange = () => {
        const file = input.files[0];
        if (/^image\//.test(file.type)) {
          this.uploadImg(file);
        } else {
          console.warn("You could only upload images.");
        }
      };
    },
    uploadImg(file) {
      //   this.loading = true;
      let formData = new FormData();
      formData.append("image", file);
      console.log(formData);
      miniwp({
        url: "/upload",
        method: "POST",
        headers: {
          token: localStorage.getItem("token")
        },
        timeout: 8000,
        data: formData
      })
        .then(({ data }) => {
          console.log(data);
          let range = this.editor.getSelection();
          this.editor.insertEmbed(range.index, "image", data.link);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.editor = new Quill(this.$refs.editor, {
      modules: {
        toolbar: {
          container: [
            [{ header: [1, 2, 3, 4, false] }],
            [{ align: [] }],
            ["bold", "italic", "underline"],
            ["blockquote", "code-block"],
            ["link", "image"]
          ],
          handlers: {
            image: this.imageHandler
          }
        }
      },
      theme: "snow"
      // formats: ["bold", "underline", "header", "italic", "image"]
    });
    setTimeout(() => {
      if (this.importeddata) {
        console.log("imported data ada");
        this.value = this.importeddata;
        this.update();
        // console.log(this.value, "xxxxxxxxxxxxx");
      } else {
        console.log("imported data ga ada");
      }
      this.editor.root.innerHTML = this.value;
      this.editor.on("text-change", () => {
        this.update();
      });
    }, 2000);
  },
  updated() {
    if (this.importeddata) {
      console.log("imported data ada");
      this.value = this.importeddata;
      console.log(this.value, "xxxxxxxxxxxxx");
    }
  }
  // watch: {
  //   importeddata() {
  //     console.log("ada perubahan");
  //     // this.value = this.importeddata;
  //     // this.update();
  //     // this.editor.setText(this.importeddata);
  //     // console.log(this.value, "============");
  //   }
  // }
};
</script>

<style scoped>
.ql-toolbar {
}
</style>


