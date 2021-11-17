import React from "react";
import { onSelectSubject } from "../../redux/subjects";
import { useDispatch } from "react-redux";
import { Card } from "antd";
import { EditOutlined, FolderOpenOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

const { Meta } = Card;

export const SubjectItem = ({ handleEditSubject, ...data }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const viewSubject = ({ ...data }) => {
    dispatch(onSelectSubject({ ...data }));

    setTimeout(() => {
      history.push("/teachers/subjects/" + data.id);
    }, 200);
  };

  return (
    <Card
      actions={[
        <FolderOpenOutlined
          key="open-folder"
          onClick={() => {
            viewSubject(data);
          }}
        />,
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
