<template>
<div>
    <h1>Test</h1>
</div>
</template>

<script>
    export default {
        data :{
          message : "hellow world"
        },
        methods : {
            cobaclick(){
                //pengenngubah message yang ada di app
                // this.$emit("newcard", "asdasd");
                this.$emit("ganti","berhasil diubah");
            }
        }
    }
</script>
<style scoped>
</style>

