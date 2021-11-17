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
import { DashBoard } from "./views/DashBoard";
import { Subjects } from "./views/Subjects";
import { SubjectLessons } from "./views/SubjectLessons";
import { ViewLesson } from "./views/ViewLesson";

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
          component={DashBoard}
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
