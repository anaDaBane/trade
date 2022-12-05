 import axios from "axios";
  const TOKEN = 'ce2vbviad3i2p1dqslj0ce2vbviad3i2p1dqsljg';
 export default axios.create({
  baseURL: 'https://finnhub.io/api/v1',
  params: {
    token: TOKEN
  }
 })