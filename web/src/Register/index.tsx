import React from 'react';
import { Formik } from 'formik';
import { Form, Input } from 'formik-antd';
import { Button, Layout } from 'antd';
import { RegisterData } from '../types';

interface Props {
  onSubmit: (values: RegisterData) => void;
}

const { Content } = Layout;

const Register: React.FC<Props> = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{ firstName: '', lastName: '', email: '', password: '' }}
      onSubmit={onSubmit}
    >
      <Form>
        <Input name="firstName" placeholder="First Name" />
        <Input name="lastName" placeholder="Last Name" />
        <Input name="email" type="email" placeholder="Email" />
        <Input name="password" type="password" placeholder="password" />
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form>
    </Formik>
  );
};

export default Register;
