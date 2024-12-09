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
      localStorageService.setItem('name', patientData.name);

      // Salva os dados do paciente no LocalStorage como um objeto
      localStorageService.setObject('patientData', patientData);


      // Exibe mensagem de sucesso
      alert('Paciente registrado com sucesso!');
      
    } catch (error) {
      console.error('Erro ao registrar paciente:', error);
      alert('Ocorreu um erro ao registrar o paciente. Por favor, tente novamente mais tarde.');
      throw error;
    }
  }
}

export default new RegisterPatientService();
