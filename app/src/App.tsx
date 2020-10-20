import * as React from "react";
import { Switch, Route, withRouter} from "react-router-dom";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/core/Navbar";
import Footer from "./components/core/Footer";

import Home from "./components/Home";
import CreateUser from "./components/user/CreateUser";
import EditUser from "./components/user/EditUser";
import CreateTodo from "./components/todo/CreateTodo";
import EditTodo from "./components/todo/EditTodo";

import Login from "./components/user/Login";
import Register from "./components/user/Register";
import Profile from "./components/user/Profile";
import EditMyProfile from "./components/user/EditMyProfile";

import UserBoard from "./components/boards/UserBoard";
import AdminBoard from "./components/boards/AdminBoard";
import UserMyTodos from "./components/todo/UserMyTodos";

const App = () => {

    return (
        <React.Fragment>
            <Navbar />
            <div>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />

                    <Route exact path="/profile" component={Profile} />
                    <Route exact path="/edit-profile" component={EditMyProfile} />
                    <Route exact path="/my-todos" component={UserMyTodos} />

                    <Route path="/user" component={UserBoard} />
                    <Route path="/admin" component={AdminBoard} />

                    <Route path={"/create-user"} exact component={CreateUser} />
                    <Route path={"/edit-user/:id"} exact component={EditUser} />
                    <Route path={"/create-todo"} exact component={CreateTodo} />
                    <Route path={"/edit-todo/:id"} exact component={EditTodo} />
                </Switch>
            </div>
            <Footer/>
        </React.Fragment>
    );
}
export default withRouter(App);