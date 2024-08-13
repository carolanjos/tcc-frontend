import http from '@/services/http.service';
import ForgotPasswordRequest from '@/modules/Login/ForgotPassword/entities/forgost-pasword.entity';

class PasswordRecoveryService {
  static async sendResetPasswordLink(data: ForgotPasswordRequest): Promise<void> {
    try {
      await http.post('/user/forgot-password', data);
    } catch (error) {
      console.error('Error sending reset password link:', error);
      throw error;
    }
  }
}

export default PasswordRecoveryService;
