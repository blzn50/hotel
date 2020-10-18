import React from 'react';
import { Formik } from 'formik';
import { Form, Input } from 'formik-antd';
import { Button, Typography } from 'antd';
import * as Yup from 'yup';
import { RegisterData } from '../../types';
import { Link } from 'react-router-dom';

const { Title } = Typography;

interface Props {
  onSubmit: (values: RegisterData) => void;
}

const registerSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'First name must be at least 2 characters long')
    .required('First name is required'),
  lastName: Yup.string()
    .min(2, 'Last name must be at least 2 characters long')
    .required('Last name is required'),
  email: Yup.string().email('Please input valid email').required('Email is required'),
  password: Yup.string()
    .min(5, 'Password must be at least 5 characters long')
    .required('Password is required'),
});

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
const tailLayout = {
  wrapperCol: { span: 24 },
};

const RegisterForm: React.FC<Props> = ({ onSubmit }) => {
  return (
    <div className="form-container">
      <Title level={3} style={{ textAlign: 'center', paddingTop: '1.5rem' }}>
        Register
      </Title>
      <Formik
        initialValues={{ firstName: '', lastName: '', email: '', password: '' }}
        onSubmit={onSubmit}
        validationSchema={registerSchema}
      >
        {() => (
          <Form {...layout} className="register">
            <Form.Item name="firstName" label="First Name">
              <Input name="firstName" placeholder="First Name" />
            </Form.Item>
            <Form.Item name="lastName" label="Last Name">
              <Input name="lastName" placeholder="Last Name" />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input name="email" type="email" placeholder="Email" />
            </Form.Item>

            <Form.Item label="Password" name="password">
              <Input.Password name="password" type="password" placeholder="password" />
            </Form.Item>
            <Form.Item {...tailLayout} name="register">
              <Button
                style={{ width: '100%', marginBottom: '0.5rem' }}
                type="primary"
                htmlType="submit"
              >
                Register
              </Button>
              Or <Link to="/login">Login</Link>
            </Form.Item>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;
