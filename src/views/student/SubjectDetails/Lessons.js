import React from "react";

import { Card, Empty, Col } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
const { Meta } = Card;

export const Lessons = ({ lessons }) => {
  const history = useHistory();

  if (lessons.length === 0) {
    return <Empty />;
  }

  return (
    <>
      {lessons.map((data) => (
        <Col xs={24} sm={24} md={12} lg={6} xl={6}>
          <Card
            key={data.id}
            actions={[
              <EyeOutlined
                key="view"
                onClick={() => {
                  history.push("/students/lessons/" + data.id);
                }}
              />,
            ]}>
            <Meta title={data.title} description={data.description} />
          </Card>
        </Col>
      ))}
    </>
  );
};
