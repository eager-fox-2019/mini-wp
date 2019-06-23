<template>
    <div>
        <ul id="messages"></ul>
        <h2> Welcome, {{ user }}  </h2>
        <ul class="list-group mb-5 mt-4">
            <li v-for="(message,index) in messages" :key="index" class="list-group-item p-3 d-flex flex-wrap">
                <h5>{{ message.userId.name }} : </h5>
                <p> {{ message.text }} </p>
            </li>
        </ul>
        <form action="">
            <input v-model="newMsg" autocomplete="off" placeholder="Type a message" />
            <button @click.prevent="send">Send</button>
        </form>
    </div>
</template>

<script>
const socket = io('http://localhost:3000')
import axios from '../api/server'

export default {
    data() {
        return {
            messages : [],
            newMsg : '',
            user : ''
        };
    },
    created () {
        this.user = localStorage.getItem('name')
        let token = localStorage.getItem('token')
        axios.get('/conversation', { headers : { token } })
        .then(({ data }) => {
            this.messages = data
        })
        .catch(err =>{
            console.log(err)
        })
    },
    methods : {
        send() {
            socket.emit('sendMsg',[ this.user, this.newMsg])
            let token = localStorage.getItem('token')
            axios.post('/conversation', { text : this.newMsg }, { headers : { token } })
            .then(({ data }) =>{})
            .catch(err =>{
                console.log(err)
            })
        }
    },
    mounted : function() {
        socket.on('sendBackMsg',(msgFrom )=> {
        this.newMsg = ''
        this.messages.push({
            userId : {
                    name : `${msgFrom[0]}`,
                },
            text : `${msgFrom[1]}`
            })
        })
    }
}
</script>

<style scoped>
* { 
    margin: 0;
    padding: 0;
    box-sizing: border-box; 
}
body { 
    font: 13px Helvetica, Arial;
}
form { 
    background: #000;
    padding: 3px;
    position: fixed;
    bottom: 0; 
    width: 80%; 
    margin-bottom: 5px
}
form input { 
    border: 0; 
    padding: 10px; 
    width: 90%; 
    margin-right: .5%; 
}
form button { 
    width: 9%; 
    background: rgb(130, 224, 255); 
    border: none; 
    padding: 10px; 
}
#messages { 
    list-style-type: none; 
    margin: 0; 
    padding: 0; 
}
#messages li { 
    padding: 5px 10px; 
}
#messages li:nth-child(odd) { 
    background: #eee; 
}
h2 {
    text-align: center;
}
h5 {
    width: 100px;
    padding: 7px;
    border-radius: 8px;
}
p {
    background-color:gainsboro;
    padding: 7px;
    border-radius: 8px;
}

</style>
