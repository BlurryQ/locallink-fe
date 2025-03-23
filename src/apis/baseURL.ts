import axios from 'axios';

const urls =  ["http://localhost:5000", "https://locallink-be.onrender.com"]

const baseURL = axios.create({
  baseURL: urls[1],
});

export default baseURL;