import * as React from "react";
import { Outlet } from "react-router-dom";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Breadcrumb,
  Layout,
  Menu,
  theme,
  ConfigProvider,
  Typography,
} from "antd";

import { Link } from "react-router-dom";

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
  getItem(<Link to={"recipes"}>Recipes</Link>, "1", <LaptopOutlined />),
  getItem("Navigation Two", "2", <NotificationOutlined />),
];

const App = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  console.log(theme);
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
          // -webkit-backdrop-filter: blur(8px),
          backdropFilter: "blur(8px)",
          backgroundColor: "#1520A6",
      
        }}
      >
        <Typography.Title
          level={3}
          style={{
            margin: 0,
            color:'whitesmoke'
          }}
        >
          Production Integrator
        </Typography.Title>
      </Header>
      <Layout>
        <Sider
          width={200}
          style={{
            background: colorBgContainer,
            position: "fixed",
            top: "65px",
            // width: "100%",
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
              margin: "24px 16px 0",
            }}
          >
            <Outlet />
          </Content>
          {/* <Footer style={{ textAlign: "center" }}>
            Ant Design ©2023 Created by Ant UED
          </Footer> */}
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;
