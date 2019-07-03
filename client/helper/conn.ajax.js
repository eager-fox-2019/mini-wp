import axios from 'axios'

module.exports = {
    BASE_URL: `http://localhost:3000`,
    axiosConfig() {
        return {
            headers: {
                token: window.localStorage.getItem('kecebadai-token'),
                'Content-Type': 'application/json'
            }
        }
    },
    axios
}