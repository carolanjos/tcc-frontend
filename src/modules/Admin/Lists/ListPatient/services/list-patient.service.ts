import http from '@/services/http.service';
import LocalStorageService from '@/services/localStorage.service';
import UserPatient from '@/modules/Admin/Lists/ListPatient/entities/list-patient.entity';

export default class ListPatientService { 
    static async fetchListPatients(): Promise<UserPatient[]> {
        const token = LocalStorageService.getItem('authToken');
        const role = LocalStorageService.getItem('role');

        if (!token) {
            throw new Error ('Token inválido');
        }

        if (role !== 'admin') {
            throw new Error('Apenas o admin pode acessar essa lista');
        }

        try {
            const response = await http.get('/user/list-appointments-admin', {
                headers: {
                    'Authorization': `Token ${token}`,
                },
            });

            return response.data.map((user: any) =>
                new UserPatient(
                    user.id,
                    user.patient_name,
                    user.doctor_name,
                    user.start_time,
                    user.date,
                    user.status,
                    user.specialty_name,
                    user.date_birth
                )
            );
        } catch (error) {
            console.error('Erro ao buscar pacientes:', error)
            throw error;
        }
    }
}