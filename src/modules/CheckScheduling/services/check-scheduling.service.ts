import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default {
  async fetchCheckScheduling() {
    try {
      const response = await apiClient.get('/appointments');
      return response.data;
    } catch (error) {
      throw new Error(`API ${error}`);
    }
  },
};
