// src/modules/CreateAgenda/services/create-agenda.service.ts

import http from '@/services/http.service';
import LocalStorageService from '@/services/localStorage.service';

class CreateAgendaService {
  public async getSpecialties(): Promise<any> {
    const token = LocalStorageService.getItem('authToken');

    if (!token) {
      throw new Error('No auth token found');
    }

    try {
      const response = await http.get('/doctor/specialties', {
        headers: {
          'Authorization': `Token ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar especialidades:', error);
      throw error;
    }
  }

  public async createAgenda(calendarData: any): Promise<void> {
    const token = LocalStorageService.getItem('authToken');

    if (!token) {
      throw new Error('No auth token found');
    }

    try {
      await http.post('/doctor/calendar', calendarData, {
        headers: {
          'Authorization': `Token ${token}`,
        },
      });
    } catch (error) {
      console.error('Erro ao criar agenda:', error);
      throw error;
    }
  }
}

export default new CreateAgendaService();
