import * as React from "react";
import { RouteComponentProps, withRouter, Link } from "react-router-dom";
import axios from "axios";
import { formatTimestamp } from "../../helper";

export interface IState {
    roles: any[];
    admin: any[];
    userList: any[];
}

class AdminList extends React.Component<RouteComponentProps, IState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            roles: [],
            admin: [],
            userList: []
        };
    } 

    public async componentDidMount() {
        const roles = await axios.get(`http://localhost:8080/api/roles`).then((response) => {
            return response.data.data;
        });

        this.setState({roles});

        roles.map(async (role: { _id: any; name: any; }) => {
            let response = await axios.get(`http://localhost:8080/api/users/roles/${role._id}`).then((response) => {
                return response.data.data;
            });
            this.setState(({ [role.name]: response } as Pick<IState, keyof IState>));
        });
    }

    public deleteUser(id: number) {
        axios.delete(`http://localhost:8080/api/users/${id}`).then((response) => {
            const userIndex = this.state.admin.findIndex((user) => user._id === id);
            let users = [...this.state.admin];
            let admin = { ...users[userIndex] };
            admin.deletedAt = response.data.data.deletedAt;
            users[userIndex] = admin;
            admin = users;
            this.setState({admin});
        });
    }

    public restoreUser(id: number) {
        axios.patch(`http://localhost:8080/api/restore/users/${id}`, { restore: "true" }).then(() => {
            const userIndex = this.state.admin.findIndex((user) => user._id === id);
            let users = [...this.state.admin];
            let admin = { ...users[userIndex] };
            admin.deletedAt = "";
            users[userIndex] = admin;
            admin = users;
            this.setState({admin});
        });
    }

    public render() {
        const users = this.state.admin;
        // const roles = this.state.roles;

        return (
            <div>
                    <div>
                        <h3>Admins</h3>
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
                                                                    to={`/edit-user/${user._id}`}
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
            </div>
        );
    }
}

export default withRouter(AdminList);