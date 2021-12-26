import React, { useState } from "react";
import { Form, Avatar as Profile, Button, Card, Upload, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { saveProfilePicture } from "../../services/profile";
import { updateProfile } from "../../redux/auth";
import { useSelector, useDispatch } from "react-redux";

const Avatar = () => {
  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const { access_token, userType, profile } = useSelector(({ auth }) => auth);

  const onFinish = async (data) => {
    setLoading(true);

    const formData = new FormData();

    formData.append("profile", files[0]);

    const {
      success,
      error,
      data: d,
    } = await saveProfilePicture({
      access_token,
      type: userType,
      body: formData,
    });

    setLoading(false);

    if (success) {
      message.success("Profile picture successfully changed");
      setFiles([]);

      dispatch(updateProfile(d.newProfile));
      return;
    }

    message.error(error.message);
  };

  const props = {
    onRemove: (file) => {
      setFiles((prev) => {
        const index = prev.indexOf(file);

        const newFileList = prev.slice();
        newFileList.splice(index, 1);

        return newFileList;
      });
    },
    beforeUpload: (file) => {
      if (files.length >= 1) {
        message.error("multiple upload not allowed");
        return false;
      }

      setFiles((prev) => [...prev, file]);

      return false;
    },

    fileList: files,
  };

  return (
    <div className="register-container">
      <Card style={{ width: 500 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}>
          <Profile
            size={150}
            src={`http://localhost:3000/profile_picture/${profile}`}>
            <UserOutlined />
          </Profile>
        </div>

        <Form
          name="register"
          layout="vertical"
          style={{ marginTop: "1em" }}
          onFinish={onFinish}>
          <Form.Item rules={[{ required: true }]}>
            <Upload.Dragger name="profile" maxCount={1} {...props}>
              <p className="ant-upload-text">Click or drag file here</p>
            </Upload.Dragger>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              disabled={files.length === 0}
              loading={loading}>
              Save
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Avatar;
