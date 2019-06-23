import axios from 'axios'

module.exports = {
    BASE_URL: `http://localhost:3000`,
    axiosConfig() {
        console.log('masuk ke config')
        return {
            headers: {
                token: window.localStorage.getItem('kecebadai-token'),
                'Content-Type': 'application/json'
            }
        }
    },
    axios
}