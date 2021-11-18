import React, { useEffect } from "react";

import { Form, Input, Button, Card, Upload, message } from "antd";
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

  const props = {
    onRemove: (file) => {
      onChangeFieldValues((prev) => {
        const { fileList } = prev;

        const index = fileList.indexOf(file);

        const newFileList = fileList.slice();
        newFileList.splice(index, 1);

        return {
          ...prev,
          fileList: newFileList,
        };
      });
    },
    beforeUpload: (file) => {
      if (initialValues.fileList.length >= 1) {
        message.error("multiple upload not allowed");
        return false;
      }

      onChangeFieldValues((prev) => {
        return {
          ...prev,
          fileList: [...prev.fileList, file],
        };
      });

      return false;
    },
    fileList: initialValues.fileList,
  };

  const handleChangeField = (e) => {
    onChangeFieldValues((prev) => ({ ...prev, ...e }));
  };

  return (
    <Card title={title}>
      <Form
        name="nest-messages"
        layout="vertical"
        onFinish={onSave}
        onValuesChange={handleChangeField}
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
          <Form.Item rules={[{ required: true }]} noStyle>
            <Upload.Dragger name="material" maxCount={1} {...props}>
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
          <Button
            type="primary"
            htmlType="submit"
            loading={isSaving}
            disabled={initialValues.fileList.length === 0}>
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
