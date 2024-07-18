import axios from 'axios';

const ApiService = {
  get(endpoint: string) {
    return axios.get(endpoint);
  },
  post(endpoint: string, data: any) {
    return axios.post(endpoint, data);
  },
  // outros métodos como put, delete, etc.
};

export default ApiService;
