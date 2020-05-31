import axios from 'axios';

const {
  REACT_APP_API_ROOT = '',
} = process.env;

const http = axios.create({
  baseURL: `${REACT_APP_API_ROOT}`,
  timeout: 20000,
  responseType: 'json',
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  },
});

export default http;