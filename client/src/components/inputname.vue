<template>
    <name-input
        v-bind:value="userName"
        v-on:input="userName = $event"
        type="text" placeholder="Enter your name" name="username" id="username" required
    ></name-input>
</template>
<script>
export default {
    props: ["userName", "userEmail", "userPsw"],
}
</script>