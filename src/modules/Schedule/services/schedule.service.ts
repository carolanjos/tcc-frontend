import axios, { AxiosError } from 'axios';
import Schedule from '@/modules/Schedule/entities/schedule.entity';
import router from '@/router';

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Token ${localStorage.getItem('token')}`
  },
});

const ScheduleAppointmentService = {
  async availableDoctors(appointment: Schedule) {
    try {
      if (appointment?.specialty && appointment?.date && appointment?.time) {
        return (await apiClient.get(`/patient/available-doctors?specialty=${appointment.specialty}&date=${appointment.date}&start_time=${appointment.time}`)).data
      }
    } catch (error) {
      console.error('Erro ao buscar médicos disponíveis:', error);
    }
  },

  async listSpecialities() {
    return (await apiClient.get('/doctor/list-specialties'))?.data;
  },

  async scheduleAppointment(appointment: Schedule) {
    try {
      const res = (await apiClient.post('/patient/schedule', {
        doctor: appointment.doctor,
        specialty: appointment.specialty,
        date: appointment.date,
        start_time: appointment.time
      }))
      alert(res.data.detail ?? 'Agendado com sucesso!');

      router.push('/');
    } catch (error: any) {
      if (error?.response?.status == 400) {
        alert(error.response.data?.detail);
      }
    }
  }
};

export default ScheduleAppointmentService;

