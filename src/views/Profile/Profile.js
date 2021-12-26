import React, { useState } from "react";
import { Form, Input, Button, Card, message, DatePicker } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/auth";
import { updateProfile } from "../../services/profile";
import moment from "moment";

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { profile, access_token, userType, birthdate, ...rest } = useSelector(
    ({ auth }) => auth,
  );

  const onFinish = async (data) => {
    setLoading(true);

    const { success, error } = await updateProfile({
      access_token,
      type: userType,
      body: data,
    });

    setLoading(false);

    if (success) {
      message.success("Profile updated successfully");
      dispatch(updateState(data));
      return;
    }

    message.error(error.message);
  };

  const initialValues = {
    birthdate: birthdate ? moment(birthdate) : moment(),
    ...rest,
  };

  return (
    <div className="register-container">
      <Card title="Profile" style={{ width: 500 }}>
        <Form
          name="register"
          layout="vertical"
          initialValues={{ ...initialValues }}
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
          <Form.Item
            name="address"
            label="Address"
            type="textarea"
            rules={[{ required: false }]}>
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="birthdate" label="Date of birth">
            <DatePicker style={{ width: "100%" }} />
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

export default Profile;
