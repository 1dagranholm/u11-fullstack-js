import * as React from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPenAlt, faUndoAlt, faCheck, faSpinner, faSearch } from '@fortawesome/free-solid-svg-icons';
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
    term: string;
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
            term: "",
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
            term: this.state.term
        };
        this.setState({ submitSuccess: true, values: [...this.state.values, formData], loading: false });
        axios.post(`http://localhost:8080/api/todos/`, formData).then((response) => {
            let newTodo = response.data.data;
            
            this.setState({ title: ""}); 
            this.setState({ todos: [newTodo, ...this.state.todos]});
            
            setTimeout(() => {
                this.setState({ submitSuccess: false}); 
            }, 3000);
        });
    };

    private processSearchSubmission = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        this.setState({ loading: true });
        
        const currentUser = AuthService.getCurrentUser();
        const searchTerm = {
            term: this.state.term,
        };

        axios.post(`http://localhost:8080/api/search/todos/${currentUser.id}`, searchTerm).then((response) => {
            let todos = response.data;
            
            this.setState({ todos });
            
            setTimeout(() => {
                this.setState({ submitSuccess: false}); 
            }, 3000);
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
        const { submitSuccess, todos } = this.state;

        return (
        <React.Fragment>
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h1 className="display-4">My todos</h1>
                    <form onSubmit={this.processFormSubmission} noValidate={true}>
                        <div className="form-group">
                            <div className="input-group input-group-lg mb-3">
                                <input 
                                    type="text" 
                                    id="title"
                                    name="title"
                                    value={this.state.title}
                                    onChange={(e) => this.handleInputChanges(e) }
                                    className="form-control" 
                                    placeholder="Enter your new todo here"
                                    aria-label="Todo title" 
                                />
                                <div className="input-group-append">
                                    <button className="btn btn-success" type="submit">Add</button>
                                </div>
                            </div>
                            {submitSuccess && (
                                <div className="alert alert-success fade show h6" role="alert">
                                    <FontAwesomeIcon className="text-success" icon={faCheck} /> <strong>Congrats!</strong> Your new todo was successfully submitted.
                                </div>
                            )}
                            <input
                                type="text"
                                id="ownerId"
                                name="ownerId"
                                className="form-control"
                                defaultValue={this.state.ownerId}
                                hidden
                                />
                        </div>
                    </form>
                </div>
            </div>
            <div className="container">
                <section className="row">
                    <div className="col-12 form-wrapper">
                        <form onSubmit={this.processSearchSubmission} noValidate={true}>
                            <div className="form-group">
                                <div className="input-group mb-3">
                                    <input 
                                        type="text" 
                                        id="term"
                                        name="term"
                                        value={this.state.term}
                                        onChange={(e) => this.handleInputChanges(e)}
                                        className="form-control" 
                                        placeholder="Search in your todos..."
                                        aria-label="Search box"
                                    />
                                    <div className="input-group-append">
                                        <button className="btn btn-secondary" type="submit"><FontAwesomeIcon className="mr-1" icon={faSearch} />Search</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-12">
                        { todos && (
                            <React.Fragment>
                                <ul className="list-group mb-4"> 
                                    { todos.map((todo: { _id: number; deletedAt: any; completedAt: any;  title: React.ReactNode; description: React.ReactNode; createdAt: any; }) => (
                                        !todo.deletedAt && !todo.completedAt && (
                                            <React.Fragment key={todo._id}>
                                                <li className="list-group-item d-flex flex-row justify-content-between align-items-center">
                                                    <span className="d-flex">
                                                        <button type="button" className="btn btn-sm btn-outline-success mr-3" onClick={() => this.completeTodo(todo._id)}><FontAwesomeIcon className="text-white" icon={faCheck} /></button>
                                                            <div className="d-flex flex-column">
                                                                <span>{todo.title}</span>
                                                                <span className="small text-secondary">{todo.description}</span>
                                                            </div>
                                                    </span>
                                                    <span>
                                                        <Link to={`/edit-todo/${todo._id}`} className="btn btn-sm btn-outline-dark mr-2">
                                                            <FontAwesomeIcon icon={faPenAlt} className="mr-1"/>Edit
                                                        </Link>
                                                        <button type="button" className="btn btn-sm btn-outline-dark" onClick={() => this.deleteTodo(todo._id)}><FontAwesomeIcon icon={faTrashAlt} /></button>
                                                    </span>
                                                </li>
                                            </React.Fragment>
                                        )
                                    ))}
                                </ul>
                            
                                <ul className="list-group"> 
                                { todos.map((todo: { _id: number; deletedAt: any; completedAt: any;  title: React.ReactNode; description: React.ReactNode; createdAt: any; }) => (
                                    !todo.deletedAt && todo.completedAt && (
                                        <React.Fragment key={todo._id}>
                                            <li className="list-group-item list-group-item-success d-flex justify-content-between align-items-center">
                                                <span className="d-flex">
                                                    <button type="button" className="btn btn-sm btn-primary mr-3" onClick={() => this.activateTodo(todo._id)}><FontAwesomeIcon className="text-light" icon={faUndoAlt} /></button>
                                                        <div className="d-flex flex-column">
                                                            <span>
                                                                {todo.title} <span className="badge badge-pill badge-success ml-2 mb-2">Done: {formatTimestamp(todo.completedAt)}</span>
                                                            </span>
                                                            <span className="small text-secondary">{todo.description}</span>
                                                        </div>
                                                </span>
                                                <span>
                                                    <button type="button" className="btn btn-sm btn-outline-dark" onClick={() => this.deleteTodo(todo._id)}><FontAwesomeIcon icon={faTrashAlt} /></button>
                                                </span>
                                            </li>
                                        </React.Fragment>
                                    )
                                ))}
                                </ul>
                            </React.Fragment>
                        )}
                    </div>
                </section>
            </div>
        </React.Fragment>
        )
    }
}

export default withRouter(UserMyTodos);
