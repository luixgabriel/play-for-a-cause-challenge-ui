import axios from 'axios'
// https://play-for-a-cause-chat.onrender.com
export default axios.create({
  baseURL: 'http://localhost:3001',
})
