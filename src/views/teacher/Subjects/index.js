import React, { useState, useEffect } from "react";
import { fetchTeacherSubjects } from "../../../redux/subjects";
import { useSelector, useDispatch } from "react-redux";

import Page from "../../../layout/PageLayout/Page";
import { SubjectItem } from "./SubjectItem";

import "./style.css";

import { Row, Col, Spin, PageHeader, Button, Space, Empty } from "antd";

import { DrawerForm } from "./DrawerForm";

export const Subjects = () => {
  const [openForm, setOpenForm] = useState(false);
  const [formData, setFormData] = useState({
    code: "",
    description: "",
  });
  const dispatch = useDispatch();

  const { subjects, loading } = useSelector(({ subject }) => subject);

  useEffect(() => {
    dispatch(fetchTeacherSubjects());
  }, [dispatch]);

  const handleCreateSubject = () => {
    setFormData({
      code: "",
      description: "",
    });
    setOpenForm(true);
  };

  const handleEditSubject = ({ id, code, description }) => {
    setFormData({
      id,
      code,
      description,
    });
    setOpenForm(true);
  };

  return (
    <Page>
      <PageHeader
        title="My Subjects"
        extra={[
          <Button type="primary" onClick={handleCreateSubject}>
            Create Subject
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
                <Button type="primary" onClick={handleCreateSubject}>
                  Create Now
                </Button>
              </Empty>
            ) : (
              <Row gutter={[16, 16]}>
                {subjects.map((data, i) => (
                  <Col key={i} xs={24} sm={24} md={12} lg={6} xl={6}>
                    <SubjectItem
                      handleEditSubject={handleEditSubject}
                      {...data}
                    />
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
        {...formData}
      />
    </Page>
  );
};
