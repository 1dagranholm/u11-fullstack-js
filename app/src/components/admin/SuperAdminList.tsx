import * as React from "react";
import { RouteComponentProps, withRouter, Link } from "react-router-dom";
import axios from "axios";
import { formatTimestamp } from "../../helper";

export interface IState {
    users: any[];
}

class SuperAdminList extends React.Component<RouteComponentProps, IState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            users: []
        };
    }

public componentDidMount(): void {
        axios.get(`http://localhost:8080/api/users`).then((response) => {
            this.setState({ users: response.data.data });
        });
    }

    public deleteUser(id: number) {
        axios.delete(`http://localhost:8080/api/users/${id}`).then((response) => {
            const userIndex = this.state.users.findIndex((user) => user._id === id);
            let users = [...this.state.users];
            let user = { ...users[userIndex] };
            user.deletedAt = response.data.data.deletedAt;
            users[userIndex] = user;
            this.setState({ users });
        });
    }

    public restoreUser(id: number) {
        axios.patch(`http://localhost:8080/api/restore/users/${id}`, { restore: "true" }).then(() => {
            const userIndex = this.state.users.findIndex((user) => user._id === id);
            let users = [...this.state.users];
            let user = { ...users[userIndex] };
            user.deletedAt = "";
            users[userIndex] = user;
            this.setState({ users });
        });
    }

    public render() {
        const users = this.state.users;

    return (
    <div>
        <h3>Super Admins</h3>
            {users.length === 0 && (
                <div className="text-center">
                    <h2>No Super Admins found at the moment</h2>
                </div>
            )}
            <div className="container">
                <div className="row">
                    <table className="table table-bordered">
                        <thead className="thead-light">
                            <tr>
                                <th scope="col">Email</th>
                                <th scope="col">Full name</th>
                                <th scope="col">Created</th>
                                <th scope="col">Updated</th>
                                <th scope="col">Deleted</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users &&
                                users.map((user) => (
                                    <tr key={user._id}>
                                        <td>{user.email}</td>
                                        <td>{user.firstName} {user.lastName}</td>
                                        <td>{formatTimestamp(user.createdAt)}</td>
                                        <td>{formatTimestamp(user.updatedAt)}</td>
                                        <td>{formatTimestamp(user.deletedAt)}</td>
                                        <td>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="btn-group" style={{ marginBottom: "20px" }}>
                                                    <Link
                                                        to={`edit-user/${user._id}`}
                                                        className="btn btn-sm btn-outline-secondary"
                                                    >
                                                        Edit user{" "}
                                                    </Link>
                                                    <button
                                                        className="btn btn-sm btn-outline-secondary"
                                                        onClick={() => this.deleteUser(user._id)}
                                                    >
                                                        Delete user
                                                    </button>
                                                    <button
                                                        className="btn btn-sm btn-outline-secondary"
                                                        onClick={() => this.restoreUser(user._id)}
                                                    >
                                                        Restore deleted user
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        );
    }
}

export default withRouter(SuperAdminList);