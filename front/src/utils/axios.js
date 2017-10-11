import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 3000,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${global.localStorage.getItem('token')}`
    }
  })
}
