import React from "react";
import { Form, Input, Button, Card, Alert } from "antd";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./style.css";
import MainLayout from "../../layout/MainLayout";

import { useSignUp } from "./useSignUp";

import "./style.css";

const Register = () => {
  const { type } = useParams();

  const { alert, loading, save } = useSignUp();

  const onFinish = (data) => {
    save(data);
  };

  return (
    <MainLayout>
      <div className="register-container">
        <Card
          title={`Sign up  as ${type === "students" ? "Student" : "Teacher"}`}
          style={{ width: 500 }}>
          <Form
            name="register"
            layout="vertical"
            onFinish={onFinish}
            scrollToFirstError>
            <Form.Item
              name="lastName"
              label="Last Name"
              rules={[
                {
                  required: true,
                  message: "Please input your Last Name",
                },
              ]}>
              <Input />
            </Form.Item>
            <Form.Item
              name="firstName"
              label="First Name"
              rules={[
                {
                  required: true,
                  message: "Please input your First Name",
                },
              ]}>
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}>
              <Input />
            </Form.Item>

            <Form.Item
              name="contactNumber"
              label="Phone Number"
              rules={[
                { required: true, message: "Please input your phone number!" },
              ]}>
              <Input style={{ width: "100%" }} />
            </Form.Item>

            <div className="account-info">
              <Form.Item
                name="userName"
                label="Username"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}>
                <Input />
              </Form.Item>

              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
                hasFeedback>
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The two passwords that you entered do not match!",
                        ),
                      );
                    },
                  }),
                ]}>
                <Input.Password />
              </Form.Item>
            </div>
            {alert.show ? (
              <div style={{ margin: "1em 0" }}>
                <Alert message={alert.msg} type={alert.type} showIcon />
              </div>
            ) : null}

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                Submit
              </Button>
              <span style={{ marginLeft: "1em" }}>
                Already have an account ?{" "}
                <Link to={`/login/${type}`}> Sign In </Link>
              </span>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Register;
