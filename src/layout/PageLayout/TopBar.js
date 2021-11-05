import React from "react";
import { Layout, Button, Typography } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

const { Header } = Layout;

export const TopBar = ({ collapsed, handleCollapse }) => {
  return (
    <Header className="site-layout">
      {!collapsed ? null : (
        <Typography.Title level={3} className="app-title-2">
          Matrics
        </Typography.Title>
      )}

      <Button
        shape="circle"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => {
          handleCollapse();
        }}
      />
    </Header>
  );
};
