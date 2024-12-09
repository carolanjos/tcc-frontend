import Users from '@/modules/Admin/Lists/ListUsers/entities/list-users.entity';
import http from '@/services/http.service';
import LocalStorageService from '@/services/localStorage.service';

export default class ListUsersService {
    static async fetchUsers(): Promise<Users[]> {
        const token = LocalStorageService.getItem('authToken');
        const role = LocalStorageService.getItem('role');

        if (!token) {
            throw new Error('Token inválido');
        }

        if (role !== 'admin') {
            throw new Error('Apenas o admin pode acessar essa lista');
        }

        try {
            const response = await http.get('/user/list-users', {
                headers: {
                    'Authorization': `Token ${token}`,
                },
            });
            
            return response.data.map((user: any) =>
                new Users(
                    user.id,
                    user.name,
                    user.email,
                    user.phone,
                    user.document,
                    user.date_birth
                )
            );
        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
            throw error;
        }
    }
}
