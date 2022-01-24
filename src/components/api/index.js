import axios_api from 'axios';

let config = {
  baseURL: "https://api.yentingchen.me/equipment/generation"
}

let axios = axios_api.create(config);

export default axios;