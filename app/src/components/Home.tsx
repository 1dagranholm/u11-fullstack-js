import * as React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import axios from "axios";

interface IState {
    users: any[];
}

export default class Home extends React.Component<RouteComponentProps, IState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = { users: [] };
    }
    public componentDidMount(): void {
        axios.get(`http://localhost:8080/api/users`).then((response) => {
            this.setState({ users: response.data.data });
        });
    }
    public deleteUser(id: number) {
        axios.delete(`http://localhost:8080/api/users/${id}`).then((data) => {
            const index = this.state.users.findIndex((user) => user._id === id);
            this.state.users.splice(index, 1);
            this.props.history.push("/");
        });
    }

    public render() {
        const users = this.state.users;
        return (
            <div>
                {users.length === 0 && (
                    <div className="text-center">
                        <h2>No customer found at the moment</h2>
                    </div>
                )}
                <div className="container">
                    <div className="row">
                        <table className="table table-bordered">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">Username</th>
                                    <th scope="col">Password</th>
                                    <th scope="col">Role</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Firstname</th>
                                    <th scope="col">Lastname</th>
                                    <th scope="col">Created at</th>
                                    <th scope="col">Updated at</th>
                                    <th scope="col">Deleted at</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users &&
                                    users.map((user) => (
                                        <tr key={user._id}>
                                            <td>{user.userName}</td>
                                            <td>{user.password}</td>
                                            <td>{user.role}</td>
                                            <td>{user.email}</td>
                                            <td>{user.firstName}</td>
                                            <td>{user.lastName}</td>
                                            <td>{user.createdAt}</td>
                                            <td>{user.updatedAt}</td>
                                            <td>{user.deletedAt}</td>
                                            <td>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div className="btn-group" style={{ marginBottom: "20px" }}>
                                                        <Link
                                                            to={`edit/${user._id}`}
                                                            className="btn btn-sm btn-outline-secondary"
                                                        >
                                                            Edit User{" "}
                                                        </Link>
                                                        <button
                                                            className="btn btn-sm btn-outline-secondary"
                                                            onClick={() => this.deleteUser(user._id)}
                                                        >
                                                            Delete User
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
