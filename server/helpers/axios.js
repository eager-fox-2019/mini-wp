const axios = require('axios')
let ax = {}
ax.voice = axios.create({
	baseURL:`http://api.voicerss.org?key=${bash.bashrc.VOICE_API}`
})

module.exports = ax