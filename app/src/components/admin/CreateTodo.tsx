import * as React from "react";
import axios from "axios";
import { RouteComponentProps, withRouter, Link } from "react-router-dom";

import authHeader from "../../services/auth-header";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCheckSquare } from '@fortawesome/free-solid-svg-icons';

export interface IState {
    users: any[];
}
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
}
class CreateTodo extends React.Component<RouteComponentProps<any>, IFormState> {
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
            users: [],
            fields: {},
            errors: {}
        };
    }

    public async componentDidMount() {
        const users = await axios.get(`${process.env.REACT_APP_NODE_URL}/users`, { headers: authHeader() }).then((response) => {
            return response.data.data;
        });

        this.setState({users});
    }

    private processFormSubmission = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        if (this.state.title === "") {
            return;
        }

        if (this.state.ownerId === "") {
            return;
        }

        const formData = {
            title: this.state.title,
            description: this.state.description,
            ownerId: this.state.ownerId,
            completedAt: this.state.completedAt,
            deletedAt: this.state.deletedAt,
            createdAt: this.state.createdAt,
            updatedAt: this.state.updatedAt,
        };
        this.setState({ submitSuccess: true, values: [...this.state.values, formData]});
        axios.post(`${process.env.REACT_APP_NODE_URL}/todos/`, formData, { headers: authHeader() }).then((data) => [
            setTimeout(() => {
                this.props.history.push("/admin");
            }, 1500),
        ]);
    };

    private handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value,
        });
    };

    private handleOptionChanges = (e: React.FormEvent<HTMLSelectElement>) => {
        e.preventDefault();
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value,
        });
        this.setState({ ownerId: e.currentTarget.value });
    };

    public render() {
        const { submitSuccess, users } = this.state;

        return (
            <React.Fragment>
                <div className="jumbotron jumbotron-fluid">
                    <div className="container">
                        <h1 className="display-4">Create Todo</h1>
                        {submitSuccess && (
                            <div className="alert alert-info" role="alert">
                                The new todo was successfully submitted!
                            </div>
                        )}
                        <form id={"create-post-form"} onSubmit={this.processFormSubmission} noValidate={true}>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="title"> Title <span className="small text-success">(required)</span></label>
                                    <input
                                        type="text"
                                        id="title"
                                        onChange={(e) => this.handleInputChanges(e)}
                                        name="title"
                                        className="form-control"
                                        placeholder="Enter title"
                                        pattern="^.{1,30}$"
                                        required
                                    />
                                    <small className="form-text text-muted">Maximum 30 characters.</small>
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="role">Owner <span className="small text-success">(required)</span></label>
                                    
                                    {users && (
                                        <React.Fragment>
                                            <select
                                                className="custom-select"
                                                name="ownerId"
                                                id="ownerId"
                                                value={this.state.ownerId}
                                                onChange={(e) => this.handleOptionChanges(e)}
                                                required
                                                >
                                                <option value="">Select user</option>
                                                { users.map((user: any) => (
                                                    !user.deletedAt && (
                                                        <option key={user._id} value={user._id}>{user.firstName} {user.lastName}</option>
                                                    )
                                                ))}
                                            </select>
                                            <small className="form-text text-muted">This list contains only active users.</small>
                                        </React.Fragment>
                                    )}
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="description"> Description </label>
                                <input
                                    type="text"
                                    id="description"
                                    onChange={(e) => this.handleInputChanges(e)}
                                    name="description"
                                    className="form-control"
                                    placeholder="Set description"
                                    pattern="^.{1,50}$"
                                />
                                <small className="form-text text-muted">Maximum 50 characters.</small>
                            </div>
                            <div className="mt-4">
                                <button className="btn btn-success mr-2" type="submit">
                                    <FontAwesomeIcon icon={faCheckSquare}/> Create Todo
                                </button>
                                <Link 
                                    to="/admin"
                                    className="btn btn-primary"
                                >
                                    <FontAwesomeIcon icon={faArrowLeft}/> Cancel and get back
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default withRouter(CreateTodo);
