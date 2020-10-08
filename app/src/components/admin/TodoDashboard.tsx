import * as React from "react";
import { RouteComponentProps, withRouter, Link } from "react-router-dom";
import axios from "axios";
import { formatTimestamp } from "../../helper";

export interface IState {
    todos: any[];
}

class TodoDashboard extends React.Component<RouteComponentProps, IState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            todos: []
        };
    }

    public componentDidMount(): void {
        axios.get(`http://localhost:8080/api/todos`).then((response) => {
            this.setState({ todos: response.data.data });
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

    public restoreTodo(id: number) {
        axios.patch(`http://localhost:8080/api/restore/todos/${id}`, { restore: "true" }).then(() => {
            const todoIndex = this.state.todos.findIndex((todo) => todo._id === id);
            let todos = [...this.state.todos];
            let todo = { ...todos[todoIndex] };
            todo.deletedAt = "";
            todos[todoIndex] = todo;
            this.setState({ todos });
        });
    }

    public render() {
        const todos = this.state.todos;

    return (
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
                                <th scope="col">Todo ID</th>
                                <th scope="col">Title</th>
                                <th scope="col">Description</th>
                                <th scope="col">OwnerId</th>
                                <th scope="col">Created</th>
                                <th scope="col">Updated</th>
                                <th scope="col">Completed</th>
                                <th scope="col">Deleted</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {todos &&
                                todos.map((todo) => (
                                    <tr key={todo._id}>
                                        <td>{todo._id}</td>
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
                                                        Edit todo{" "}
                                                    </Link>
                                                    <button
                                                        className="btn btn-sm btn-outline-secondary"
                                                        onClick={() => this.deleteTodo(todo._id)}
                                                    >
                                                        Delete todo
                                                    </button>
                                                    <button
                                                        className="btn btn-sm btn-outline-secondary"
                                                        onClick={() => this.restoreTodo(todo._id)}
                                                    >
                                                        Restore deleted todo
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

export default withRouter(TodoDashboard);