import React, { useEffect } from "react";

import { Form, Input, Button, Card, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";

export const UploadMaterial = ({
  title = "Upload Materials",
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

  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

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

        <Form.Item>
          <Form.Item
            name="dragger"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            noStyle>
            <Upload.Dragger name="files" action="/upload.do">
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
            </Upload.Dragger>
          </Form.Item>
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
