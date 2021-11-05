import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Auth from "./views/Auth";
import LoginForm from "./views/Auth/LoginForm";

export const getRoutes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Auth} />
        <Route path="/login/:type" exact component={LoginForm} />
      </Switch>
    </Router>
  );
};
