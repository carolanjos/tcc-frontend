import http from '@/services/http.service';
import LocalStorageService from '@/services/localStorage.service';
import UserProfile from '@/modules/Register/EditProfile/entities/edit-profile.entity';

class EditProfileService {
  private getToken(): string {
    const token = LocalStorageService.getItem('authToken');
    if (!token) {
      console.error('Erro: Nenhum token de autenticação encontrado.');
      throw new Error('No auth token found');
    }
    return token;
  }

  public async fetchUserProfile(): Promise<UserProfile> {
    const token = this.getToken();

    try {
      const response = await http.get('/user/profile', {
        headers: {
          'Authorization': `Token ${token}`,
        },
      });
      const { id, name, email } = response.data;
      return new UserProfile(id, name, email);
    } catch (error) {
      console.error('Erro ao buscar perfil do usuário:', error);
      throw error;
    }
  }

  public async updateUserProfile(userProfile: UserProfile): Promise<void> {
    const token = this.getToken();

    try {
      await http.patch(`/user/profile/${userProfile.id}`, {
        name: userProfile.name,
        email: userProfile.email,
      }, {
        headers: {
          'Authorization': `Token ${token}`,
        },
      });
    } catch (error) {
      console.error('Erro ao atualizar perfil do usuário:', error);
      throw error;
    }
  }
}

export default new EditProfileService();
