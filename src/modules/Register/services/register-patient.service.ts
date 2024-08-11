import http from '@/services/http.service';
import localStorageService from '@/services/localStorage.service';

class RegisterPatientService {
  public async registerPatient(patientData: any): Promise<void> {
    try {
      await http.post('/patient/register', patientData, {
        headers: {
          'Accept': 'application/json',
        },
      });

      // Salva a role "paciente" no LocalStorage
      localStorageService.setItem('role', 'paciente');

      // Exibe mensagem de sucesso
      alert('Paciente registrado com sucesso!');

    } catch (error) {
      console.error('Erro ao registrar paciente:', error);
      throw error;
    }
  }
}

export default new RegisterPatientService();
