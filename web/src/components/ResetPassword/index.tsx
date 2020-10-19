import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { notification, Typography } from 'antd';
import { ResetPasswordData } from '../../types';
import { baseApi } from '../../utils/httpUtils';
import ResetPasswordForm from './ResetPasswordForm';

const { Title, Text } = Typography;

const ResetPassword: React.FC = () => {
  const { token }: { token: string } = useParams();
  const history = useHistory();

  const handleSubmit = async (value: ResetPasswordData) => {
    try {
      await baseApi.post(`/user/reset-password/${token}`, value);
      notification.success({
        message: 'Success',
        description: 'Password reset successful. You will be redirected to login page in a moment',
        top: 70,
      });
      setTimeout(() => {
        history.replace('/login');
      }, 5000);
    } catch (error) {
      console.log(error);
      error.response.data.error.map((message: string) => {
        return notification.error({ message: 'Error', description: message, top: 70 });
      });

      setTimeout(() => {
        history.replace('/');
      }, 3000);
    }
  };
  return (
    <div className="form-container inner-spacing">
      <Title level={4} style={{ textAlign: 'center' }}>
        Reset Password
      </Title>
      <div className="reset-password__container">
        <Text>Please enter a new password.</Text>
        <ResetPasswordForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default ResetPassword;
