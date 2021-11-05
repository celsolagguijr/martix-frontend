import React from "react";
import { Card, Button } from "antd";
import LoginLayout from "../../layout/LoginLayout";
import { setUserType } from "../../redux/auth";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import "./style.css";

const ChooseLayout = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const gotoLoginForm = (type) => {
    dispatch(setUserType(type));
    history.push("/login/" + type);
  };

  return (
    <LoginLayout>
      <div className="login-container">
        <Card
          style={{ width: 350 }}
          cover={
            <img
              alt="example"
              src={process.env.PUBLIC_URL + "/undraw_back_to_school_inwc.svg"}
              className="picture"
            />
          }>
          <Button block size="large" onClick={() => gotoLoginForm("students")}>
            I'm a Student
          </Button>
        </Card>
        <Card
          style={{ width: 350 }}
          cover={
            <img
              alt="example"
              src={process.env.PUBLIC_URL + "/undraw_teacher_-35-j2.svg"}
              className="picture"
            />
          }>
          <Button block size="large" onClick={() => gotoLoginForm("teachers")}>
            I'm a Teacher
          </Button>
        </Card>
      </div>
    </LoginLayout>
  );
};

export default ChooseLayout;
