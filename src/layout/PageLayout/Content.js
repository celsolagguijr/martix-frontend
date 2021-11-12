import React from "react";
import { Layout, Typography } from "antd";
const { Content } = Layout;

const { Title } = Typography;

export const PageContent = ({ children, ...rest }) => {
  return <Content className="app-content">{children}</Content>;
};
