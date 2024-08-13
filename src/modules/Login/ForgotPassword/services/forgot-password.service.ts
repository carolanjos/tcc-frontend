import http from '@/services/http.service';
import ForgotPasswordRequest from '@/modules/Login/ForgotPassword/entities/forgost-pasword.entity';
import ResetPasswordRequest from '@/modules/Login/ResetPassword/entities/reset-password.entity';

class PasswordRecoveryService {
  static async sendResetPasswordLink(data: ForgotPasswordRequest): Promise<void> {
    
    try {
      await http.post('user/forgot-password', data);
      console.log('Reset password link sent successfully');
    } catch (error:any) {
      console.error('AAAAAAAAAAAAAAAAAAAA Error sending reset password link:', error.response);
    }
  }

  static async resetPassword(uid: string, token: string, data: ResetPasswordRequest): Promise<void> {
    try {
      await http.post(`/user/reset-password/Nw/${token}`, data);
      console.log('Password reset successfully', data);
    } catch (error) {
      console.error('Error resetting password:', error);
    }
  }
}

export default PasswordRecoveryService;