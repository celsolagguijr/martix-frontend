import React from "react";

import { ClockCircleOutlined } from "@ant-design/icons";

import { Card, Tag } from "antd";

export const Instructions = ({ instructions, time }) => {
  return (
    <Card title={`Instructions`}>
      {instructions}{" "}
      <div style={{ marginTop: "1em" }}>
        <Tag icon={<ClockCircleOutlined />} color="blue">
          {time}
        </Tag>
      </div>
    </Card>
  );
};
