import * as React from "react";
import axios from "axios";
import { RouteComponentProps, withRouter, Link } from "react-router-dom";
import { formatTimestamp } from "../../helper";
import AuthService from "../../services/auth.services";

export interface IValues {
    title: string;
    description: string;
    ownerId: string;
    completedAt: Date;
    deletedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}
export interface IFormState {
    [key: string]: any;
    values: IValues[];
    submitSuccess: boolean;
    loading: boolean;
}

class UserMyTodos extends React.Component<RouteComponentProps, IFormState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            title: "",
            description: "",
            ownerId: "",
            completedAt: undefined,
            deletedAt: undefined,
            createdAt: undefined,
            updatedAt: undefined,
            values: [],
            loading: false,
            submitSuccess: false,
            todos:[], 
        };
    }

    public componentDidMount(): void {
        const user = AuthService.getCurrentUser();

        axios.get(`http://localhost:8080/api/users/todos/${user.id}`).then((response) => {
            this.setState({ todos: response.data });
        });
    }

    private processFormSubmission = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        this.setState({ loading: true });
        
        const currentUser = AuthService.getCurrentUser();

        const formData = {
            title: this.state.title,
            description: this.state.description,
            ownerId: currentUser.id,
            completedAt: this.state.completedAt,
            deletedAt: this.state.deletedAt,
            createdAt: this.state.createdAt,
            updatedAt: this.state.updatedAt,
        };
        this.setState({ submitSuccess: true, values: [...this.state.values, formData], loading: false });
        axios.post(`http://localhost:8080/api/todos/`, formData).then((response) => {
            let newTodo = response.data.data;
            
            this.setState({ title: ""}); 
            this.setState({ todos: [newTodo, ...this.state.todos]});
            
        });
    };

    private handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value,
        });
    };

    public deleteTodo(id: number) {
        axios.delete(`http://localhost:8080/api/todos/${id}`).then((response) => {
            const todoIndex = this.state.todos.findIndex((todo: { _id: number; }) => todo._id === id);
            let todos = [...this.state.todos];
            let todo = { ...todos[todoIndex] };
            todo.deletedAt = response.data.data.deletedAt;
            todos[todoIndex] = todo;
            this.setState({ todos });
        });
    }

    public completeTodo(id: number) {
        axios.patch(`http://localhost:8080/api/complete/todos/${id}`).then((response) => {
            const todoIndex = this.state.todos.findIndex((todo: { _id: number; }) => todo._id === id);
            let todos = [...this.state.todos];
            let todo = { ...todos[todoIndex] };
            todo.completedAt = response.data.data.completedAt;
            todos[todoIndex] = todo;
            this.setState({ todos });
        });
    }

    public activateTodo(id: number) {
        axios.patch(`http://localhost:8080/api/activate/todos/${id}`, { activate: "true" }).then(() => {
            const todoIndex = this.state.todos.findIndex((todo: { _id: number; }) => todo._id === id);
            let todos = [...this.state.todos];
            let todo = { ...todos[todoIndex] };
            todo.completedAt = "";
            todos[todoIndex] = todo;
            this.setState({ todos });
        });
    }

    public render() {
        const { submitSuccess, loading } = this.state;
        const todos = this.state.todos;

        return (
            <div>
                <div className={"col-md-12 form-wrapper"}>
                    <h2> My todos </h2>
                    {!submitSuccess && (
                        <div className="alert alert-info" role="alert">
                            Fill the form below to create a new todo
                        </div>
                    )}
                    {submitSuccess && (
                        <div className="alert alert-info" role="alert">
                            The new todo was successfully submitted!
                        </div>
                    )}
                    <form id={"create-post-form"} onSubmit={this.processFormSubmission} noValidate={true}>
                        <div className="form-group col-md-12">
                            <label htmlFor="title"></label>
                            <input
                                type="text"
                                id="title"
                                onChange={(e) => this.handleInputChanges(e)}
                                name="title"
                                className="form-control"
                                placeholder="Enter your new todo"
                                value={this.state.title}
                            />

                            <label htmlFor="ownerId"></label>
                            <input
                                type="text"
                                id="ownerId"
                                name="ownerId"
                                className="form-control"
                                defaultValue={this.state.ownerId}
                                hidden
                            />
                        </div>
                        <div className="form-group col-md-4 pull-right">
                            <button className="btn btn-success" type="submit">
                                Create
                            </button>
                            {loading && <span className="fa fa-circle-o-notch fa-spin" />}
                        </div>
                    </form>
                </div>
                
                <div>
                {todos &&
                    todos.map((todo: { _id: number; deletedAt: any; completedAt: any;  title: React.ReactNode; description: React.ReactNode; createdAt: any; }) => (
                        !todo.deletedAt && !todo.completedAt && (<div key={todo._id}>
                            <ul>
                                <li>Title: {todo.title}</li>
                                <li>Desc: {todo.description}</li>
                                <li>Created: {formatTimestamp(todo.createdAt)}</li>
                                <li>Completed: {formatTimestamp(todo.completedAt)}</li>
                                <li>Deleted: {formatTimestamp(todo.deletedAt)}</li>
                            </ul>
                            <div className="btn-group" style={{ marginBottom: "20px" }}>
                                <Link
                                    to={`/edit-todo/${todo._id}`}
                                    className="btn btn-sm btn-outline-secondary"
                                >
                                    Edit Todo{" "}
                                </Link>
                                <button
                                    className="btn btn-sm btn-outline-secondary"
                                    onClick={() => this.completeTodo(todo._id)}
                                >
                                    Complete Todo
                                </button>
                                <button
                                    className="btn btn-sm btn-outline-secondary"
                                    onClick={() => this.deleteTodo(todo._id)}
                                >
                                    Delete Todo
                                </button>
                            </div>
                        </div> 
                    )))
                }

                <h3>Completed todos</h3>
                {todos &&
                    todos.map((todo: { _id: number; deletedAt: any; completedAt: any;  title: React.ReactNode; description: React.ReactNode; createdAt: any; }) => (
                        
                        !todo.deletedAt && todo.completedAt && (<div key={todo._id}>
                            <ul>
                                <li>Title: {todo.title}</li>
                                <li>Desc: {todo.description}</li>
                                <li>Created: {formatTimestamp(todo.createdAt)}</li>
                                <li>Completed: {formatTimestamp(todo.completedAt)}</li>
                                <li>Deleted: {formatTimestamp(todo.deletedAt)}</li>
                            </ul>
                            <div className="btn-group" style={{ marginBottom: "20px" }}>
                                <Link
                                    to={`/edit-todo/${todo._id}`}
                                    className="btn btn-sm btn-outline-secondary"
                                >
                                    Edit Todo{" "}
                                </Link>
                                <button
                                    className="btn btn-sm btn-outline-secondary"
                                    onClick={() => this.activateTodo(todo._id)}
                                >
                                    Activate completed todo
                                </button>
                                <button
                                    className="btn btn-sm btn-outline-secondary"
                                    onClick={() => this.deleteTodo(todo._id)}
                                >
                                    Delete Todo
                                </button>
                            </div>
                        </div> 
                    )))
                }
                </div>
            </div>
        );
    }
}

export default withRouter(UserMyTodos);
