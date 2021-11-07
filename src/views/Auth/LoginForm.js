import React from "react";
import { Card, Form, Input, Button, Alert } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useParams, Link } from "react-router-dom";
import MainLayout from "../../layout/MainLayout";

import { useLogin } from "./useLogin";

import "./style.css";

const StudentLogin = () => {
  const { type } = useParams();

  const { isLoading, alert, authenticate } = useLogin();

  const onFinish = (values) => {
    authenticate({ ...values });
  };

  return (
    <MainLayout>
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
                // className="login-form-button"
                loading={isLoading}>
                Sign In
              </Button>

              <span style={{ marginLeft: "1em" }}>
                Don't have an account ?{" "}
                <Link to={`/register/${type}`}>Sign Up</Link>
              </span>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </MainLayout>
  );
};

export default StudentLogin;
