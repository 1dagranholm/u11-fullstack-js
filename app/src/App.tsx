import * as React from "react";
import { Switch, Route, withRouter, Link } from "react-router-dom";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { useState, useEffect } from "react";
import AuthService from "./services/auth.services";

import Home from "./components/Home";
import CreateUser from "./components/user/CreateUser";
import EditUser from "./components/user/EditUser";
import CreateTodo from "./components/todo/CreateTodo";
import EditTodo from "./components/todo/EditTodo";

import Login from "./components/user/Login";
import Register from "./components/user/Register";
import Profile from "./components/user/Profile";

import UserBoard from "./components/boards/userBoard";
import SuperAdminBoard from "./components/boards/superAdminBoard";
import AdminBoard from "./components/boards/adminBoard";

const App = () => {

    const [showSuperAdminBoard, setShowSuperAdminBoard] = useState(false);
    const [showAdminBoard, setShowAdminBoard] = useState(false);
    const [currentUser, setCurrentUser] = useState("");

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setCurrentUser(user);
            setShowSuperAdminBoard(user.roles.includes("ROLE_SUPERADMIN"));
            setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
        }
    
    }, []);

  const logOut = () => {
    AuthService.logout();
  };

    return (
        <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
            <Link to={"/"} className="navbar-brand">
            TodoApp
            </Link>
            <div className="navbar-nav mr-auto">

            {showSuperAdminBoard && (
                <li className="nav-item">
                <Link to={"/superadmin"} className="nav-link">
                    Super Admin pages
                </Link>
                </li>
            )}

            {showAdminBoard && (
                <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                    Admin pages
                </Link>
                </li>
            )}

            {currentUser && (
                <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                    My todos
                </Link>
                </li>
            )}
            </div>

            {currentUser ? (
            <div className="navbar-nav ml-auto">
                <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                    My profile
                </Link>
                </li>
                <li className="nav-item">
                <a href="/login" className="nav-link" onClick={logOut}>
                    Log out
                </a>
                </li>
            </div>
            ) : (
            <div className="navbar-nav ml-auto">
                <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                    Login
                </Link>
                </li>

                <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                    Sign Up
                </Link>
                </li>
            </div>
            )}
        </nav>

        <nav className="navbar navbar-expand navbar-light bg-secondary">
            <div className="navbar-nav mr-auto">
                {showAdminBoard && (
                    <li className="nav-item">
                    <Link to={"/admin/users"} className="nav-link">
                        Manage users
                    </Link>
                    </li>
                )}

                {showAdminBoard && (
                    <li className="nav-item">
                    <Link to={"/admin/todos"} className="nav-link">
                        Manage todos
                    </Link>
                    </li>
                )}
            </div>

            <div className="navbar-nav ml-auto">
                {showAdminBoard && (
                    <li className="nav-item">
                    <Link to={"/create-user"} className="nav-link">
                       Admin: Create users
                    </Link>
                    </li>
                )}

                {showAdminBoard && (
                    <li className="nav-item">
                    <Link to={"/create-todo"} className="nav-link">
                        Admin: Create todos
                    </Link>
                    </li>
                )}
            </div>
        </nav>

            <div className="container mt-3">
                <Switch>
                    <Route exact path={["/", "/home"]} component={Home} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/profile" component={Profile} />

                    <Route path="/user" component={UserBoard} />
                    <Route path="/superadmin" component={SuperAdminBoard} />
                    <Route path="/admin" component={AdminBoard} />

                    <Route path={"/create-user"} exact component={CreateUser} />
                    <Route path={"/edit-user/:id"} exact component={EditUser} />
                    <Route path={"/create-todo"} exact component={CreateTodo} />
                    <Route path={"/edit-todo/:id"} exact component={EditTodo} />
                </Switch>
            </div>
        </div>
    );

}
export default withRouter(App);
