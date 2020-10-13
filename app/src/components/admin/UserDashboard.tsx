import * as React from "react";
import { withRouter } from "react-router-dom";
import UserList from "./lists/UserList";
import AdminList from "./lists/AdminList";

const UserDashboard = () => {

    return (
        <React.Fragment>
            <UserList />
            <AdminList />
        </React.Fragment>
    );
}

export default withRouter(UserDashboard);