// src/modules/CheckScheduling/services/check-doctor.service.ts

import http from '@/services/http.service';
import LocalStorageService from '@/services/localStorage.service';
import DoctorCheck from '@/modules/CheckScheduling/entities/check-doctor.entity';

class CheckDoctorService {
  public async fetchAgendas(): Promise<DoctorCheck[]> {
    const token = LocalStorageService.getItem('authToken');

    if (!token) {
      throw new Error('No auth token found');
    }

    try {
      const response = await http.get('/doctor/appointments', {
        headers: {
          'Authorization': `Token ${token}`,
        },
      });

      return response.data.map((appointment: any) =>
        new DoctorCheck(
          appointment.id,
          appointment.date,
          appointment.time,
          appointment.patient,
          appointment.specialty,
          appointment.status,
          appointment.attended
        )
      );
    } catch (error) {
      console.error('Erro ao buscar agendas:', error);
      throw error;
    }
  }

  public async saveAttendances(updatedAgendas: DoctorCheck[]): Promise<void> {
    const token = LocalStorageService.getItem('authToken');

    if (!token) {
      throw new Error('No auth token found');
    }

    try {
      await http.put('/doctor/calendar/attendances', updatedAgendas, {
        headers: {
          'Authorization': `Token ${token}`,
        },
      });
    } catch (error) {
      console.error('Erro ao salvar presenças:', error);
      throw error;
    }
  }
}

export default new CheckDoctorService();
