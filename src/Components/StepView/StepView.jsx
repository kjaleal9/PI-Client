import { Typography, Card, Select } from "antd";
import React, { useEffect, useState } from "react";

const StepView = (props) => {
  const { stepTypes } = props;
  console.log(stepTypes);
  const [stepType, setStepType] = useState(1);
 

  return (
    <Card>
      <Typography.Title level={4}>Step Details</Typography.Title>
      <Select style={{ width: 240 }} options={stepTypes} />
    </Card>
  );
};

export default StepView;
