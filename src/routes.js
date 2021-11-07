import React from "react";
import { useDispatch } from "react-redux";
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

// export const RouteGuard = ({
//   hasAccess,
//   route = "/register/:type",
//   fallbackRoute = "/",
//   component,
//   exact,
// }) => {
//   return hasAccess ? (
//     <Route path={route} exact={exact} component={component} />
//   ) : (
//     <Redirect to={fallbackRoute} exact />
//   );
// };

export const Logout = () => {
  const dispatch = useDispatch();
  dispatch(logout());

  return <Redirect to="/" />;
};

export const AppRoutes = () => {
  // const { access_token, userType } = useSelector(({ auth }) => auth);

  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Auth} />
        <Route path="/register/:type" exact component={Register} />
        <Route path="/login/:type" exact component={LoginForm} />
        <Route path="/students/dashboard" exact component={DashBoard} />
        <Route path="/teachers/dashboard" exact component={DashBoard} />
        <Route path="/logout" exact component={Logout} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
};
