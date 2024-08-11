import moment from 'moment';
import { AxiosResponse } from 'axios';
import localStorageService from '@/services/localStorage.service';
import http from '@/services/http.service';
import store from '@/store';
import router from '@/router';

class TokenService {
  public shouldRefreshToken(): boolean {
    const loggedUser = localStorageService.getObject('user');
    if (!loggedUser) return false;

    const expiresIn = loggedUser.expiresIn || 0;
    const expiresDate = moment(expiresIn * 1000);
    const interval = expiresDate.diff(moment(), 'minutes');

    return interval <= 15;
  }

  public async refreshToken(): Promise<void> {
    const isRefreshingToken = localStorage.getItem('isRefreshingToken');
    if (isRefreshingToken === '1') return;

    localStorage.setItem('isRefreshingToken', '1');

    try {
      const { data }: AxiosResponse = await http.get('/auth/refresh');
      const { access_token, expires_in } = data.data;

      const loggedUser = localStorageService.getObject('user') || {};
      loggedUser.expiresIn = expires_in;

      localStorageService.setObject('user', loggedUser);
      store.dispatch('setToken', access_token);
      localStorage.setItem('token', access_token);
    } catch (error) {
      console.error('Error refreshing token:', error);
    } finally {
      localStorage.setItem('isRefreshingToken', '0');
    }
  }

  public logout(): void {
    localStorage.clear();
    store.dispatch('setToken', '');
    router.push({ name: 'login' });
  }
}

export default new TokenService();
