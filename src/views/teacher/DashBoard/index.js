import React from "react";
import Page from "../../../layout/PageLayout/Page";
import { Result, Button } from "antd";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export const DashBoard = () => {
  const { firstName, userType } = useSelector(({ auth }) => auth);
  const history = useHistory();
  return (
    <Page>
      <Result
        status="success"
        title={"Welcome  " + firstName.toUpperCase()}
        subTitle="Mathematics Alternative Learning Transfer as a Remote Instruction Curriculum Supplement "
        extra={[
          <Button
            type="primary"
            key="console"
            onClick={() => {
              history.push(`/${userType}/subjects`);
            }}>
            View My Subjects
          </Button>,
        ]}
      />
    </Page>
  );
};
