import React, { Fragment } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Input } from 'formik-antd';
import { Button } from 'antd';
import { ResetPasswordData } from '../../types';

interface Props {
  onSubmit: (value: ResetPasswordData) => void;
}

const resetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(5, 'Password must be at least 5 characters long')
    .required('Password is required'),
});

const ResetPasswordForm: React.FC<Props> = ({ onSubmit }) => {
  return (
    <Fragment>
      <Formik
        initialValues={{ password: '' }}
        onSubmit={onSubmit}
        validationSchema={resetPasswordSchema}
      >
        {() => (
          <Form style={{ paddingTop: '2rem' }}>
            <Form.Item label="New Password" name="password">
              <Input.Password name="password" placeholder="New Password" />
            </Form.Item>

            <Form.Item name="submit">
              <Button style={{ float: 'right' }} type="primary" htmlType="submit">
                Reset Password
              </Button>
            </Form.Item>
          </Form>
        )}
      </Formik>
    </Fragment>
  );
};

export default ResetPasswordForm;
