import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

import { useAuthUser } from "../hooks/useAuthUser";
import { TO_HOME_PAGE } from "../utils/constants";

const RedirectedRoute: React.FC<RouteProps> = (props) => {
  const user = useAuthUser();

  return user ? <Redirect to={TO_HOME_PAGE} /> : <Route {...props} />;
};

export default RedirectedRoute;
