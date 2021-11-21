import React from "react";
import { Card } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

const { Meta } = Card;

export const SubjectItem = ({ ...data }) => {
  const history = useHistory();

  const { Subject } = data;

  const viewSubject = () => {
    history.push(`/students/subjects/${Subject.id}/lesson`);
  };

  return (
    <Card actions={[<EyeOutlined key="view" onClick={viewSubject} />]}>
      <Meta
        title={`${Subject?.code} | ${Subject.joinCode}` ?? ""}
        description={Subject?.description ?? ""}
      />
    </Card>
  );
};
