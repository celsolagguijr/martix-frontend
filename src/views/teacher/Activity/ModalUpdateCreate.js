import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Input, DatePicker, message } from "antd";
import { createActivity, updateActivitiy } from "../../../services/activities";
import { useSelector } from "react-redux";

const { RangePicker } = DatePicker;

export const ModalUpdateCreate = ({
  open,
  handleClose,
  lesson_id = 0,
  activity_id = 0,
  data = null,
}) => {
  const [loading, setLoading] = useState(false);
  const { access_token } = useSelector(({ auth }) => auth);

  const rangeConfig = {
    rules: [
      {
        type: "array",
        required: true,
        message: "Please select time!",
      },
    ],
  };

  const dateFormat = "YYYY/MM/DD";

  const [form] = Form.useForm();

  useEffect(() => {
    if (data !== null) {
      form.setFieldsValue({
        ...data,
      });

      console.log(data);
    }
  }, [data]);

  const handleSave = async (e) => {
    setLoading(true);

    const {
      activityTimeline: [dateStart, dateEnd],
      ...rest
    } = e;

    const body = {
      dateEnd,
      dateStart,
      ...rest,
    };

    const { success, data, error } =
      activity_id !== 0
        ? await updateActivitiy({ access_token, lesson_id, activity_id, body })
        : await createActivity({ access_token, lesson_id, body });
    setLoading(false);

    if (success) {
      message.success("Successfully Saved!");
      handleClose();

      return;
    }

    message.error(error.message);
  };

  return (
    <Modal visible={open} title="Activity" footer={null}>
      <Form
        name="nest-messages"
        layout="vertical"
        onFinish={handleSave}
        form={form}>
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true }]}>
          <Input.TextArea />
        </Form.Item>

        <Form.Item name="activityTimeline" label="Date" {...rangeConfig}>
          <RangePicker style={{ width: "100%" }} format={dateFormat} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Save
          </Button>
          <Button type="text" onClick={handleClose}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
