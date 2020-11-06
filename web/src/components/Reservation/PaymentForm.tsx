import React from 'react';
import { Formik } from 'formik';
import { Form, FormItem, Input } from 'formik-antd';
import * as Yup from 'yup';
import { Button, Typography } from 'antd';

interface Props {
  fullName: string;
  handleReservation: (values: {
    nameOnCard: string;
    cardNumber: string;
    expiryDate: string;
    cvc: string;
  }) => void;
}

const paymentSchema = Yup.object().shape({
  nameOnCard: Yup.string().min(5).required('Full name is required'),
  cardNumber: Yup.string().max(20).required('Card number is required'),
  expiryDate: Yup.string().max(5).required('Expiry date is required'),
  cvc: Yup.string().min(3).max(4).required(),
});

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 5, span: 16 },
};

const PaymentForm: React.FC<Props> = ({ fullName, handleReservation }) => {
  return (
    <div className="payment-form">
      <Typography.Title style={{ textAlign: 'center', marginBottom: '2rem' }} level={4}>
        Payment Form
      </Typography.Title>
      <Formik
        initialValues={{ nameOnCard: fullName, cardNumber: '', expiryDate: '', cvc: '' }}
        onSubmit={handleReservation}
        validationSchema={paymentSchema}
      >
        {({ dirty, isValid }) => (
          <Form {...layout} className="reserve">
            <FormItem label="Full Name" name="nameOnCard">
              <Input name="nameOnCard" placeholder="Full Name"></Input>
            </FormItem>
            <FormItem label="Card Number" name="cardNumber">
              <Input type="tel" name="cardNumber" placeholder="1234 5678 9012 3456"></Input>
            </FormItem>
            <FormItem label="Expiry Date" name="expiryDate">
              <Input name="expiryDate" placeholder="MM/YY"></Input>
            </FormItem>
            <FormItem label="CVC" name="cvc">
              <Input type="tel" name="cvc" placeholder="CVC"></Input>
            </FormItem>
            <FormItem {...tailLayout} name="complete-reservation">
              <Button type="primary" htmlType="submit" disabled={!dirty || !isValid}>
                Complete Reservation
              </Button>
            </FormItem>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PaymentForm;
