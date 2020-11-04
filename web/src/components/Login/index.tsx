import React from 'react';
import { notification } from 'antd';
import { LoginData, UserResponse, TLocationProps } from '../../types';
import LoginForm from './LoginForm';
import { login, useStateValue } from '../../state';
import { Redirect, useHistory, useLocation, RouteProps } from 'react-router-dom';
import { baseApi } from '../../utils/httpUtils';

const Login: React.FC = () => {
  const [{ user }, dispatch] = useStateValue();
  const history = useHistory();
  const location: TLocationProps = useLocation();

  const handleLogin = async (formData: LoginData) => {
    try {
      const { data: loginData } = await baseApi.post<UserResponse>(`/user/login`, formData);
      dispatch(login(loginData));
      if (location.state && location.state.redirectTo) {
        history.push(location.state.redirectTo);
      } else {
        history.push('/');
      }
    } catch (error) {
      console.log(error.response.data);
      error.response.data.error.map((message: string) => {
        return notification.error({ message: 'Error', description: message, top: 70 });
      });
    }
  };

  if (Object.values(user).length > 0) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
};

export default Login;
