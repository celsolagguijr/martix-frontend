import React from "react";
import { Layout } from "antd";
const { Content } = Layout;

export const PageContent = ({ children }) => {
  return <Content className="app-content">{children}</Content>;
};
