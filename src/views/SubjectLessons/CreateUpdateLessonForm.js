import React, { useEffect } from "react";

import { Form, Input, Button, Card, DatePicker } from "antd";

const { RangePicker } = DatePicker;

const rangeConfig = {
  rules: [
    {
      type: "array",
      required: true,
      message: "Please select time!",
    },
  ],
};

export const CreateUpdateLessonForm = ({
  title = "Create Lesson",
  onSave = () => null,
  initialValues = null,
  onChangeFieldValues = () => null,
  reset = () => null,
  isSaving = false,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues !== null) {
      form.setFieldsValue({
        ...initialValues,
      });
    }
  }, [initialValues, form]);

  const dateFormat = "YYYY/MM/DD";
  return (
    <Card title={title}>
      <Form
        name="nest-messages"
        layout="vertical"
        onFinish={onSave}
        onValuesChange={onChangeFieldValues}
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

        <Form.Item name="lessonTimeLine" label="RangePicker" {...rangeConfig}>
          <RangePicker style={{ width: "100%" }} format={dateFormat} />
        </Form.Item>

        <Form.Item
          name="instructions"
          label="Instructions"
          rules={[{ required: true }]}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isSaving}>
            Save
          </Button>
          <Button type="text" onClick={reset} disabled={isSaving}>
            Clear
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};
