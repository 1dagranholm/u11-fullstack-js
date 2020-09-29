import * as React from "react";
import "./App.css";
import { Switch, Route, withRouter, RouteComponentProps, Link } from "react-router-dom";
import Home from "./components/Home";
import CreateUser from "./components/user/CreateUser";
import EditUser from "./components/user/EditUser";
import CreateTodo from "./components/todo/CreateTodo";
import EditTodo from "./components/todo/EditTodo";

class App extends React.Component<RouteComponentProps<any>> {
    public render() {
        return (
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to={"/"}> Home </Link>
                        </li>
                        <li>
                            <Link to={"/create-user"}> Create user </Link>
                        </li>
                        <li>
                            <Link to={"/create-todo"}> Create todo </Link>
                        </li>
                    </ul>
                </nav>
                <Switch>
                    <Route path={"/"} exact component={Home} />
                    <Route path={"/create-user"} exact component={CreateUser} />
                    <Route path={"/edit-user/:id"} exact component={EditUser} />
                    <Route path={"/create-todo"} exact component={CreateTodo} />
                    <Route path={"/edit-todo/:id"} exact component={EditTodo} />
                </Switch>
            </div>
        );
    }
}
export default withRouter(App);
