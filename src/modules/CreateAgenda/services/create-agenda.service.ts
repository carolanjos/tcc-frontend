import axios, { AxiosResponse } from 'axios';
import DoctorCalendar from '@/modules/CreateAgenda/entities/create-agenda.entity';
import LocalStorageService from '@/services/localStorage.service';

export default class CreateCalendarService {
  private apiUrl = 'http://127.0.0.1:8000/api/doctor/calendar';

  private token: string | null = LocalStorageService.getItem('token');
  private role: string | null = LocalStorageService.getItem('role');

  public async createCalendar(calendar: DoctorCalendar): Promise<DoctorCalendar> {
    if (this.role !== 'medico') {
      throw new Error('Acesso negado: você precisa ser um médico para criar uma agenda.');
    }

    const response: AxiosResponse<DoctorCalendar> = await axios.post(this.apiUrl, calendar, {
      headers: {
        'Authorization': `Token ${this.token}`, // Corrigido para incluir 'Token ' antes do token
        'Accept': 'application/json'
      }
    });

    return response.data;
  }

  public async fetchAgendas(): Promise<DoctorCalendar[]> {
    if (this.role !== 'medico') {
      throw new Error('Acesso negado: você precisa ser um médico para visualizar as agendas.');
    }

    const response: AxiosResponse<DoctorCalendar[]> = await axios.get(this.apiUrl, {
      headers: {
        'Authorization': `Token ${this.token}`, // Inclua 'Token ' antes do token
        'Accept': 'application/json'
      }
    });

    return response.data;
  }

  public async getSpecialtiesFromDoctor(doctorId: number): Promise<number[]> {
    if (this.role !== 'medico') {
      throw new Error('Acesso negado: você precisa ser um médico para visualizar as especialidades.');
    }

    const doctor = await this.getDoctorById(doctorId);
    return doctor.specialties;
  }

  private async getDoctorById(doctorId: number): Promise<{ specialties: number[] }> {
    const response: AxiosResponse<{ specialties: number[] }> = await axios.get(`http://127.0.0.1:8000/api/backoffice/doctor-register/${doctorId}`, {
      headers: {
        'Authorization': `Token ${this.token}`
      }
    });

    return response.data;
  }
}
