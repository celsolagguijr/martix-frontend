import React from "react";
import { useParams } from "react-router-dom";
import Page from "../../../layout/PageLayout/Page";
import { Activities } from "../Activity";
import { useLessonMaterials } from "./useLessonMaterials";

import { Row, Col, PageHeader, Space } from "antd";
import { UploadMaterial } from "./UploadMaterial";
import { Materials } from "./Materials";
import { Instructions } from "./Instructions";

import moment from "moment";

export const ViewLesson = () => {
  const { lesson_id } = useParams();

  const {
    materials,
    lessonDetails,

    isSaving,
    form,
    setForm,
    reset,
    save,
    remove,
  } = useLessonMaterials({
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
          <Col sm={24} md={12} lg={14} xl={14}>
            <Instructions
              instructions={lessonDetails?.instructions ?? ""}
              time={`From : ${moment(lessonDetails?.startsAt).format(
                "MMMM DD, YYYY @ hh:mm a",
              )} - To : ${moment(lessonDetails?.endsAt).format(
                "MMMM DD, YYYY @ hh:mm a",
              )}`}
            />

            <div style={{ marginTop: "1em" }}>
              <Activities lesson_id={lesson_id} />
            </div>
            <div style={{ marginTop: "1em" }}>
              <Materials materials={materials ?? []} remove={remove} />
            </div>
          </Col>
          <Col sm={24} md={12} lg={10} xl={10}>
            <UploadMaterial
              title={`Upload Material`}
              onSave={save}
              onChangeFieldValues={setForm}
              initialValues={form}
              reset={reset}
              isSaving={isSaving}
            />
          </Col>
        </Row>
      </Space>
    </Page>
  );
};
