// src/modules/Schedule/services/schedule.service.ts
import http from '@/services/http.service';
import ScheduleAppointment from '@/modules/Schedule/entities/schedule.entity';
import LocalStorageService from '@/services/localStorage.service';

export class ScheduleService {

  public getStoredAgenda(): any | null {
    const storedAgenda = LocalStorageService.getItem('createdAgenda');
    if (storedAgenda) {
      try {
        return JSON.parse(storedAgenda);
      } catch (error) {
        console.error('Erro ao analisar a agenda do LocalStorage:', error);
        return null;
      }
    }
    return null;
  }
  
  public async createAppointment(doctorId: number, specialtyId: number, date: string, startTime: string): Promise<any> {
    const token = LocalStorageService.getItem('authToken');

    if (!token) {
      throw new Error('No auth token found');
    }

    try {
      const response = await http.post('/patient/schedule', {
        doctor: doctorId,
        specialty: specialtyId,
        date,
        start_time: startTime,
      }, {
        headers: {
          'Authorization': `Token ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao criar o agendamento:', error);
      throw error;
    }
  }

  public async getAvailableDoctors(specialtyId: number, date: string, startTime: string): Promise<any> {
    const token = LocalStorageService.getItem('authToken');

    if (!token) {
      throw new Error('No auth token found');
    }

    try {
      const response = await http.get('/patient/available-doctors', {
        params: {
          specialty: specialtyId,
          date,
          start_time: startTime,
        },
        headers: {
          'Authorization': `Token ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar médicos disponíveis:', error);
      throw error;
    }
  }
  
  async listSpecialties() {
    try {
      const response = await http.get('/doctor/list-specialties');
      return response.data; // Lista de especialidades
    } catch (error) {
      console.error('Erro ao listar especialidades:', error);
      throw error;
    }
  }
}
