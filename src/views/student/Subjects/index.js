import React, { useState } from "react";
import Page from "../../../layout/PageLayout/Page";
import { Row, Col, Spin, PageHeader, Button, Space, Empty } from "antd";
import { useSubjects } from "./useSubjects";
import { SubjectItem } from "./SubjectItem";
import { DrawerForm } from "./DrawerForm";

export const Subjects = () => {
  const { loading, subjects } = useSubjects();
  const [openForm, setOpenForm] = useState(false);

  return (
    <Page>
      <PageHeader
        title="Joined Subjects"
        extra={[
          <Button type="primary" onClick={() => setOpenForm(true)}>
            Join Subject
          </Button>,
        ]}
        className="page-header"
      />

      <Space direction="vertical" style={{ width: "100%" }} size="large">
        {loading ? (
          <div className="loading">
            <Spin size="large" />
          </div>
        ) : (
          <div>
            {subjects.length === 0 ? (
              <Empty>
                <Button type="primary" onClick={() => setOpenForm(true)}>
                  Join Now
                </Button>
              </Empty>
            ) : (
              <Row gutter={[16, 16]}>
                {subjects.map((data, i) => (
                  <Col key={i} xs={24} sm={24} md={12} lg={6} xl={6}>
                    <SubjectItem {...data} />
                  </Col>
                ))}
              </Row>
            )}
          </div>
        )}
      </Space>

      <DrawerForm
        open={openForm}
        handleClose={() => {
          setOpenForm(false);
        }}
      />
    </Page>
  );
};
