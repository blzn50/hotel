import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import { Form, InputNumber } from 'formik-antd';
import * as Yup from 'yup';
import { Button, Space, Typography } from 'antd';
import { DatePicker } from '../DatePicker';
import { SearchData } from '../../types';
import { SelectField } from './FormField';
import dayjs from 'dayjs';
import { useStateValue } from '../../state';

const { Title } = Typography;

interface Props {
  onSubmit: (values: SearchData) => void;
  searchResultPage: boolean;
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

const selectLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 8 },
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

const SearchForm: React.FC<Props> = ({ onSubmit, searchResultPage }) => {
  const [{ searchedData }] = useStateValue();
  const [formLayout, setFormLayout] = useState<null | typeof layout>(layout);
  const [selectFieldLayout, setSelectFieldLayout] = useState<null | typeof layout>(selectLayout);
  const [localSearchData, setLocalSearchData] = useState<SearchData>({
    dates: [dayjs().format('YYYY-MM-DD'), dayjs().add(1, 'd').format('YYYY-MM-DD')],
    guestNumber: 1,
    roomType: 'single',
    noOfRoom: 1,
  });

  useEffect(() => {
    if (searchResultPage) {
      setFormLayout(null);
      setSelectFieldLayout(null);
      if (Object.values(searchedData).length > 0) {
        const [data] = Object.values(searchedData);
        // console.log(a);
        setLocalSearchData(data);
      }
    }
  }, [searchResultPage, searchedData]);

  return (
    <div className={searchResultPage ? 'secondary-search' : 'search'}>
      {!searchResultPage && (
        <Title level={3} style={{ textAlign: 'center', paddingTop: '1.5rem' }}>
          Always ready to make your stay memorable
        </Title>
      )}
      <Formik
        initialValues={localSearchData}
        enableReinitialize
        onSubmit={onSubmit}
        validationSchema={searchSchema}
      >
        {({ setFieldValue, values }) => (
          <Form
            {...formLayout}
            layout={searchResultPage ? 'inline' : 'horizontal'}
            className="search-form"
          >
            <Form.Item
              className={searchResultPage ? 'search-form__item-spacing' : ''}
              label="Staying dates"
              name="dates"
            >
              <DatePicker.RangePicker
                value={[dayjs(values.dates[0]), dayjs(values.dates[1])]}
                defaultValue={[dayjs(localSearchData.dates[0]), dayjs(localSearchData.dates[1])]}
                disabledDate={disableDate}
                onChange={(_dates, dateString) => {
                  setFieldValue('dates', dateString, true);
                }}
              />
            </Form.Item>

            <Form.Item
              className={
                searchResultPage ? 'search-form__item-spacing search-form__special-item' : ''
              }
              label="No. of guest"
              name="guestNumber"
            >
              <InputNumber name="guestNumber" />
            </Form.Item>

            <Form.Item
              className={
                searchResultPage ? 'search-form__item-spacing search-form__special-item' : ''
              }
              label="No. of Room"
              name="noOfRoom"
            >
              <InputNumber name="noOfRoom" />
            </Form.Item>

            <Form.Item
              {...selectFieldLayout}
              className={searchResultPage ? 'search-form__item-spacing' : ''}
              label="Room Type"
              name="roomType"
            >
              <SelectField name="roomType" options={selectRoomTypeOptions} />
            </Form.Item>

            <Form.Item
              className={searchResultPage ? 'search-button' : ''}
              {...tailLayout}
              name="submit"
            >
              <Button style={{ marginBottom: '1rem' }} type="primary" htmlType="submit">
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
