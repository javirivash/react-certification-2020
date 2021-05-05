import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAppContext } from "../../context/app/appContext";
import PropTypes from "prop-types";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useAppContext();
  return (
    <Route
      {...rest}
      render={(props) =>
        currentUser.isLoggedIn ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.func,
};

export default PrivateRoute;
