import * as React from "react";
import { Outlet } from "react-router-dom";
import {
  StopOutlined,
  ShopOutlined,
  LaptopOutlined,
  OrderedListOutlined,
  LineChartOutlined,
  HomeFilled,
} from "@ant-design/icons";
import { Layout, Menu, theme, Typography, Image, Space } from "antd";

import { Link } from "react-router-dom";

import { PlusOutlined } from "@ant-design/icons";
import Home from "./Home";

const { Header, Content, Sider, Footer } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem(<Link to={"/"}>Home</Link>, "1", <HomeFilled />),
  getItem(<Link to={"recipes"}>Recipes</Link>, "2", <ShopOutlined />),
  getItem(
    <Link to={"procedure"}>Procedures</Link>,
    "3",
    <OrderedListOutlined />
  ),
  getItem(<Link to={"trains"}>Trains</Link>, "4", <ShopOutlined />),
  getItem(<Link to={"materials"}>Materials</Link>, "5", <LaptopOutlined />),
  getItem(<Link to={"errorLog"}>Errors</Link>, "6", <StopOutlined />),
  getItem(
    <Link to={"reportCIP"}>CIP Reports</Link>,
    "7",
    <LineChartOutlined />
  ),
  getItem(
    <Link to={"reportProduction"}>Production Reports</Link>,
    "8",
    <LineChartOutlined />
  ),
  getItem(
    <Link to={"performanceCIP"}>CIP Performance</Link>,
    "9",
    <LineChartOutlined />
  ),
  getItem(
    <Link to={"performanceProduction"}>Production Performance</Link>,
    "10",
    <LineChartOutlined />
  ),
  getItem(
    <Link to={"liveMonitoring"}>Live Monitoring</Link>,
    "11",
    <LineChartOutlined />
  ),
  getItem(
    <Link to={"qualityControl"}>QualityControl</Link>,
    "12",
    <LineChartOutlined />
  ),
  getItem(
    <Link to={"traceability"}>Traceability</Link>,
    "13",
    <LineChartOutlined />
  ),
  getItem(
    <Link to={"sampleCIPReport"}>SampleCIPReport</Link>,
    "14",
    <LineChartOutlined />
  ),
  getItem(<Link to={"plcPump"}>PLC Pump</Link>, "15", <LineChartOutlined />),
];

const App = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout
      style={{
        height: "100vh",
        overflow: "auto",
      }}
    >
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          position: "sticky",
          height: "65px",
          top: 0,
          zIndex: 1000,
          maxWidth: "100%",
          background: "#ffffff",
          boxShadow:
            "0 1px 10px 0 rgba(0, 0, 0, 0.05), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)",
          backdropFilter: "blur(8px)",
          backgroundColor: "#1520A6",
        }}
      >
        <Space>
          <Image src="./TP_Logo.png" width={50} />
          <Typography.Title
            level={2}
            style={{
              margin: 0,
              color: "whitesmoke",
            }}
          >
            Production Integrator
          </Typography.Title>
        </Space>
      </Header>
      <Layout>
        <Sider
          width={200}
          style={{
            background: colorBgContainer,
            position: "fixed",
            top: "65px",
            height: "100vh",
            maxHeight: "calc(100vh - 60px)",
            overflow: "auto",
          }}
        >
          <Menu
            mode="inline"
            // defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{
              marginTop: "10px",
              height: "auto",
              borderRight: 0,
              width: 200,
            }}
            items={items}
          />
        </Sider>
        <Layout
          className="site-layout"
          style={{ marginLeft: 200, height: "auto" }}
        >
          <Content
            style={{
              margin: "16px 16px 0",
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;
