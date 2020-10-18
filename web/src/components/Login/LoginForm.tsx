import React from 'react';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import { Form, Input } from 'formik-antd';
import * as Yup from 'yup';
import { Button, Typography } from 'antd';
import { LoginData } from '../../types';

const { Title } = Typography;

interface Props {
  onSubmit: (values: LoginData) => void;
}

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Please input valid email').required('Email is required'),
  password: Yup.string()
    .min(5, 'Password must be at least 5 characters long')
    .required('Password is required'),
});

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const tailLayout = {
  wrapperCol: { span: 24 },
};

const LoginForm: React.FC<Props> = ({ onSubmit }) => {
  return (
    <div className="form-container">
      <Title level={3} style={{ textAlign: 'center', paddingTop: '1.5rem' }}>
        Login
      </Title>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={onSubmit}
        validationSchema={loginSchema}
      >
        {({ isValid, dirty }) => (
          <Form {...layout} className="register">
            <Form.Item label="Email" name="email">
              <Input name="email" type="email" placeholder="Email" />
            </Form.Item>

            <Form.Item label="Password" name="password">
              <Input.Password name="password" type="password" placeholder="password" />
            </Form.Item>

            <Form.Item {...tailLayout} name="forgot-password">
              <Link style={{ float: 'right' }} to="/forgot-password" className="forgot-password">
                Forgot Password?
              </Link>
            </Form.Item>

            <Form.Item {...tailLayout} name="submit">
              <Button
                style={{ width: '100%', marginBottom: '0.5rem' }}
                type="primary"
                htmlType="submit"
                disabled={!dirty || !isValid}
              >
                Login
              </Button>
              Or <Link to="/register">Register now!</Link>
            </Form.Item>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
