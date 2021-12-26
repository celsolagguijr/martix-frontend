import React from "react";
import Page from "../../layout/PageLayout/Page";
import { Row, Col, Spin, PageHeader, Button, Space, Empty } from "antd";
import Profile from "./Profile";
import ChangePassword from "./ChangePassword";
import Avatar from "./Avatar";

const Settings = () => {
  return (
    <Page>
      <Space direction="vertical" style={{ width: "100%" }} size="large">
        <Avatar />
      </Space>
      <Space direction="vertical" style={{ width: "100%" }} size="large">
        <Profile />
      </Space>
      <Space direction="vertical" style={{ width: "100%" }} size="large">
        <ChangePassword />
      </Space>
    </Page>
  );
};

export default Settings;
