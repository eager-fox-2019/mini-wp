<template>
  <div class="editor">
    <editor-content :editor="editor" class="editorbody"/>
  </div>
</template>

<script>
import { Editor, EditorContent } from 'tiptap';
import {
  Bold,
  Italic,
  Underline,
  Strike,
  Code,
  HardBreak,
  Heading,
  ListItem,
  BulletList,
  OrderedList,
  Blockquote,
  CodeBlock,
} from 'tiptap-extensions'

export default {
  components: {
    EditorContent,
  },
  props: ['content'],
  data() {
    return {
      editor: new Editor({
        content: '',
        editable: false,
        extensions: [
          new Bold(),
          new Italic(),
          new Underline(),
          new Strike(),
          new Code(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new ListItem(),
          new BulletList(),
          new OrderedList(),
          new Blockquote(),
          new CodeBlock(),
        ],
      })
    }
  },
  mounted() {
    setTimeout(() => {
      this.editor.setContent(this.content)
    }, 50);
  },
  beforeDestroy() {
    this.editor.destroy()
  },
}
</script>