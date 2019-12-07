var axios = require('axios');

var axiosInstance = axios.create({
  baseURL: 'http://localhost:3030'
});

module.exports = axiosInstance;