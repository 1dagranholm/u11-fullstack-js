import * as React from "react";
import { RouteComponentProps, withRouter, Link } from "react-router-dom";
import axios from "axios";
import { formatTimestamp } from "../../helper";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faUndo } from '@fortawesome/free-solid-svg-icons';

import Tooltip from '@material-ui/core/Tooltip';

export interface IState {
    todos: any[];
    userId: string;
    userTodos: any[];
    user: any;
    loaded: boolean;
}

class ViewTodos extends React.Component<RouteComponentProps<any>, IState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            todos: [],
            userId: this.props.match.params.id,
            userTodos: [],
            user: [],
            loaded: false,
        };
    }

    public async componentDidMount() {
    await Promise.all([
        axios.get(`http://localhost:8080/api/users/todos/${this.state.userId}`),
        axios.get(`http://localhost:8080/api/users/${this.state.userId}`)
      ]).then(([userTodoData, userData]) => {
              this.setState({ userTodos: userTodoData.data, user: userData.data.data, loaded: true,});
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

    content() {

        const { userTodos, user } = this.state;

        return (
            <React.Fragment>
                <div>
                    <div className="jumbotron jumbotron-fluid">
                        <div className="container">
                        <span className="text-success">View user's Todo's</span>
                        <h1 className="display-4">{user.firstName} {user.lastName}</h1>
                            <Link to={"/admin"} className="btn btn-primary mt-4 mr-2">
                                Go back to admin-dashboard
                            </Link>
                        </div>
                    </div>
                </div>
                <div>
                    {userTodos.length === 0 && (
                        <div className="text-center">
                            <h2>No todo found at the moment</h2>
                        </div>
                    )}
                    <div className="container">
                        <div className="row">
                        <table className="table styled-list">
                                <thead>
                                    <tr>
                                        <th scope="col">Title</th>
                                        <th className="hidden-xs" scope="col">Description</th>
                                        <th scope="col">Created</th>
                                        <th className="hidden-xs" scope="col">Completed</th>
                                        <th scope="col">Deleted</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userTodos &&
                                        userTodos.map((todo: any) => (
                                            <tr key={todo._id}>
                                                <td className="overflow-hidden"><strong>{todo.title}</strong></td>
                                                <td className="overflow-hidden hidden-xs">{todo.description}</td>
                                                <td>{ formatTimestamp(todo.createdAt, 'yy/MM/dd HH:mm')}</td>
                                                <td className="hidden-xs">{ formatTimestamp(todo.completedAt, 'yy/MM/dd HH:mm')}</td>
                                                <td>{ formatTimestamp(todo.deletedAt, 'yy/MM/dd HH:mm')}</td>
                                                <td>
                                                    <div className="d-flex justify-content-center">
                                                        <div className="btn-group" style={{ marginBottom: "20px" }}>
                                                        <Tooltip title="Copy Todo-ID to clipboard">
                                                            <button 
                                                                className="btn btn-sm btn-primary icon-button"
                                                                onClick={() => {navigator.clipboard.writeText(todo._id)}}>
                                                                    <strong>ID</strong>
                                                            </button> 
                                                        </Tooltip>
                                                        { !todo.deletedAt && (
                                                        <Tooltip title="Delete this todo">  
                                                            <button
                                                                className="btn btn-sm btn-danger icon-button"
                                                                onClick={() => this.deleteTodo(todo._id)}
                                                            >
                                                                <FontAwesomeIcon icon={faTrashAlt} />
                                                            </button>
                                                        </Tooltip>
                                                        )}
                                                        { todo.deletedAt && (
                                                        <Tooltip title="Restore this todo">
                                                            <button
                                                                className="btn btn-sm btn-success icon-button"
                                                                onClick={() => this.restoreTodo(todo._id)}
                                                            >
                                                                <FontAwesomeIcon icon={faUndo} />
                                                            </button>
                                                        </Tooltip>
                                                        )}
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
            </React.Fragment>
            );
        }

    public render() {
        
    return (
        <div>
            {this.state.loaded ? this.content() : null}
        </div>
        );
    }
}

export default withRouter(ViewTodos);