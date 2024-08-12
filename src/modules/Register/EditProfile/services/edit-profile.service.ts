import http from '@/services/http.service';
import LocalStorageService from '@/services/localStorage.service';

class EditProfileService {
  // Método para buscar o perfil do usuário
  public async fetchUserProfile(): Promise<any> {
    const token = LocalStorageService.getItem('authToken');

    if (!token) {
      throw new Error('No auth token found');
    }

    try {
      const response = await http.get('/user/profile', {
        headers: {
          'Authorization': `Token ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar perfil do usuário:', error);
      throw error;
    }
  }

  // Método para atualizar o perfil do usuário
  public async updateUserProfile(userProfileData: any): Promise<void> {
    const token = LocalStorageService.getItem('authToken');

    if (!token) {
      throw new Error('No auth token found');
    }

    // Tenta obter o ID do usuário a partir do objeto userProfileData
    const id = userProfileData.id;
    
    if (!id) {
      throw new Error('ID do usuário não encontrado');
    }

    try {
      // Substitui PATCH por PUT para realizar uma atualização completa do perfil do usuário
      await http.put(`/user/profile/${id}`, userProfileData, {
        headers: {
          'Authorization': `Token ${token}`,
        },
      });
    } catch (error) {
      console.error('Erro ao atualizar perfil do usuário:', error);
      throw error;
    }
  }

  // Método para buscar especialidades
  public async getSpecialties(): Promise<any> {
    const token = LocalStorageService.getItem('authToken');

    if (!token) {
      throw new Error('No auth token found');
    }

    try {
      const response = await http.get('/doctor/specialties', {
        headers: {
          'Authorization': `Token ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar especialidades:', error);
      throw error;
    }
  }

  async listSpecialties() {
    try {
      const response = await http.get('/doctor/list-specialties');
      return response.data; // Lista de especialidades
    } catch (error) {
      console.error('Erro ao listar especialidades:', error);
      throw error;
    }
  }
}

export default new EditProfileService();
