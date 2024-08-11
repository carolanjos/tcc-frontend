import Doctor from '@/modules/Register/RegisterDoctor/entities/doctor.entity';
import axios from 'axios';

class EditDoctorService {
  getDoctorFromStorage(): Doctor | null {
    const doctorData = localStorage.getItem('doctor');
    if (doctorData) {
      return JSON.parse(doctorData) as Doctor;
    }
    return null;
  }

  async updateDoctor(doctor: Doctor): Promise<void> {
    try {
      const response = await axios.put('/backoffice/doctor-register', doctor, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      // Atualizar o LocalStorage com as novas informações
      localStorage.setItem('doctor', JSON.stringify(response.data));
    } catch (error: any) {
      throw new Error('Erro ao atualizar o perfil do médico.');
    }
  }
}

export default new EditDoctorService();
