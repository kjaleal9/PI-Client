import * as React from "react";
import { Outlet } from "react-router-dom";
import {
  StopOutlined,
  ShopOutlined,
  LaptopOutlined,
  OrderedListOutlined,
  LineChartOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme, Typography, Image } from "antd";

import { Link } from "react-router-dom";

import { PlusOutlined } from "@ant-design/icons";

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
  getItem(<Link to={"recipes"}>Recipes</Link>, "1", <ShopOutlined />),
  getItem(<Link to={"trains"}>Trains</Link>, "2", <ShopOutlined />),
  getItem(<Link to={"materials"}>Materials</Link>, "3", <LaptopOutlined />),
  getItem(
    <Link to={"procedure"}>Procedures</Link>,
    "4",
    <OrderedListOutlined />
  ),
  getItem(<Link to={"errorLog"}>Errors</Link>, "5", <StopOutlined />),
  getItem(
    <Link to={"reportCIP"}>CIP Reports</Link>,
    "6",
    <LineChartOutlined />
  ),
  getItem(
    <Link to={"reportProduction"}>Production Reports</Link>,
    "7",
    <LineChartOutlined />
  ),
  getItem(
    <Link to={"performanceCIP"}>CIP Performance</Link>,
    "8",
    <LineChartOutlined />
  ),
  getItem(
    <Link to={"performanceProduction"}>Production Performance</Link>,
    "9",
    <LineChartOutlined />
  ),
  getItem(
    <Link to={"liveMonitoring"}>Live Monitoring</Link>,
    "10",
    <LineChartOutlined />
  ),
  getItem(
    <Link to={"qualityControl"}>QualityControl</Link>,
    "11",
    <LineChartOutlined />
  ),
  getItem(
    <Link to={"traceability"}>Traceability</Link>,
    "12",
    <LineChartOutlined />
  ),
  getItem(
    <Link to={"sampleCIPReport"}>SampleCIPReport</Link>,
    "13",
    <LineChartOutlined />
  ),
  getItem(<Link to={"plcPump"}>PLC Pump</Link>, "14", <LineChartOutlined />),
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
        <Image src="%PUBLIC_URL%/TP_Logo.png"></Image>
        <Typography.Title
          level={3}
          style={{
            margin: 0,
            color: "whitesmoke",
          }}
        >
          Production Integrator{" "}
          {
            //<PlusOutlined />}
          }
        </Typography.Title>
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
            defaultSelectedKeys={["1"]}
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
