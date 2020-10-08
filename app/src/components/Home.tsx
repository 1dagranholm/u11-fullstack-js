import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import UserDashboard from "./admin/UserDashboard";
import TodoDashboard from "./admin/TodoDashboard";

interface IState {
    // users: any[];
    // todos: any[];
}

export default class Home extends React.Component<RouteComponentProps, IState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            // users: [],
            // todos: [],
        };
    }

    public render() {
        return (
            <div>
                <UserDashboard />
                <TodoDashboard />
            </div>
        );
    }
}
