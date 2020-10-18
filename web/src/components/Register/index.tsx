import React from 'react';
import { notification } from 'antd';
import RegisterForm from './RegisterForm';
import { RegisterData, UserResponse } from '../../types';
import { Redirect, useHistory } from 'react-router-dom';
import { baseApi } from '../../utils/httpUtils';
import { login, useStateValue } from '../../state';

const Register: React.FC = () => {
  const [{ user }, dispatch] = useStateValue();
  const history = useHistory();
  const handleRegister = async (formData: RegisterData) => {
    try {
      const { data: loginData } = await baseApi.post<UserResponse>(`/user/register`, formData);
      dispatch(login(loginData));
      history.push('/');
    } catch (error) {
      console.log(error.response.data);
      error.response.data.error.map((message: string) => {
        return setTimeout(() => {
          notification.error({ message: 'Error', description: message, top: 70 });
        }, 200);
      });
    }
  };

  if (Object.values(user).length > 0) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <RegisterForm onSubmit={handleRegister} />
    </div>
  );
};

export default Register;
