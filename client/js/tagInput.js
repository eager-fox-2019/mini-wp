Vue.component('TagInput', {
    props: {
        set: {
            type: Boolean,
            default: true
        },
        startingChips: Array
    },
    data() {
        return {
            chips: [],
            currentInput: ''
        }
    },
    created() { this.chips = this.startingChips },
    methods: {
        saveChip() {
            const { chips, currentInput, set } = this;
            ((set && chips.indexOf(currentInput) === -1) || !set) && chips.push(currentInput);
            this.currentInput = '';
            this.$emit('updated',chips)
        },
        deleteChip(index) {
            this.chips.splice(index, 1);
        },
        backspaceDelete({ which }) {
            which == 8 && this.currentInput === '' && this.chips.splice(this.chips.length - 1);
        }
    },
    template: /*html*/`
      <div class="chip-container">        
        <div class="chip" v-for="(chip, i) of chips" :key="chip.label">
          {{chip}}
          <i class="material-icons chip-component" @click="deleteChip(i)">clear</i>
        </div>
        <input class="chip-component" v-model="currentInput" @keydown.enter.prevent="saveChip" @keydown.delete="backspaceDelete">
      </div>
    `
})