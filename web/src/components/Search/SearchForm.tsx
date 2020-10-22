import React from 'react';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import { Form, InputNumber } from 'formik-antd';
import * as Yup from 'yup';
import { Button, Typography } from 'antd';
import { DatePicker } from '../DatePicker';
import { SearchData } from '../../types';
import { SelectField } from './FormField';
import dayjs from 'dayjs';

const { Title } = Typography;

interface Props {
  onSubmit: (values: SearchData) => void;
}

const selectRoomTypeOptions: string[] = ['single', 'double', 'triple', 'family', 'suite', 'all'];

const searchSchema = Yup.object().shape({
  dates: Yup.array().of(Yup.date().required(`Field is required`)),
  guestNumber: Yup.number()
    .min(1, 'At least 1 guest must be selected')
    .max(50, 'We only allow maximum of 50 guests.')
    .required('Number of guest must be selected'),
  roomType: Yup.mixed()
    .oneOf(['single', 'double', 'triple', 'family', 'suite', 'all'] as const)
    .required('Room type must be selected'),
  noOfRoom: Yup.number()
    .min(1, 'At least 1 room must be selected')
    .max(50, 'We only have 50 rooms in the hotel')
    .required('No. of room is required'),
});

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};

const tailLayout = {
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 19,
      offset: 5,
    },
  },
};

const disableDate = (today: any) => {
  return today < dayjs().subtract(1, 'd').endOf('day');
};

const SearchForm: React.FC<Props> = ({ onSubmit }) => {
  return (
    <div className="search">
      <Title level={3} style={{ textAlign: 'center', paddingTop: '1.5rem' }}>
        Always ready to make your stay memorable
      </Title>
      <Formik
        initialValues={{
          dates: [dayjs().format('YYYY-MM-DD'), dayjs().add(1, 'd').format('YYYY-MM-DD')],
          guestNumber: 1,
          roomType: 'single',
          noOfRoom: 1,
        }}
        onSubmit={onSubmit}
        validationSchema={searchSchema}
      >
        {({ setFieldValue }) => (
          <Form {...layout} className="search-form">
            <Form.Item label="Staying dates" name="dates">
              <DatePicker.RangePicker
                defaultValue={[dayjs(), dayjs().add(1, 'd')]}
                disabledDate={disableDate}
                onChange={(dates, dateString) => {
                  setFieldValue('dates', dateString, true);
                }}
              />
            </Form.Item>

            <Form.Item label="No. of guest" name="guestNumber">
              <InputNumber name="guestNumber" />
            </Form.Item>

            <Form.Item label="No. of Room" name="noOfRoom">
              <InputNumber name="noOfRoom" />
            </Form.Item>

            <Form.Item label="Room Type" name="roomType">
              <SelectField name="roomType" options={selectRoomTypeOptions} />
            </Form.Item>

            <Form.Item {...tailLayout} name="submit">
              <Button style={{ marginBottom: '0.5rem' }} type="primary" htmlType="submit">
                Search
              </Button>
            </Form.Item>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SearchForm;
