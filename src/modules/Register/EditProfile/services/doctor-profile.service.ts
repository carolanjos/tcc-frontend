import http from '@/services/http.service';
import LocalStorageService from '@/services/localStorage.service';
import Doctor from '@/modules/Register/EditProfile/entities/doctor-profile.entity';

class DoctorProfileService {
  public async fetchDoctorProfile(): Promise<Doctor> {
    const token = LocalStorageService.getItem('authToken');

    if (!token) {
      throw new Error('No auth token found');
    }

    try {
      const response = await http.get('/doctor/profile', {
        headers: {
          'Authorization': `Token ${token}`,
        },
      });
      const {
        id, name, email, birthdate, document, sex, phone, password, crm, specialties
      } = response.data;
      return new Doctor(id, name, email, birthdate, document, sex, phone, password, crm, specialties);
    } catch (error) {
      console.error('Erro ao buscar perfil do doutor:', error);
      throw error;
    }
  }

  public async updateDoctorProfile(doctor: Doctor): Promise<void> {
    const token = LocalStorageService.getItem('authToken');

    if (!token) {
      throw new Error('No auth token found');
    }

    try {
      await http.patch(`/doctor/profile/${doctor.id}`, {
        name: doctor.name,
        email: doctor.email,
        birthdate: doctor.birthdate,
        document: doctor.document,
        sex: doctor.sex,
        phone: doctor.phone,
        password: doctor.password,
        crm: doctor.crm,
        specialties: doctor.specialties,
      }, {
        headers: {
          'Authorization': `Token ${token}`,
        },
      });
    } catch (error) {
      console.error('Erro ao atualizar perfil do doutor:', error);
      throw error;
    }
  }
}

export default new DoctorProfileService();
