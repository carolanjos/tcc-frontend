import { AxiosResponse } from 'axios';
import http from '@/services/http.service';
import LocalStorageService from '@/services/localStorage.service';

class RegisterDoctorService {
  public async registerDoctor(doctorData: any): Promise<void> {
    const token = LocalStorageService.getItem('authToken');
    const role = LocalStorageService.getItem('role');

    if (!token) {
      throw new Error('No auth token found');
    }

    if (role !== 'admin') {
      throw new Error('Unauthorized: Only the superadmin can register a doctor');
    }

    try {
      await http.post('/backoffice/doctor-register', doctorData, {
        headers: {
          'Authorization': `Token ${token}`,
          'Accept': 'application/json',
        },
      });
    } catch (error) {
      console.error('Erro ao registrar médico:', error);
      throw error;
    }
  }
}

export default new RegisterDoctorService();
