import axios from 'axios';
import Schedule from '@/modules/Schedule/entities/schedule.entity';

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

const ScheduleAppointmentService = {
  async scheduleAppointment(appointment: Schedule) {
    try {
      const response = await apiClient.post('/appointments', appointment);
      return response.data;
    } catch (error) {
      throw new Error(`API ${error}`);
    }
  },
};

export default ScheduleAppointmentService;
