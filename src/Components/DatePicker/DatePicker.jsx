import React from 'react';
import { Button, DatePicker, Form, TimePicker } from 'antd';
const { RangePicker } = DatePicker;

const rangeConfig = {
  rules: [
    {
      type: 'array',
      required: true,
      message: 'Please select time!',
    },
  ],
};
const onFinish = (fieldsValue) => {
  // Should format date value before submit.
  const rangeValue = fieldsValue['range-picker'];
  const rangeTimeValue = fieldsValue['range-time-picker'];
  const values = {
    ...fieldsValue,
    'date-picker': fieldsValue['date-picker'].format('YYYY-MM-DD'),
    'date-time-picker': fieldsValue['date-time-picker'].format('YYYY-MM-DD HH:mm:ss'),
    'month-picker': fieldsValue['month-picker'].format('YYYY-MM'),
    'range-picker': [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')],
    'range-time-picker': [
      rangeTimeValue[0].format('YYYY-MM-DD HH:mm:ss'),
      rangeTimeValue[1].format('YYYY-MM-DD HH:mm:ss'),
    ],
    'time-picker': fieldsValue['time-picker'].format('HH:mm:ss'),
  };
  console.log('Received values of form: ', values);
};
const DateTimeRangePicker = () => (
  <Form
    name="CIP_summary_search"
    {...formItemLayout}
    onFinish={onFinish}
    style={{
      maxWidth: 600,
    }}
  >
   
    <Form.Item name="range-time-picker" label="RangePicker[showTime]" {...rangeConfig}>
      <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
    </Form.Item>
    
   
  </Form>
);
export default DateTimeRangePicker;