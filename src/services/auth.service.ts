import { LoginData, TokenData } from '@/modules/Login/entities/login.entity';
import LocalStorageService from './localStorage.service';
import moment from 'moment-timezone';
import TokenService from '@/modules/Login/services/token.service';
import http from './http.service';

class AuthService {
  public async loginSuperAdmin(credentials: LoginData): Promise<TokenData> {
    try {
      console.log('Iniciando login com credenciais:', credentials);
      const response = await http.post('user/login', credentials);

      console.log('Resposta do login:', response);
      const { token, role } = response.data;

      if (role !== 'admin') {
        console.error('Erro: Usuário não é admin, role:', role);
        throw new Error('User is not an admin');
      }

      console.log('Token obtido:', token);
      LocalStorageService.setItem('authToken', token);
      LocalStorageService.setItem('role', role);

      return new TokenData(token, role);
    } catch (error) {
      console.error('Erro no login do superadmin:', error);
      throw error;
    }
  }

  public async registerDoctor(doctorData: any): Promise<void> {
    const token = LocalStorageService.getItem('authToken');
    console.log('Token encontrado no LocalStorage:', token);
    
    if (!token) {
      console.error('Erro: Nenhum token de autenticação encontrado.');
      throw new Error('No auth token found');
    }

    try {
      const response = await http.post('backoffice/doctor-register', doctorData, {
        headers: {
          'Authorization': `Token ${token}`,
          'Accept': 'application/json'
        }
      });
      console.log('Resposta da API ao registrar médico:', response);
    } catch (error) {
      console.error('Erro ao registrar médico:', error);
      throw error;
    }
  }

  public logout(): void {
    console.log('Realizando logout...');
    LocalStorageService.clear();
  }

  public shouldRefreshToken(): boolean {
    const loggedUser = LocalStorageService.getObject('user');

    if (!loggedUser) {
      console.error('Erro: Usuário não está logado.');
      throw new Error('User is not logged in.');
    }

    const expiresIn = loggedUser.expiresIn || 0;
    const expiresDate = moment(expiresIn * 1000);
    const interval = expiresDate.diff(moment(), 'minutes');

    console.log('Intervalo de tempo até a expiração do token:', interval, 'minutos');
    return interval <= 15;
  }
}

export default new AuthService();
