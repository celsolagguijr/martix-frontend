import React, { useState, useEffect } from "react";
import { Modal, List, message, Tag, Avatar } from "antd";
import { getStudentActivities } from "../../../services/activities";
import { useSelector } from "react-redux";
import moment from "moment";

import { UserOutlined } from "@ant-design/icons";

export const StudentActivityModal = ({
  open,
  handleClose,
  activity_id = 0,
}) => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const { access_token } = useSelector(({ auth }) => auth);

  useEffect(() => {
    let isMounted = true;

    const fetchActivities = async () => {
      setLoading(true);
      const { success, error, data } = await getStudentActivities({
        access_token,
        activity_id,
      });
      setLoading(false);

      if (success) {
        setActivities([...data]);

        return;
      }

      message.error(error?.msg ?? error?.message ?? "Something went wrong");
    };

    if (open) fetchActivities();

    return () => {
      isMounted = false;
    };
  }, [open, activity_id]);

  return (
    <Modal
      visible={open}
      title="Student Activities"
      footer={null}
      onCancel={handleClose}>
      <List
        itemLayout="horizontal"
        dataSource={activities}
        loading={loading}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Tag
                key="tag"
                color={
                  moment(item.LessonActivity.dateEnd) < moment(item.createdAt)
                    ? "red"
                    : "blue"
                }>
                {moment(item.LessonActivity.dateEnd) < moment(item.createdAt)
                  ? "Late"
                  : "On Time"}
              </Tag>,
            ]}>
            <List.Item.Meta
              avatar={
                <Avatar
                  src={`http://localhost:3000/profile_picture/${item.Student.profile}`}>
                  <UserOutlined />
                </Avatar>
              }
              title={
                <a
                  href={`http://localhost:3000/api/student-activities/${item.filename}/download`}
                  target="_blank">
                  {item.Student.lastName}, {item.Student.firstName} |{" "}
                  {item.Student.userName}
                </a>
              }
              description={item.filename}
            />
          </List.Item>
        )}
      />
      ,
    </Modal>
  );
};
