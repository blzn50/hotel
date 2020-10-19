import React, { Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Typography } from 'antd';

import { baseApi } from '../../utils/httpUtils';
import { ForgotPasswordData } from '../../types';
import { useStateValue } from '../../state';
import ForgotPasswordForm from './ForgotPasswordForm';

const { Title, Text } = Typography;

const ForgotPassword: React.FC = () => {
  const [{ user }] = useStateValue();
  const [requestSent, setRequestSent] = useState(false);

  const handleSubmit = async (value: ForgotPasswordData) => {
    try {
      await baseApi.post('/user/forgot-password', value);
      setRequestSent(true);
    } catch (error) {
      console.log(error);
    }
  };

  if (Object.values(user).length > 0) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <div className="form-container inner-spacing">
        <Title style={{ textAlign: 'center' }} className="user__no-select">
          Sunshine Hotel
        </Title>

        <div className="forgot-password__container">
          <Title level={4} style={{ paddingTop: '1.5rem' }}>
            Forgot Password
          </Title>
          {requestSent ? (
            <Fragment>
              <Text>
                If we found an account associated with that email, we've sent password reset
                instructions to the email address on the account.
              </Text>

              <p style={{ paddingTop: '1rem' }}>Please check your inbox.</p>
            </Fragment>
          ) : (
            <Fragment>
              <Text>
                To reset your password, please enter the email address that you used to register
                with us.
              </Text>
              <ForgotPasswordForm onSubmit={handleSubmit} />
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
