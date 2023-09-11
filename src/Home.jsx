import React from "react";

import {
  Layout,
  Menu,
  theme,
  Typography,
  Image,
  Card,
  Calendar,
  Row,
  Col,
} from "antd";
import CustomCalendar from "./Components/CustomCalendar/CustomCalendar";

const Home = () => {
  return (
    <Card>
      <Row gutter={[16]}>
        <Col span={24}>
          <CustomCalendar />
        </Col>
      </Row>
    </Card>
  );
};

export default Home;
