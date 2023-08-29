import React, { useState } from "react";

import MaterialArray from "../Components/MaterialArray/MaterialArray";
import { Card, Col } from "antd";

const Materials = ({ label, value, onChange }) => {
  const [inputValue, setInputValue] = useState(value);

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    onChange(newValue);
  };

  return (
    <Col span={12}>
      <Card>
        <MaterialArray />
      </Card>
    </Col>
  );
};

export default Materials;
