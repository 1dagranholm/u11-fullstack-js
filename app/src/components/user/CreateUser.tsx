import * as React from "react";
import axios from "axios";
import { RouteComponentProps, withRouter } from "react-router-dom";

export interface IValues {
    password: string;
    role: string;
    email: string;
    firstName: string;
    lastName: string;
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

class CreateUser extends React.Component<RouteComponentProps, IFormState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            password: "",
            role: "user",
            email: "",
            firstName: "",
            lastName: "",
            deletedAt: undefined,
            createdAt: undefined,
            updatedAt: undefined,
            values: [],
            loading: false,
            submitSuccess: false,
        };
    }

    private processFormSubmission = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        this.setState({ loading: true });
        const formData = {
            password: this.state.password,
            role: this.state.role,
            email: this.state.email,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            deletedAt: this.state.deletedAt,
            createdAt: this.state.createdAt,
            updatedAt: this.state.updatedAt,
        };
        this.setState({ submitSuccess: true, values: [...this.state.values, formData], loading: false });
        axios.post(`http://localhost:8080/api/users/`, formData).then((data) => [
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
        this.setState({ role: e.currentTarget.value });
    };

    public render() {
        const { submitSuccess } = this.state;

        return (
            <React.Fragment>
                <div className="jumbotron jumbotron-fluid">
                    <div className="container">
                        <h1 className="display-4">Create User</h1>
                        {submitSuccess && (
                            <div className="alert alert-info" role="alert">
                                The new user was successfully submitted!
                            </div>
                        )}
                        <form id={"create-post-form"} onSubmit={this.processFormSubmission} noValidate={true}>
                            <div className="form-group">
                                <label htmlFor="password"> Password </label>
                                <input
                                    type="text"
                                    id="password"
                                    onChange={(e) => this.handleInputChanges(e)}
                                    name="password"
                                    className="form-control"
                                    placeholder="Set a password for the user"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="firstName"> First Name </label>
                                <input
                                    type="text"
                                    id="firstName"
                                    onChange={(e) => this.handleInputChanges(e)}
                                    name="firstName"
                                    className="form-control"
                                    placeholder="Enter user's first name"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName"> Last Name </label>
                                <input
                                    type="text"
                                    id="lastName"
                                    onChange={(e) => this.handleInputChanges(e)}
                                    name="lastName"
                                    className="form-control"
                                    placeholder="Enter user's last name"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email"> E-mail </label>
                                <input
                                    type="email"
                                    id="email"
                                    onChange={(e) => this.handleInputChanges(e)}
                                    name="email"
                                    className="form-control"
                                    placeholder="Enter user's email address"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="role">Role</label>
                                <select
                                    name="role"
                                    id="role"
                                    value={this.state.role}
                                    onChange={(e) => this.handleOptionChanges(e)}
                                >
                                    <option value="user">Standard User</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                            <div className="form-group mt-4">
                                <button className="btn btn-success" type="submit">
                                    Create User
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default withRouter(CreateUser);
