<template>
  <div class="editor">
    <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
      <div class="menubar">
        <button class="menubar__button" :class="{ 'is-active': isActive.paragraph() }" @click="commands.paragraph">
          <img svg-inline class="menu_icon" src="./icons/tiptap/paragraph.svg">
        </button>
        <button class="menubar__button" :class="{ 'is-active': isActive.heading({ level: 1 }) }" @click="commands.heading({ level: 1 })">
          <span>H1</span>
        </button>
        <button class="menubar__button" :class="{ 'is-active': isActive.heading({ level: 2 }) }" @click="commands.heading({ level: 2 })">
          <span>H2</span>
        </button>
        <button class="menubar__button" :class="{ 'is-active': isActive.heading({ level: 3 }) }" @click="commands.heading({ level: 3 })">
          <span>H3</span>
        </button>
        <button class="menubar__button" :class="{ 'is-active': isActive.bold() }" @click="commands.bold">
          <img svg-inline class="menu_icon" src="./icons/tiptap/bold.svg">
        </button>
        <button class="menubar__button" :class="{ 'is-active': isActive.italic() } " @click="commands.italic">
          <img svg-inline class="menu_icon" src="./icons/tiptap/italic.svg">
        </button>
        <button class="menubar__button" :class="{ 'is-active': isActive.underline() }" @click="commands.underline">
          <img svg-inline class="menu_icon" src="./icons/tiptap/underline.svg">
        </button>
        <button class="menubar__button" :class="{ 'is-active': isActive.strike() }" @click="commands.strike">
          <img svg-inline class="menu_icon" src="./icons/tiptap/strike.svg">
        </button>
        <button class="menubar__button" :class="{ 'is-active': isActive.code() }" @click="commands.code">
          <img svg-inline class="menu_icon" src="./icons/tiptap/code.svg">
        </button>
        <button class="menubar__button" :class="{ 'is-active': isActive.bullet_list() }" @click="commands.bullet_list">
          <img svg-inline class="menu_icon" src="./icons/tiptap/ul.svg">
        </button>
        <button class="menubar__button" :class="{ 'is-active': isActive.ordered_list() }" @click="commands.ordered_list">
          <img svg-inline class="menu_icon" src="./icons/tiptap/ol.svg">
        </button>
        <button class="menubar__button" :class="{ 'is-active': isActive.blockquote() }" @click="commands.blockquote">
          <img svg-inline class="menu_icon" src="./icons/tiptap/quote.svg">
        </button>
        <button class="menubar__button" :class="{ 'is-active': isActive.code_block() }" @click="commands.code_block">
          <img svg-inline class="menu_icon" src="./icons/tiptap/code.svg">
        </button>
      </div>
    </editor-menu-bar>
    <editor-content :editor="editor" class="editorbody" ref="editor"/>
  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from 'tiptap';
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
    EditorContent, EditorMenuBar,
  },
  props: ['clear', 'content'],
  data() {
    return {
      editor: new Editor({
        content: '',
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
        onUpdate: ({ getHTML }) => {
          this.$emit('editor', getHTML())
        },
      })
    }
  },
  watch: {
    clear(t) {
      if(t === true) this.editor.clearContent()
    },
  },
  mounted() {
    if(this.content) {
      setTimeout(() => {
      this.editor.setContent(this.content)
    }, 50);
    }
  },
  beforeDestroy() {
    this.editor.destroy()
  },
}
</script>