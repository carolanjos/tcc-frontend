import http from '@/services/http.service';
import LocalStorageService from '@/services/localStorage.service';
import CheckSchedulingEntity from '@/modules/CheckScheduling/entities/check-scheduling.entity';

class CheckSchedulingService {
  public async fetchSchedules(): Promise<CheckSchedulingEntity[]> {
    const token = LocalStorageService.getItem('authToken');

    if (!token) {
      throw new Error('No auth token found');
    }

    try {
      // Busca de agendamentos
      const schedulesResponse = await http.get('/patient/list-appoinments', {
        headers: {
          'Authorization': `Token ${token}`,
        },
      });

      // Busca dos nomes dos médicos
      const doctorsResponse = await http.get('/patient/list-doctors-patient', {
        headers: {
          'Authorization': `Token ${token}`,
        },
      });

      // Busca das especialidades
      const specialtiesResponse = await http.get('/patient/list-specialities-app', {

        headers: {
          'Authorization': `Token ${token}`,
        },
      });

      // Mapear os nomes dos médicos e especialidades
      const doctorNames = doctorsResponse.data.map((item: any) => item.doctor);
      const specialties = specialtiesResponse.data.map((i: any) => i.specialty);
      
      // Associar os nomes dos médicos e especialidades aos agendamentos
      return schedulesResponse.data.map((schedule: any, index: number) =>
        new CheckSchedulingEntity(
          schedule.id,
          specialties[index] || 'Especialidade não encontrada',
          doctorNames[index] || 'Médico não encontrado',
          schedule.date,
          schedule.start_time,
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

  // Novo método para cancelar a consulta
  public async cancelSchedule(appointmentId: number): Promise<string> {
    const token = LocalStorageService.getItem('authToken');

    if (!token) {
      throw new Error('No auth token found');
    }

    try {
      const response = await http.patch(
        '/patient/cancel',
        { appointment_id: appointmentId },
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

  public async rescheduleSchedule(
      appointment_id: number,
      new_date: string,
      new_start_time: string,
    ): Promise<string> {
      const token = LocalStorageService.getItem('authToken');
    
      if (!token) {
        throw new Error('No auth token found');
      }
    
      try {
        // Verifica se todos os parâmetros necessários estão presentes
        if (!appointment_id || !new_date || !new_start_time) {
          throw new Error('Os parâmetros appointment_id, new_date e new_start_time são obrigatórios.');
        }
    
        const response = await http.patch('/patient/reschedule', {
          appointment_id: appointment_id,
          new_date: new_date,
          new_start_time: new_start_time,
        }, {
          headers: {
            'Authorization': `Token ${token}`,
          },
        });
    
        console.log('Resposta de reagendamento:', response.data);
        return response.data.message;
      } catch (error: any) {
        // Adiciona diferentes tipos de erro para fornecer feedback mais detalhado
        if (error.response) {
          console.error('Erro do servidor ao reagendar a consulta:', error.response.data);
          throw new Error(error.response.data.message || 'Erro ao reagendar a consulta');
        } else if (error.request) {
          console.error('Nenhuma resposta recebida do servidor:', error.request);
          throw new Error('Erro na conexão ao tentar reagendar a consulta');
        } else {
          console.error('Erro desconhecido ao reagendar a consulta:', error.message);
          throw new Error('Erro desconhecido ao reagendar a consulta');
        }
      }
    }
}
export default new CheckSchedulingService();