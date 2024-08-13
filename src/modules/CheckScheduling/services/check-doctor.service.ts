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
      const response = await http.get('/doctor/patients', {
        headers: {
          'Authorization': `Token ${token}`,
        },
      });

      return response.data.map((appointment: any) =>
        new DoctorCheck(
          appointment.id,
          appointment.name,
          appointment.date,
          appointment.start_time,
          appointment.patient,
          appointment.specialty,
          appointment.status,
          appointment.attended,
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

  public async markAppointmentAsDone(appointment_id: number): Promise<string> {
    const token = LocalStorageService.getItem('authToken');
  
    if (!token) {
      throw new Error('No auth token found');
    }
  
    try {
      console.log(`Marking appointment as done with ID: ${appointment_id}`);
      
      const response = await http.patch(
        '/doctor/done',
        { appointment_id: appointment_id },
        {
          headers: {
            'Authorization': `Token ${token}`,
          },
        }
      );
  
      return response.data.message;
    } catch (error) {
      console.error('Erro ao marcar consulta como realizada:', error);
      throw error;
    }
  }
  
  public async markAppointmentAsCanceled(appointment_id: number): Promise<string> {
    const token = LocalStorageService.getItem('authToken');
  
    if (!token) {
      throw new Error('No auth token found');
    }
  
    try {
      console.log(`Canceling appointment with ID: ${appointment_id}`);
      
      const response = await http.patch(
        '/doctor/cancel',
        { appointment_id: appointment_id },
        {
          headers: {
            'Authorization': `Token ${token}`,
          },
        }
      );
  
      return response.data.message;
    } catch (error) {
      console.error('Erro ao cancelar consulta:', error);
      throw error;
    }
  }

}

export default new CheckDoctorService();
