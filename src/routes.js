import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import { logout } from "./redux/auth";

import Auth from "./views/Auth";
import LoginForm from "./views/Auth/LoginForm";
import Register from "./views/Register";
import { NotFound } from "./views/NotFound";

//teachers
import { DashBoard } from "./views/teacher/DashBoard";
import { Subjects } from "./views/teacher/Subjects";
import { SubjectLessons } from "./views/teacher/SubjectLessons";
import { ViewLesson } from "./views/teacher/ViewLesson";

//students

import { DashBoard as StudentDashboard } from "./views/student/Dashboard";
import { Subjects as StudentSubjects } from "./views/student/Subjects";
import { SubjectDetails } from "./views/student/SubjectDetails";
import { LessonDetails } from "./views/student/LessonDetails";

const Logout = () => {
  const dispatch = useDispatch();
  dispatch(logout());

  return <Redirect to="/" />;
};

const RouteProtected = ({
  isProtected = false,
  hasAccess = true,
  fallBackRoute = "*",
  ...rest
}) => {
  if (!isProtected) return <Redirect to="/" />;

  if (!hasAccess) return <Redirect to={fallBackRoute} />;

  return <Route {...rest} />;
};

const RouteUnprotected = ({
  isAuthenticated = false,
  fallBackRoute = "",
  ...rest
}) => {
  if (!isAuthenticated) return <Route {...rest} />;

  return <Redirect to={fallBackRoute} />;
};

export const AppRoutes = () => {
  const { access_token, userType } = useSelector(({ auth }) => auth);

  return (
    <Router>
      <Switch>
        {/* student access */}

        <RouteProtected
          isProtected={access_token}
          hasAccess={userType === "students"}
          exact
          path={"/students/dashboard"}
          component={StudentDashboard}
        />

        <RouteProtected
          isProtected={access_token}
          hasAccess={userType === "students"}
          exact
          path={"/students/subjects"}
          component={StudentSubjects}
        />

        <RouteProtected
          isProtected={access_token}
          hasAccess={userType === "students"}
          exact
          path={"/students/subjects/:id/lesson"}
          component={SubjectDetails}
        />

        <RouteProtected
          isProtected={access_token}
          hasAccess={userType === "students"}
          exact
          path={"/students/lessons/:lesson_id"}
          component={LessonDetails}
        />

        {/* teachers access */}

        <RouteProtected
          isProtected={access_token}
          hasAccess={userType === "teachers"}
          exact
          path={"/teachers/dashboard"}
          component={DashBoard}
        />

        <RouteProtected
          isProtected={access_token}
          hasAccess={userType === "teachers"}
          exact
          path={"/teachers/subjects"}
          component={Subjects}
        />

        <RouteProtected
          isProtected={access_token}
          hasAccess={userType === "teachers"}
          exact
          path={"/teachers/subjects/:id"}
          component={SubjectLessons}
        />

        <RouteProtected
          isProtected={access_token}
          hasAccess={userType === "teachers"}
          exact
          path={"/teachers/lessons/:lesson_id"}
          component={ViewLesson}
        />

        {/* all outside routes */}

        <RouteUnprotected
          isAuthenticated={access_token}
          fallBackRoute={
            userType === "students"
              ? "/students/dashboard"
              : "/teachers/dashboard"
          }
          exact
          path="/"
          component={Auth}
        />

        <RouteUnprotected
          isAuthenticated={access_token}
          fallBackRoute={
            userType === "students"
              ? "/students/dashboard"
              : "/teachers/dashboard"
          }
          exact
          path="/register/:type"
          component={Register}
        />

        <RouteUnprotected
          isAuthenticated={access_token}
          fallBackRoute={
            userType === "students"
              ? "/students/dashboard"
              : "/teachers/dashboard"
          }
          exact
          path="/login/:type"
          component={LoginForm}
        />

        <Route path="/logout" exact component={Logout} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
};
