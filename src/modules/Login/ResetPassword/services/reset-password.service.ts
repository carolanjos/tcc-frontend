import http from '@/services/http.service';
import ResetPasswordRequest from '@/modules/Login/ResetPassword/entities/reset-password.entity';

class PasswordRecoveryService {
    static async resetPassword(uidb64: string, token: string, data: ResetPasswordRequest): Promise<void> {
        const url = `/user/reset-password/${uidb64}/${token}/`;
        try {
            await http.post(url, data);
        } catch (error) {
            // Aqui você pode tratar o erro, por exemplo, exibindo uma mensagem de erro ou registrando-o.
            console.error('Erro ao redefinir a senha:', error);
            throw error; // Opcional: você pode relançar o erro para ser tratado em outro lugar.
        }
    }
}

export default PasswordRecoveryService;