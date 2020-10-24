import * as React from "react";
import { Redirect, Route } from "react-router-dom";

const isAdmin = () => {
    if (localStorage.getItem("user")) {
        console.log(localStorage.getItem("user"));
        const userPermission = {...JSON.parse(localStorage.getItem("user"))};
        if (userPermission.roles[0] === "ROLE_ADMIN") {
            return true;
        } else {
            return false;
        }
    }
    return false;
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