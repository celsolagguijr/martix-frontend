import React from "react";
import { useParams } from "react-router-dom";
import Page from "../../../layout/PageLayout/Page";

import { useLessonMaterials } from "./useLessonMaterials";

import { Row, Col, PageHeader, Space } from "antd";
import { Materials } from "./Materials";
import { Instructions } from "./Instructions";
import { Activities } from "../Activity";

import moment from "moment";

export const LessonDetails = () => {
  const { lesson_id } = useParams();

  const { materials, lessonDetails } = useLessonMaterials({
    lesson_id,
  });

  return (
    <Page>
      <PageHeader
        ghost={false}
        title={lessonDetails?.title ?? ""}
        subTitle={lessonDetails?.description ?? ""}
        className="page-header"
        onBack={() => window.history.back()}
        style={{
          padding: "1em",
        }}
      />

      <Space direction="vertical" style={{ width: "100%" }} size="large">
        <Row gutter={[12, 12]}>
          <Col sm={24} md={24} lg={24} xl={24}>
            <Instructions
              instructions={lessonDetails?.instructions ?? ""}
              time={`From : ${moment(lessonDetails?.startsAt).format(
                "MMMM DD, YYYY @ hh:mm a",
              )} - To : ${moment(lessonDetails?.endsAt).format(
                "MMMM DD, YYYY @ hh:mm a",
              )}`}
            />
          </Col>

          <Col sm={24} md={24} lg={24} xl={24}>
            <Activities lesson_id={lesson_id} />
          </Col>
          <Col sm={24} md={24} lg={24} xl={24}>
            <Materials materials={materials ?? []} />
          </Col>
        </Row>
      </Space>
    </Page>
  );
};
