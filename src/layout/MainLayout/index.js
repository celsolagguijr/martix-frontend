import React from "react";
import { Layout, Typography } from "antd";
import { Link } from "react-router-dom";

import "./style.css";

const { Header, Content } = Layout;

const MainLayout = ({ children }) => {
  return (
    <Layout className="wrapper">
      <Header className="header">
        <Link to={`/`}>
          <Typography.Title level={2} className="header-title-typography">
            Matrics
          </Typography.Title>
        </Link>
      </Header>

      <Content>
        <div className="login-container">{children}</div>
      </Content>
    </Layout>
  );
};

export default MainLayout;
