import React from "react";
import { useParams } from "react-router-dom";
import Page from "../../../layout/PageLayout/Page";

import { useLessons } from "./useLessons";

import { Row, Col, PageHeader, Space } from "antd";
import { CreateUpdateLessonForm } from "./CreateUpdateLessonForm";
import { Lessons } from "./Lessons";
import { Students } from "./Students";

export const SubjectLessons = () => {
  const { id } = useParams();

  const {
    subjectDetails,
    lessons,
    form,
    isSaving,
    onChangeFormValue,
    save,
    edit,
    resetForm,
    remove,
  } = useLessons({
    subject_id: id,
  });
  const { code, description } = subjectDetails;

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
        <Row gutter={[12, 12]}>
          <Col sm={24} md={12} lg={10} xl={10}>
            <CreateUpdateLessonForm
              title={`${form?.id ? "Update" : "Create"} lesson`}
              onSave={save}
              onChangeFieldValues={onChangeFormValue}
              initialValues={form}
              reset={resetForm}
              isSaving={isSaving}
            />
            <div style={{ marginTop: "1em" }}>
              <Students title={"Students"} subject_id={id} />
            </div>
            <div style={{ marginTop: "1em" }}>
              <Students
                title={"Pending for approval"}
                type={0}
                subject_id={id}
              />
            </div>
          </Col>
          <Col sm={24} md={12} lg={14} xl={14}>
            <Lessons lessons={lessons} edit={edit} remove={remove} />
          </Col>
        </Row>
      </Space>
    </Page>
  );
};
