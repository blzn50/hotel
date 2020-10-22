import React from 'react';
import { Select } from 'formik-antd';

const { Option } = Select;

type SelectFieldProps = {
  name: string;
  options: string[];
};

export const SelectField: React.FC<SelectFieldProps> = ({ name, options }) => (
  <Select defaultValue={options[0]} name={name} placeholder="Select Room Type">
    {options.map((option) => (
      <Option key={option} value={option}>
        {option}
      </Option>
    ))}
  </Select>
);
