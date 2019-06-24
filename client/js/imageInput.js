Vue.component('ImageInput', {
    props: {
       Image:String
    },
    
    template:/*html*/ `
    <div class="form-group">       
        <div class="container fluid">
            <div class="row">
                <div style="width:90%">
                    <b-form-file @change="onFileChange"  ref="file-input"  placeholder="Choose a file..." drop-placeholder="Drop file here..."></b-form-file>
                </div>
                <div class="px-3 py-1">
                    <b-button variant="danger" @click="removeImage" size="sm">reset</b-button>    
                </div>
                <div class="col-sm-12 p-2" :class="{border:Boolean(Image)}">
                    <b-img :src="Image" fluid size="sm" />                                
                </div>                            
            </div>
        </div>      
    </div>  
    `,

    data() {
        return {
            imageData: null
        }
    },

    methods: {
        chooseImage() {
            this.$refs.fileInput.click()
        },

        onSelectFile() {
            const input = this.$refs.fileInput
            const files = input.files
            if (files && files[0]) {
                const reader = new FileReader
                reader.onload = e => {
                    this.imageData = e.target.result
                }

                reader.readAsDataURL(files[0])
                this.$emit('input', files[0])
            }
        }
    }
})
