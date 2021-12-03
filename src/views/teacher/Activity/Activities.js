import React, { useState } from "react";
import { List, Tag, Button, message } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { ModalUpdateCreate } from "./ModalUpdateCreate";
import { ModalUpload } from "./ModalUpload";
import { StudentActivityModal } from "./StudentActivityModal";
import {
  deleteActivity,
  deleteUploadedFile,
} from "../../../services/activities";
import { useSelector } from "react-redux";

export const Activities = ({ activities, lesson_id }) => {
  const [modal, setModal] = useState({
    lesson_id,
    open: false,
    activity_id: 0,
    data: {},
  });

  const [uploadModal, setUploadModal] = useState({
    open: false,
    activity_id: 0,
  });

  const [activitiesModal, setActivitiesModal] = useState({
    open: false,
    activity_id: 0,
  });

  const { access_token } = useSelector(({ auth }) => auth);

  const handleClose = () => {
    setModal({
      lesson_id,
      open: false,
      activity_id: 0,
      data: {},
    });
  };

  const handleCloseModalUpload = () => {
    setUploadModal({
      open: false,
      activity_id: 0,
    });
  };

  const handleDeleteActivity = async (activity_id) => {
    const { success, ...result } = await deleteActivity({
      access_token,
      lesson_id,
      activity_id,
    });

    if (success) {
      message.success("Successfully Deleted");
      return;
    }

    message.error(result.error.message);
  };

  const handleDeleteUploadedFile = async (id, filename) => {
    const { success, ...result } = await deleteUploadedFile({
      access_token,
      id,
      filename,
    });

    if (success) {
      message.success("Successfully Deleted");
      return;
    }

    message.error(result.error.msg);
  };

  const handleCloseActivityModal = () => {
    setActivitiesModal({
      open: false,
      activity_id: 0,
    });
  };

  return (
    <>
      <List
        itemLayout="vertical"
        size="large"
        dataSource={activities}
        renderItem={(item) => (
          <List.Item
            key={item.id}
            actions={[
              <Button
                type="text"
                onClick={() => {
                  setModal((prev) => ({
                    ...prev,
                    open: true,
                    activity_id: item.id,
                    data: {
                      title: item.title,
                      description: item.description,
                      activityTimeline: [
                        moment(item.dateStart, "YYYY/MM/DD"),
                        moment(item.dateEnd, "YYYY/MM/DD"),
                      ],
                    },
                  }));
                }}>
                <EditOutlined />
              </Button>,
              <Button
                type="text"
                onClick={() => {
                  setUploadModal({
                    open: true,
                    activity_id: item.id,
                  });
                }}>
                <UploadOutlined />
              </Button>,
              <Button
                type="text"
                onClick={() => {
                  setActivitiesModal({
                    open: true,
                    activity_id: item.id,
                  });
                }}>
                <UserOutlined />
              </Button>,

              <Button type="text" onClick={() => handleDeleteActivity(item.id)}>
                <DeleteOutlined />
              </Button>,
            ]}
            extra={
              <Tag color={moment(item.dateEnd) < moment() ? "default" : "blue"}>
                {moment(item.dateEnd) < moment() ? "Inactive" : "Active"}
              </Tag>
            }>
            <List.Item.Meta title={item.title} description={item.description} />
            <p>
              {`From : ${moment(item?.dateStart).format(
                "MMMM DD, YYYY @ hh:mm a",
              )} - To : ${moment(item?.dateEnd).format(
                "MMMM DD, YYYY @ hh:mm a",
              )}`}
            </p>

            {item.LessonActivityAttachments.map((data) => (
              <Tag
                color="blue"
                key={data.id}
                onClose={() => {
                  handleDeleteUploadedFile(data.id, data.filename);
                }}
                closable>
                {data.title} : {data.filename}
              </Tag>
            ))}
          </List.Item>
        )}
      />
      <ModalUpdateCreate
        open={modal.open}
        lesson_id={lesson_id}
        activity_id={modal.activity_id}
        handleClose={handleClose}
        data={{
          title: modal.data.title,
          description: modal.data.description,
          activityTimeline: [
            moment(modal.data.dateStart),
            moment(modal.data.dateEnd),
          ],
        }}
      />

      <ModalUpload
        open={uploadModal.open}
        activity_id={uploadModal.activity_id}
        handleClose={handleCloseModalUpload}
      />

      <StudentActivityModal
        open={activitiesModal.open}
        activity_id={activitiesModal.activity_id}
        handleClose={handleCloseActivityModal}
      />
    </>
  );
};
