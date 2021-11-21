import React, { useEffect, useState } from "react";
import { saveTeacherSubject, removeSubj } from "../../../services/subjects";
import {
  addSubject,
  updateSubject,
  deleteSubject,
} from "../../../redux/subjects";
import { useSelector, useDispatch } from "react-redux";
import { Form, Input, Button, message } from "antd";

export const SubjectForm = ({ ...data }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { access_token } = useSelector(({ auth }) => auth);
  const { subjects } = useSelector(({ subject }) => subject);

  useEffect(() => {
    form.setFieldsValue({
      code: data.code,
      description: data.description,
    });
  }, [data, form]);

  const onFinish = async (val) => {
    setLoading(true);

    form.setFieldsValue({
      code: val.code,
      description: val.description,
    });

    const { success, ...result } = await saveTeacherSubject({
      body: { ...val, id: data?.id },
      access_token,
    });

    [saveError, saveSuccess][Number(success)]({ ...result, val });

    setLoading(false);
  };

  const saveSuccess = ({ data: returnedData, val }) => {
    if (!data?.id) {
      dispatch(addSubject({ ...returnedData.data }));
    } else {
      const index = subjects.findIndex((item) => item.id === data.id);

      dispatch(
        updateSubject({
          index,
          code: val.code,
          description: val.description,
        }),
      );
    }
    message.success(returnedData.msg);
    data.handleClose();
  };

  const saveError = ({ error }) => {
    message.error(error.msg);
    data.handleClose();
  };

  const handleDeleteSubj = async () => {
    setLoading(true);

    const { success, data: returnedData } = await removeSubj({
      id: data.id,
      access_token,
    });

    setLoading(false);
    if (success) {
      message.success(returnedData.msg);

      dispatch(deleteSubject(data.id));
      data.handleClose();
      return;
    }

    data.handleClose();
    message.error(returnedData.msg);
  };

  return (
    <Form
      form={form}
      initialValues={{
        code: data?.code ?? "",
        description: data?.description ?? "",
      }}
      layout="vertical"
      onFinish={onFinish}>
      <Form.Item
        name="code"
        label="Code"
        rules={[{ required: true, message: "Subject code is required" }]}>
        <Input placeholder="Subject Code" />
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
        rules={[{ required: true, message: "Description is required" }]}>
        <Input.TextArea placeholder="Subject Description" />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          style={{ marginRight: ".5em" }}>
          Save
        </Button>
        {data?.id ? (
          <Button
            type="text"
            danger
            htmlType="button"
            loading={loading}
            onClick={handleDeleteSubj}>
            Delete
          </Button>
        ) : null}
      </Form.Item>
    </Form>
  );
};
