import * as React from "react";
import { Redirect, Route } from "react-router-dom";

let isUser = false;

if (localStorage.getItem("user")) {
    const userPermission = {...JSON.parse(localStorage.getItem("user"))};
    if (userPermission.roles[0] === "ROLE_USER" || userPermission.roles[0] === "ROLE_ADMIN") {
        isUser = true;
    }
}

const AuthenticatedRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isUser ? (
            <Component {...props} />
        ) : (
            <Redirect
                to={{
                    pathname: "login",
                    state: { from: props.location }
                    }}
                />
            )
        }
    />
);

export default AuthenticatedRoute;