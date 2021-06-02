import React from "react";
import { Redirect, Route, RouteProps, useLocation } from "react-router-dom";

import { useAuthUser } from "../hooks/useAuthUser";
import { TO_LOGIN_PAGE } from "../utils/constants";

const ProtectedRoute: React.FC<RouteProps> = (props) => {
  const user = useAuthUser();
  const location = useLocation();

  if (!user)
    return (
      <Redirect
        to={{
          pathname: TO_LOGIN_PAGE,
          state: location.pathname,
        }}
      />
    );
  return <Route {...props} />;
};

export default ProtectedRoute;
