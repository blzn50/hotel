import React, { Fragment } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Input } from 'formik-antd';
import { Button } from 'antd';
import { ForgotPasswordData } from '../../types';

interface Props {
  onSubmit: (value: ForgotPasswordData) => void;
}

const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email('Please input valid email').required('Email is required'),
});

const ForgotPasswordForm: React.FC<Props> = ({ onSubmit }) => {
  return (
    <Fragment>
      <Formik
        initialValues={{ email: '' }}
        onSubmit={onSubmit}
        validationSchema={forgotPasswordSchema}
      >
        {() => (
          <Form style={{ paddingTop: '2rem' }}>
            <Form.Item label="Email" name="email">
              <Input name="email" type="email" placeholder="Email" />
            </Form.Item>

            <Form.Item name="submit">
              <Button style={{ float: 'right' }} type="primary" htmlType="submit">
                Send Reset Instructions
              </Button>
            </Form.Item>
          </Form>
        )}
      </Formik>
    </Fragment>
  );
};

export default ForgotPasswordForm;
