import React from "react";
import { useParams } from "react-router-dom";
import Page from "../../../layout/PageLayout/Page";

import { useLessons } from "./useLessons";

import { Row, PageHeader, Space, Typography } from "antd";
import { Lessons } from "./Lessons";

export const SubjectDetails = () => {
  const { id } = useParams();

  const { subjectDetails, lessons } = useLessons({
    subject_id: id,
  });

  const { code, description } = subjectDetails ?? {};

  return (
    <Page>
      <PageHeader
        ghost={false}
        title={code}
        subTitle={description}
        className="page-header"
        onBack={() => window.history.back()}
        style={{
          padding: "1em",
        }}
      />

      <Space direction="vertical" style={{ width: "100%" }} size="large">
        <Typography.Title level={3} style={{ marginTop: "1em" }}>
          Lessons
        </Typography.Title>
        <Row gutter={[12, 12]}>
          <Lessons lessons={lessons} />
        </Row>
      </Space>
    </Page>
  );
};
