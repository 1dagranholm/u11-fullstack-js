import * as React from "react";
import { Redirect, Route } from "react-router-dom";

let isAdmin = false;

if (localStorage.getItem("user")) {
    const adminPermission = {...JSON.parse(localStorage.getItem("user"))};

    if (adminPermission.roles[0] === "ROLE_ADMIN") {
        isAdmin = true;
    }
}

const AdminAuthenticatedRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAdmin ? (
            <Component {...props} />
        ) : (
            <Redirect
                to={{
                    pathname: "restricted",
                    state: { from: props.location }
                    }}
                />
            )
        }
    />
);

export default AdminAuthenticatedRoute;