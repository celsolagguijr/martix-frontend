import React from "react";
import { Card, Form, Input, Button, Divider, Alert } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import LoginLayout from "../../layout/LoginLayout";

import { useLogin } from "./useLogin";

import "./style.css";

const StudentLogin = () => {
  const { type } = useParams();

  const { isLoading, alert, authenticate } = useLogin();

  const onFinish = (values) => {
    authenticate({ ...values });
  };

  return (
    <LoginLayout>
      <div className="login-container">
        <Card
          title={`Sign In as ${type === "students" ? "Student" : "Teacher"}`}
          style={{ width: "400px" }}>
          {alert.show ? (
            <div style={{ marginBottom: "1.5em" }}>
              <Alert message={alert.msg} type={alert.type} showIcon />
            </div>
          ) : null}
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            size="large"
            onFinish={onFinish}>
            <Form.Item
              name="userName"
              rules={[{ required: true, message: "Username is required" }]}>
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: "Password is required" }]}>
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                loading={isLoading}>
                Log in
              </Button>

              <Divider>Or</Divider>

              <Button type="link" className="login-form-button">
                Register
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </LoginLayout>
  );
};

export default StudentLogin;
