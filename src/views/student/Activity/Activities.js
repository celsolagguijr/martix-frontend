import React, { useState } from "react";
import { List, Tag, Button, Divider } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import moment from "moment";
import { ModalUpload } from "./ModalUpload";

export const Activities = ({ activities }) => {
  const [uploadModal, setUploadModal] = useState({
    open: false,
    activity_id: 0,
  });

  const handleCloseModalUpload = () => {
    setUploadModal({
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
                  setUploadModal({
                    open: true,
                    activity_id: item.id,
                  });
                }}>
                <UploadOutlined />
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
              <a
                href={`http://localhost:3000/api/activities/${data.filename}/download`}
                target="_blank">
                <Tag color="blue" key={data.id}>
                  {data.title} : {data.filename}
                </Tag>
              </a>
            ))}
            {item.StudentSubmittedActivities.length > 0 ? (
              <>
                <Divider />
                <div style={{ marginTop: "2em" }}>
                  <p>Submitted Activity : </p>
                  {item.StudentSubmittedActivities.map((data) => (
                    <Tag color="green" key={data.id}>
                      {data.filename}
                    </Tag>
                  ))}
                </div>
              </>
            ) : null}
          </List.Item>
        )}
      />

      <ModalUpload
        open={uploadModal.open}
        activity_id={uploadModal.activity_id}
        handleClose={handleCloseModalUpload}
      />
    </>
  );
};
