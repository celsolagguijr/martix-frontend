import React from "react";
import { Layout, Typography } from "antd";

import "./style.css";

const { Header, Content } = Layout;

const LoginLayout = ({ children }) => {
  return (
    <Layout className="wrapper">
      <Header className="header">
        <Typography.Title level={2} className="header-title-typography">
          Matrics
        </Typography.Title>
      </Header>

      <Content>
        <div className="login-container">{children}</div>
      </Content>
    </Layout>
  );
};

export default LoginLayout;
