import React from "react";
import { Layout, Menu, Typography } from "antd";
import {
  BarChartOutlined,
  ReadOutlined,
  SolutionOutlined,
  FileDoneOutlined,
  NotificationOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

export const SideBar = ({ collapsed, handleOpen }) => {
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      // breakpoint="sm"
      width={250}
      onBreakpoint={(broken) => {
        handleOpen();
      }}
      className="side-bar">
      {collapsed ? null : (
        <Typography.Title level={3} className="app-title">
          Matrics
        </Typography.Title>
      )}

      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        className={`${collapsed ? "menu-margin-top" : ""}`}>
        <Menu.Item key="1" icon={<BarChartOutlined />}>
          Dashboard
        </Menu.Item>
        <Menu.Item key="2" icon={<SolutionOutlined />}>
          My Classes
        </Menu.Item>
        <Menu.Item key="3" icon={<ReadOutlined />}>
          My Subjects
        </Menu.Item>
        <Menu.Item key="4" icon={<FileDoneOutlined />}>
          Activities
        </Menu.Item>
        <Menu.Item key="5" icon={<NotificationOutlined />}>
          Announcements
        </Menu.Item>
        <Menu.Item key="6" icon={<SettingOutlined />}>
          Settings
        </Menu.Item>
        <Menu.Item key="7" icon={<LogoutOutlined />}>
          Logout
        </Menu.Item>
      </Menu>
    </Sider>
  );
};
