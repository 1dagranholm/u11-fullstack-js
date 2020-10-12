import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import UserList from "./UserList";
import AdminList from "./AdminList";

export interface IState {
    // users: any[];
}

class UserDashboard extends React.Component<RouteComponentProps, IState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            // users: []
        };
    }

    public render() {
        // const users = this.state.users;

    return (
        <div>
            <UserList />
            <AdminList />
        </div>
        );
    }
}

export default withRouter(UserDashboard);