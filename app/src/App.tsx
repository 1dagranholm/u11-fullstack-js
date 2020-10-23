import * as React from "react";
import { Switch, Route, withRouter} from "react-router-dom";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/core/Navbar";
import Footer from "./components/core/Footer";

import Home from "./components/Home";
import Login from "./components/open/Login";
import Register from "./components/open/Register";
import Restricted from "./components/open/Restricted";

import EditMyProfile from "./components/user/EditMyProfile";
import EditTodo from "./components/user/EditTodo";
import Profile from "./components/user/Profile";
import UserMyTodos from "./components/user/UserMyTodos";

import AdminBoard from "./components/admin/AdminBoard";
import CreateTodo from "./components/admin/CreateTodo";
import CreateUser from "./components/admin/CreateUser";
import EditUser from "./components/admin/EditUser";
import ViewTodos from "./components/admin/ViewTodos";
import UserList from "./components/admin/lists/UserList";
import AdminList from "./components/admin/lists/AdminList";

import AuthenticatedRoute from "./components/auth/AuthenticatedRoute";
import AdminAuthenticatedRoute from "./components/auth/AdminAuthenticatedRoute";

import {Helmet} from "react-helmet";

const App = () => {

    return (
        <React.Fragment>
            <Helmet>
                <title>TodoApp</title>
                <meta name="Apping up your life, Todo by Todo." content="A Todo application." />
            </Helmet>
            <Navbar />
                <div>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/restricted" component={Restricted} />

                        <AuthenticatedRoute exact path="/edit-profile" component={EditMyProfile} />
                        <AuthenticatedRoute path={"/edit-todo/:id"} exact component={EditTodo} />
                        <AuthenticatedRoute exact path="/profile" component={Profile} />
                        <AuthenticatedRoute exact path="/my-todos" component={UserMyTodos} />

                        <AdminAuthenticatedRoute path="/admin" component={AdminBoard} />
                        <AdminAuthenticatedRoute path={"/create-todo"} exact component={CreateTodo} />
                        <AdminAuthenticatedRoute path={"/create-user"} exact component={CreateUser} />
                        <AdminAuthenticatedRoute path={"/edit-user/:id"} exact component={EditUser} />
                        <AdminAuthenticatedRoute path={"/view-todos/user/:id"} exact component={ViewTodos} />
                        
                        <AdminAuthenticatedRoute exact component={AdminBoard} />
                        <AdminAuthenticatedRoute exact component={UserList} />
                        <AdminAuthenticatedRoute exact component={AdminList} />
                    </Switch>
                </div>
            <Footer/>
        </React.Fragment>
    );
}
export default withRouter(App);