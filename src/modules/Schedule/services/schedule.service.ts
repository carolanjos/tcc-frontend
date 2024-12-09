import http from '@/services/http.service';
import LocalStorageService from '@/services/localStorage.service';
import Speciality from '@/modules/Schedule/entities/speciality.entity';
import Doctor from '@/modules/Schedule/entities/doctors.entity';
import Schedule from '@/modules/Schedule/entities/schedule.entity';

class DoctorService {
  // Gera todas as especialidades
  async getSpecialties() {
    try {
      const response = await http.get('patient/specialties');
      console.log('Specialties response:', response.data);
      return response.data.map((specialty: any) => new Speciality(specialty.id, specialty.name));
    } catch (error) {
      console.error('Erro ao buscar especialidades:', error);
      throw error;
    }
  }

  // Gerar o nome do médico pela especialidade (usando o ID da especialidade)
  async getDoctorsBySpecialty(specialty_id: number) {
    try {
      const response = await http.get('patient/doctors/', { params: { specialty_id } });
      console.log('Resposta de médicos por especialidade:', response.data);
      return response.data.map((doctor: any) => new Doctor(doctor.id, doctor.name));
    } catch (error) {
      console.error(`Erro ao buscar médicos pela especialidade ${specialty_id}:`, error);
      throw error;
    }
  }

  // Gerar os horários disponíveis pelo ID do médico
  async getAvailableDatesByDoctor(doctor_id: number): Promise<any> {
    try {
      const response = await http.get(`patient/${doctor_id}/available-dates/`);
      console.log('Datas disponíveis:', response.data);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar datas disponíveis para o médico ${doctor_id}:`, error);
      throw error;
    }
  }
  
  async getAvailableTimesByDoctor({ doctor_id, date }: { doctor_id: number; date: string }): Promise<any> {
    try {
      // Certifique-se de que doctor_id e date estão definidos
      if (!doctor_id || !date) {
        throw new Error('Médico ou data não foram fornecidos.');
      }
  
      const response = await http.get(`patient/${doctor_id}/available-times/`, {
        params: { date }
      });
  
      const availableTimes = response.data;
      console.log('Horários disponíveis (após backend):', availableTimes);
  
      // Garantir que o front-end está utilizando apenas os horários que o backend retornou
      return availableTimes; // Retorna apenas os horários disponíveis fornecidos pelo backend
    } catch (error) {
      console.error(`Erro ao buscar horários para o médico ${doctor_id} na data ${date}:`, error);
      throw error;
    }
  }
  
  
  // Cria um novo agendamento
  async createAppointment(specialty_id: number, doctor_id: number, date: string, start_time: string) {
    try {
      const appointmentData = {
        doctor: doctor_id,
        specialty: specialty_id,
        date: date,
        start_time: start_time,
      };
      console.log('Criando consulta com data:', appointmentData);
      const response = await http.post('patient/appointments/', appointmentData);
      console.log('Resposta de criação de consulta:', response.data);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar agendamento:', error);
      throw error;
    }
  }

  async rescheduleAppointment(appointmentId: number, date: string, startTime: string): Promise<void> {

    // Implement the method logic here

    // Example:

    // return axios.post('/api/reschedule', { appointmentId, date, startTime });

  }

  // Salva dados no localStorage (pode ser usado para salvar uma especialidade específica, etc.)
  saveToLocalStorage(key: string, value: any) {
    try {
      LocalStorageService.setItem(key, value);
      console.log(`Salvo no LocalStorage: ${key} =`, value);
    } catch (error) {
      console.error(`Erro ao salvar no LocalStorage (${key}):`, error);
    }
  }

  // Carrega dados do localStorage
  loadFromLocalStorage(key: string) {
    try {
      const value = LocalStorageService.getItem(key);
      console.log(`Carregado do LocalStorage (${key}):`, value);
      return value;
    } catch (error) {
      console.error(`Erro ao carregar do LocalStorage (${key}):`, error);
      return null;
    }
  }
}

export default new DoctorService();