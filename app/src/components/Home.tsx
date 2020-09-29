import * as React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import axios from "axios";
import { formatTimestamp } from "../helper";

interface IState {
    users: any[];
    todos: any[];
}

export default class Home extends React.Component<RouteComponentProps, IState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            users: [],
            todos: [],
        };
    }
    public componentDidMount(): void {
        axios.get(`http://localhost:8080/api/users`).then((response) => {
            this.setState({ users: response.data.data });
        });
        axios.get(`http://localhost:8080/api/todos`).then((response) => {
            this.setState({ todos: response.data.data });
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

    public deleteTodo(id: number) {
        axios.delete(`http://localhost:8080/api/todos/${id}`).then((response) => {
            const todoIndex = this.state.todos.findIndex((todo) => todo._id === id);
            let todos = [...this.state.todos];
            let todo = { ...todos[todoIndex] };
            todo.deletedAt = response.data.data.deletedAt;
            todos[todoIndex] = todo;
            this.setState({ todos });
        });
    }

    public render() {
        const users = this.state.users;
        const todos = this.state.todos;

        return (
            <div>
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

                <div>
                    {todos.length === 0 && (
                        <div className="text-center">
                            <h2>No todo found at the moment</h2>
                        </div>
                    )}
                    <div className="container">
                        <div className="row">
                            <table className="table table-bordered">
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">Title</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">OwnerId</th>
                                        <th scope="col">Created at</th>
                                        <th scope="col">Updated at</th>
                                        <th scope="col">Completed at</th>
                                        <th scope="col">Deleted at</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {todos &&
                                        todos.map((todo) => (
                                            <tr key={todo._id}>
                                                <td>{todo.title}</td>
                                                <td>{todo.description}</td>
                                                <td>{todo.ownerId}</td>
                                                <td>{formatTimestamp(todo.createdAt)}</td>
                                                <td>{formatTimestamp(todo.updatedAt)}</td>
                                                <td>{formatTimestamp(todo.completedAt)}</td>
                                                <td>{formatTimestamp(todo.deletedAt)}</td>
                                                <td>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div className="btn-group" style={{ marginBottom: "20px" }}>
                                                            <Link
                                                                to={`edit-todo/${todo._id}`}
                                                                className="btn btn-sm btn-outline-secondary"
                                                            >
                                                                Edit Todo{" "}
                                                            </Link>
                                                            <button
                                                                className="btn btn-sm btn-outline-secondary"
                                                                onClick={() => this.deleteTodo(todo._id)}
                                                            >
                                                                Delete Todo
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
