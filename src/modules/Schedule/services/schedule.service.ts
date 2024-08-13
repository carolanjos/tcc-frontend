import http from '@/services/http.service';
import { AxiosResponse } from 'axios';
import LocalStorageService from '@/services/localStorage.service';
import Schedule from '@/modules/Schedule/entities/schedule.entity';
import axios from 'axios';

export class ScheduleService {
  private baseURL = 'http://127.0.0.1:8000/api';
  private tokenKey = 'authToken';

  constructor() {
    this.loadFromLocalStorage();
  }

  // Método para salvar dados no LocalStorage
  private saveToLocalStorage(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  // Método para carregar dados do LocalStorage
  private loadFromLocalStorage() {
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      this.setAuthToken(token);
    }
  }

  // Método para configurar o token de autenticação
  private setAuthToken(token: string) {
    this.saveToLocalStorage(token);
    axios.defaults.headers.common['Authorization'] = `Token ${token}`;
  }

  public async listSpecialties(): Promise<any> {
    const token = LocalStorageService.getItem('authToken');

    if (!token) {
      throw new Error('No auth token found');
    }

    try {
      const response: AxiosResponse = await http.get('/doctor/specialties', {
        headers: {
          'Authorization': `Token ${token}`,
          'Accept': 'application/json',
        },
      });
      return response.data; // Lista de especialidades
    } catch (error) {
      console.error('Erro ao listar especialidades:', error);
      throw error;
    }
  }

  // Método para obter médicos disponíveis
  async getAvailableDoctors(specialtyId: number, date: string, startTime: string) {
    const response = await axios.get(`${this.baseURL}/patient/available-doctors`, {
      params: { specialty: specialtyId, date, start_time: startTime },
    });
    return response.data;
  }

  // Método para criar um agendamento
  async createAppointment(doctorId: number, specialtyId: number, date: string, startTime: string) {
    const response = await axios.post(
      `${this.baseURL}/patient/schedule`,
      { doctor: doctorId, specialty: specialtyId, date, start_time: startTime }
    );
    return response.data;
  }

  // Método para inicializar o serviço com o token
  public initialize(token: string) {
    this.setAuthToken(token);
  }
}
