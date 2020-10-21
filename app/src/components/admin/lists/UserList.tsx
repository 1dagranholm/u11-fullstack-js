import * as React from "react";
import { RouteComponentProps, withRouter, Link } from "react-router-dom";
import axios from "axios";

import { formatTimestamp } from "../../../helper";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPenAlt, faUndo, faListAlt } from '@fortawesome/free-solid-svg-icons';

export interface IState {
    roles: any[];
    user: any[];
    userList: any[];
}

class UserList extends React.Component<RouteComponentProps, IState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            roles: [],
            user: [],
            userList: [],
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
            const userIndex = this.state.user.findIndex((user) => user._id === id);
            let users = [...this.state.user];
            let user = { ...users[userIndex] };
            user.deletedAt = response.data.data.deletedAt;
            users[userIndex] = user;
            user = users;
            this.setState({user});
        });
    }

    public restoreUser(id: number) {
        axios.patch(`http://localhost:8080/api/restore/users/${id}`, { restore: "true" }).then(() => {
            const userIndex = this.state.user.findIndex((user) => user._id === id);
            let users = [...this.state.user];
            let user = { ...users[userIndex] };
            user.deletedAt = "";
            users[userIndex] = user;
            user = users;
            this.setState({user});
        });
    }

    public render() {
        const users = this.state.user;
        
        return (
            <React.Fragment>
                <h3>Users</h3>
                <table className="table styled-list mb-5">
                    <thead>
                        <tr>
                            <th className="hidden-xs"></th>
                            <th><span>User</span></th>
                            <th className="hidden-xs"><span>Created</span></th>
                            <th><span>Status</span></th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {users &&
                        users.map((user) => (
                        <tr key={user._id}>
                            <td className="hidden-xs">
                                { !user.avatar ? (
                                    <img src={`${process.env.PUBLIC_URL}/avatars/avatar0.png`} width="50px" alt="{user.firstName + ' ' + user.lastName}" />
                                ) : (
                                    <img src={`${process.env.PUBLIC_URL}/avatars/avatar${ user.avatar }.png`} width="50px" alt="{user.firstName + ' ' + user.lastName}" />
                                )}
                            </td>
                            <td>
                                <strong>{user.firstName + ' ' + user.lastName}</strong><br/>
                                <a href={`mailto:${user.email}`}>{user.email}</a>
                            </td>
                            <td className="hidden-xs">{ formatTimestamp(user.createdAt, 'yy/MM/dd')}</td>
                            <td>
                            { !user.deletedAt && (
                                <span className="badge badge-success">Active</span>
                            )}
                            { user.deletedAt && (
                                <span className="badge badge-warning">
                                    Deleted { formatTimestamp(user.deletedAt, 'yy/MM/dd')}
                                </span>
                            )}
                            </td>
                            <td>
                                <div className="btn-group d-flex flex-row justify-content-around align-items-center">
                                    <button 
                                        className="btn btn-sm btn-secondary icon-button"
                                        onClick={() => {navigator.clipboard.writeText(user._id)}}>
                                            <strong>ID</strong>
                                    </button> 
                                    <Link 
                                        to={`/view-todos/user/${user._id}`}
                                        className="btn btn-sm btn-info icon-button"
                                    >
                                        <FontAwesomeIcon icon={faListAlt}/>
                                    </Link>
                                    <Link 
                                        to={`/edit-user/${user._id}`}
                                        className="btn btn-sm btn-primary icon-button"
                                    >
                                        <FontAwesomeIcon icon={faPenAlt}/>
                                    </Link>
                                { !user.deletedAt && (
                                    <button
                                        type="button" 
                                        className="btn btn-sm btn-danger icon-button"
                                        onClick={() => this.deleteUser(user._id)}
                                    >
                                        <FontAwesomeIcon icon={faTrashAlt} />
                                    </button>
                                )}
                                { user.deletedAt && (
                                    <button
                                        className="btn btn-sm btn-success icon-button"
                                        onClick={() => this.restoreUser(user._id)}
                                    >
                                        <FontAwesomeIcon icon={faUndo} />
                                    </button>
                                )}
                                </div>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </React.Fragment>
        );
    }
}

export default withRouter(UserList);