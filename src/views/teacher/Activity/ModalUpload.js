import React, { useState } from "react";
import { Modal, Button, Form, Input, message, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { saveActivityAttachment } from "../../../services/activities";
import { useSelector } from "react-redux";

export const ModalUpload = ({ open, handleClose, activity_id = 0 }) => {
  const [loading, setLoading] = useState(false);
  const { access_token } = useSelector(({ auth }) => auth);

  const [formData, setFormData] = useState({
    title: "",
    fileList: [],
  });

  const [form] = Form.useForm();

  const handleSave = async (e) => {
    setLoading(true);

    const body = new FormData();
    body.append("activity", formData.fileList[0]);
    body.append("title", formData.title);

    const { success, data, error } = await saveActivityAttachment({
      access_token,
      body,
      activity_id,
    });

    setLoading(false);

    if (success) {
      message.success("Successfully Saved!");
      handleClose();

      return;
    }
    message.error(error?.message ?? "Something went wrong");
  };

  const props = {
    onRemove: (file) => {
      setFormData((prev) => {
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
      if (formData.fileList.length >= 1) {
        message.error("multiple upload not allowed");
        return false;
      }

      setFormData((prev) => {
        return {
          ...prev,
          fileList: [...prev.fileList, file],
        };
      });

      return false;
    },
    fileList: formData.fileList,
  };

  const handleChangeField = (e) => {
    setFormData((prev) => ({ ...prev, ...e }));
  };

  return (
    <Modal visible={open} title="Attach File" footer={null}>
      <Form
        name="nest-messages"
        layout="vertical"
        onFinish={handleSave}
        onValuesChange={handleChangeField}
        form={form}>
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input />
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
