import http from '@/services/http.service';
import LocalStorageService from '@/services/localStorage.service';
import Patient from '@/modules/Register/EditProfile/entities/patient-profile.entity';

class PatientProfileService {
  public async fetchPatientProfile(): Promise<Patient> {
    const token = LocalStorageService.getItem('authToken');

    if (!token) {
      throw new Error('No auth token found');
    }

    try {
      const response = await http.get('/patient/profile', {
        headers: {
          'Authorization': `Token ${token}`,
        },
      });
      const { id, name, email, date_birth, document, phone, sex, password } = response.data;
      return new Patient(id, name, email, date_birth, document, phone, sex, password);
    } catch (error) {
      console.error('Erro ao buscar perfil do paciente:', error);
      throw error;
    }
  }

  public async updatePatientProfile(patient: Patient): Promise<void> {
    const token = LocalStorageService.getItem('authToken');

    if (!token) {
      throw new Error('No auth token found');
    }

    try {
      await http.patch(`/patient/profile/${patient.id}`, {
        name: patient.name,
        email: patient.email,
        date_birth: patient.date_birth,
        document: patient.document,
        phone: patient.phone,
        sex: patient.sex,
        password: patient.password,
      }, {
        headers: {
          'Authorization': `Token ${token}`,
        },
      });
    } catch (error) {
      console.error('Erro ao atualizar perfil do paciente:', error);
      throw error;
    }
  }
}

export default new PatientProfileService();
