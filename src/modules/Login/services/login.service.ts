import { AxiosResponse } from 'axios';
import http from '@/services/http.service';
import { LoginData, TokenData } from '@/modules/Login/entities/login.entity';
import LocalStorageService from '@/services/localStorage.service';

class LoginService {
  public async login(email: string, password: string): Promise<TokenData> {
    const credentials = new LoginData(email, password);
    const response: AxiosResponse = await http.post('/user/login', { ...credentials, password_confirmation: password });
    const data = response.data;

    if (!data.role) {
      throw new Error('User role is not defined');
    }

    LocalStorageService.setItem('authToken', data.token);
    LocalStorageService.setItem('role', data.role);

    return new TokenData(data.token, data.role);
  }

  public async registerDoctor(doctorData: any): Promise<void> {
    const token = LocalStorageService.getItem('authToken');
    const role = LocalStorageService.getItem('role');

    if (!token) {
      throw new Error('No auth token found');
    }

    if (role !== 'admin') {
      throw new Error('Unauthorized: Only the superadmin can register a doctor');
    }

    await http.post('/backoffice/doctor-register', doctorData, {
      headers: {
        'Authorization': `Token ${token}`,
        'Accept': 'application/json'
      }
    });
  }

  public async logoutToken(): Promise<void> {
    await http.get('/auth/logout');
  }

  public logout(): void {
    LocalStorageService.clear();
  }

  public async loginForgotPassword(email: string): Promise<void> {
    await http.post('/user/forgot-password', { email });
  }

  public async forgotPassword(email: string): Promise<void> {
    await http.get(`/user/forgot-password?email=${email}`);
  }

  public async setInitialPassword(body: any = {}): Promise<void> {
    await http.post('/user/reset-password', body);
  }

  public async getAuthUserInfo(): Promise<any> {
    const response: AxiosResponse = await http.get('/auth/user-info/');
    return response.data.data;
  }
}

export default new LoginService();
