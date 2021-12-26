import React from "react";
import { Layout, Menu, Typography } from "antd";
import {
  ReadOutlined,
  LogoutOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const { Sider } = Layout;

export const SideBar = ({ collapsed, handleOpen }) => {
  const history = useHistory();
  const { userType } = useSelector(({ auth }) => auth);

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
        <Menu.Item
          key="3"
          icon={<ReadOutlined />}
          onClick={() => {
            history.push(`/${userType}/subjects`);
          }}>
          Subjects
        </Menu.Item>

        <Menu.Item
          key="3"
          icon={<SettingOutlined />}
          onClick={() => {
            history.push(`/${userType}/settings`);
          }}>
          Settings
        </Menu.Item>

        <Menu.Item
          key="7"
          icon={<LogoutOutlined />}
          onClick={() => {
            history.push(`/logout`);
          }}>
          Logout
        </Menu.Item>
      </Menu>
    </Sider>
  );
};
