import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import StoreContext from "./store/Context";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { token } = useContext(StoreContext);

  return (
    <Route
      {...rest}
      render={() =>
        token["access_token"] ? <Component {...rest} /> : <Redirect to="/" />
      }
    />
  );
};
export default PrivateRoute;
