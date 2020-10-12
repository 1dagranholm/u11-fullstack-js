import * as React from "react";
import { Switch, Route, withRouter} from "react-router-dom";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { useState, useEffect } from "react";
import AuthService from "./services/auth.services";

import Navbar from "./components/core/Navbar";

import Home from "./components/Home";
import CreateUser from "./components/user/CreateUser";
import EditUser from "./components/user/EditUser";
import CreateTodo from "./components/todo/CreateTodo";
import EditTodo from "./components/todo/EditTodo";

import Login from "./components/user/Login";
import Register from "./components/user/Register";
import Profile from "./components/user/Profile";

import UserBoard from "./components/boards/UserBoard";
import AdminBoard from "./components/boards/AdminBoard";
import UserMyTodos from "./components/todo/UserMyTodos";

const App = () => {

    const [showAdminBoard, setShowAdminBoard] = useState(false);
    const [currentUser, setCurrentUser] = useState("");

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setCurrentUser(user);
            setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
        }
    }, []);

    return (
        <React.Fragment>
            <Navbar />
            <div>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />

                    <Route exact path="/profile" component={Profile} />
                    <Route exact path="/my-todos" component={UserMyTodos} />

                    <Route path="/user" component={UserBoard} />
                    <Route path="/admin" component={AdminBoard} />

                    <Route path={"/create-user"} exact component={CreateUser} />
                    <Route path={"/edit-user/:id"} exact component={EditUser} />
                    <Route path={"/create-todo"} exact component={CreateTodo} />
                    <Route path={"/edit-todo/:id"} exact component={EditTodo} />
                </Switch>
            </div>
        </React.Fragment>
    );
}
export default withRouter(App);