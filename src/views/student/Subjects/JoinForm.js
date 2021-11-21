import React, { useEffect, useState } from "react";
import { joinSubject } from "../../../services/subjects";

import { useSelector } from "react-redux";
import { Form, Input, Button, message } from "antd";

export const JoinForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [joinCode, setJoinCode] = useState("");
  const { access_token } = useSelector(({ auth }) => auth);

  useEffect(() => {
    form.setFieldsValue({
      joinCode,
    });
  }, [joinCode, form]);

  const onFinish = async (val) => {
    setLoading(true);

    const { success, ...result } = await joinSubject({
      access_token,
      code: joinCode,
    });
    setLoading(false);

    if (success) {
      message.success(
        "Successfully Joined. Kindly wait for the approval of teacher",
      );
      setJoinCode("");
      return;
    }

    message.error(result.error.msg);
  };

  const onChangeFieldValues = ({ joinCode: code }) => {
    setJoinCode(code);
  };

  return (
    <Form
      form={form}
      initialValues={{
        joinCode,
      }}
      layout="vertical"
      onFinish={onFinish}
      onValuesChange={onChangeFieldValues}>
      <Form.Item
        name="joinCode"
        label="Code"
        rules={[{ required: true, message: "Code is required" }]}>
        <Input placeholder="Enter Code" />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          block
          style={{ marginRight: ".5em" }}>
          Join
        </Button>
      </Form.Item>
    </Form>
  );
};
