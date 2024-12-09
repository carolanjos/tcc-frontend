import http from '@/services/http.service';
import LocalStorageService from '@/services/localStorage.service';
import CheckSchedulingEntity from '@/modules/CheckScheduling/entities/check-scheduling.entity';

class CheckPatientService {
  public async fetchSchedules(): Promise<CheckSchedulingEntity[]> {
    const token = LocalStorageService.getItem('authToken');

    if (!token) {
      throw new Error('No auth token found');
    }

    try {
      const response = await http.get('/patient/schedule', {
        headers: {
          'Authorization': `Token ${token}`,
        },
      });

      return response.data.map((schedule: any) =>
        new CheckSchedulingEntity(
          schedule.id,
          schedule.specialty,
          schedule.doctor,
          schedule.date,
          schedule.time,
          schedule.status
        )
      );
    } catch (error) {
      console.error('Erro ao buscar agendas do paciente:', error);
      throw error;
    }
  }

  public async saveSchedules(updatedSchedules: CheckSchedulingEntity[]): Promise<void> {
    const token = LocalStorageService.getItem('authToken');

    if (!token) {
      throw new Error('No auth token found');
    }

    try {
      await http.put('/patient/schedule', updatedSchedules, {
        headers: {
          'Authorization': `Token ${token}`,
        },
      });
    } catch (error) {
      console.error('Erro ao salvar as agendas do paciente:', error);
      throw error;
    }
  }

  // Método para reagendar uma consulta
  public async rescheduleSchedule(appointmentId: number, newDate: string, newStartTime: string): Promise<string> {
    const token = LocalStorageService.getItem('authToken');

    if (!token) {
      throw new Error('No auth token found');
    }

    try {
      const response = await http.post(
        '/patient/reschedule',
        {
          appointment_id: appointmentId,
          new_date: newDate,
          new_start_time: newStartTime,
        },
        {
          headers: {
            'Authorization': `Token ${token}`,
          },
        }
      );
      return response.data.message;
    } catch (error) {
      console.error('Erro ao reagendar a consulta:', error);
      throw error;
    }
  }

  // Método para cancelar uma consulta
  public async cancelSchedule(appointmentId: number): Promise<string> {
    const token = LocalStorageService.getItem('authToken');

    if (!token) {
      throw new Error('No auth token found');
    }

    try {
      const response = await http.post(
        '/patient/cancel',
        {
          appointment_id: appointmentId,
        },
        {
          headers: {
            'Authorization': `Token ${token}`,
          },
        }
      );
      return response.data.message;
    } catch (error) {
      console.error('Erro ao cancelar a consulta:', error);
      throw error;
    }
  }
}

export default new CheckPatientService();
