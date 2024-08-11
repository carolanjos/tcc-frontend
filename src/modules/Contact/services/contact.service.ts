import axios from 'axios';
import ContactForm from '../entities/contact.entity';

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', // Altere para a URL correta do backend
  headers: {
    'Content-Type': 'application/json',
  },
});

export default {
  async sendContactForm(contactForm: ContactForm) {
    try {
      const response = await apiClient.post('/contact', contactForm);
      return response.data;
    } catch (error) {
      throw new Error(`API ${error}`);
    }
  },
};
