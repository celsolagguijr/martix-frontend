import React, { useState } from "react";
import { Form, Input, Button, Card, message } from "antd";
import { useSelector } from "react-redux";
import { changePassword } from "../../services/profile";

const ChangePassword = () => {
  const [loading, setLoading] = useState(false);

  const { access_token, userType } = useSelector(({ auth }) => auth);

  const onFinish = async (data) => {
    setLoading(true);

    const { success, error } = await changePassword({
      access_token,
      type: userType,
      body: data,
    });

    setLoading(false);

    if (success) {
      message.success("Password successfully changed");

      return;
    }

    message.error(error.message);
  };

  return (
    <div className="register-container">
      <Card title="Change Password" style={{ width: 500 }}>
        <Form
          name="register"
          layout="vertical"
          onFinish={onFinish}
          scrollToFirstError>
          <Form.Item
            name="password"
            label="New Password"
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

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Save
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ChangePassword;
