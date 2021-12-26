import React, { useState, useEffect } from "react";
import { Card, List, Empty, Avatar } from "antd";
import { joinedStudents, updateStatus } from "../../../services/subjects";
import { useSelector } from "react-redux";
import { message, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";

export const Students = ({ title, type = 1, subject_id }) => {
  const [students, setStudents] = useState([]);
  const { access_token } = useSelector(({ auth }) => auth);

  useEffect(() => {
    let mounted = true;

    const url =
      type === 1
        ? `/api/subjects/${subject_id}/students`
        : `/api/subjects/${subject_id}/students/for-approval`;

    const getStudents = async () => {
      const { success, ...result } = await joinedStudents({
        access_token,
        url,
      });

      if (success) {
        setStudents([...result.data]);
        return;
      }

      message.error(result.error.msg);
    };

    if (mounted) getStudents();

    return () => {
      mounted = false;
    };
  }, []);

  const update = async ({ id, status }) => {
    const { success, ...result } = await updateStatus({
      access_token,
      id,
      status,
    });

    if (success) {
      setStudents((prev) => [...prev.filter((data) => data.id !== id)]);
      message.success("Successfully Updated");
      return;
    }

    message.error(result.error.msg);
  };

  return (
    <Card title={`${title} (${students.length})`}>
      {students.length === 0 ? (
        <Empty />
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={students}
          size="small"
          renderItem={(item) => (
            <List.Item
              actions={
                type === 1
                  ? []
                  : [
                      <Button
                        type="primary"
                        primary
                        onClick={() => {
                          update({ id: item.id, status: 1 });
                        }}>
                        Accept
                      </Button>,
                      <Button
                        type="primary"
                        danger
                        onClick={() => {
                          update({ id: item.id, status: 3 });
                        }}>
                        Decline
                      </Button>,
                    ]
              }>
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={`http://localhost:3000/profile_picture/${item.Student.profile}`}>
                    <UserOutlined />
                  </Avatar>
                }
                title={`${item.Student.firstName} ${item.Student.lastName}`}
                description={`${item.Student.userName} | ${item.Student.email}`}
              />
            </List.Item>
          )}
        />
      )}
    </Card>
  );
};
