import React from "react";
import { Card } from "antd";
import { EditOutlined, FolderOpenOutlined } from "@ant-design/icons";

const { Meta } = Card;

export const SubjectItem = ({ handleEditSubject, ...data }) => {
  return (
    <Card
      actions={[
        <FolderOpenOutlined key="open-folder" />,
        <EditOutlined
          key="edit"
          onClick={() => {
            handleEditSubject({ ...data });
          }}
        />,
      ]}>
      <Meta title={data.code} description={data.description} />
    </Card>
  );
};
