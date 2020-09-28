import * as React from "react";
import "./App.css";
import { Switch, Route, withRouter, RouteComponentProps, Link } from "react-router-dom";
import Home from "./components/Home";
import Create from "./components/user/Create";
import EditUser from "./components/user/Edit";

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
                    </ul>
                </nav>
                <Switch>
                    <Route path={"/"} exact component={Home} />
                    <Route path={"/create-user"} exact component={Create} />
                    <Route path={"/edit-user/:id"} exact component={EditUser} />
                </Switch>
            </div>
        );
    }
}
export default withRouter(App);
