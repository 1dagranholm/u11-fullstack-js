import * as React from "react";
import axios from "axios";
import { RouteComponentProps, withRouter } from "react-router-dom";

import ImagePicker from 'react-image-picker'
import 'react-image-picker/dist/index.css'

import { capitalizeFirstLetter } from "../../helper";

export interface IState {
    roles: any[];
}
export interface IValues {
    password: string;
    roles: string;
    email: string;
    firstName: string;
    lastName: string;
    deletedAt: Date;
    createdAt: Date;
    updatedAt: Date;
    avatar: Number;
}
export interface IFormState {
    [key: string]: any;
    values: IValues[];
    submitSuccess: boolean;
}

class CreateUser extends React.Component<RouteComponentProps, IFormState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            password: "",
            role: "",
            email: "",
            firstName: "",
            lastName: "",
            deletedAt: undefined,
            createdAt: undefined,
            updatedAt: undefined,
            values: [],
            submitSuccess: false,
            roles: [],
            avatar: 0,
        };
        this.onPick = this.onPick.bind(this)
    }

    public async componentDidMount() {
        const roles = await axios.get(`http://localhost:8080/api/roles`).then((response) => {
            return response.data.data;
        });

        this.setState({ roles });
    }

    private processFormSubmission = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        this.setState({ loading: true });
        const formData = {
            password: this.state.password,
            roles: this.state.role,
            email: this.state.email,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            deletedAt: this.state.deletedAt,
            createdAt: this.state.createdAt,
            updatedAt: this.state.updatedAt,
            avatar: this.state.avatar,
        };
        this.setState({ submitSuccess: true, values: [...this.state.values, formData] });
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
    };

    onPick(avatar: any) {
        this.setState({ avatar: avatar.value })
    }

    public render() {
        const { submitSuccess, roles } = this.state;
        const avatarList = [1, 2, 3, 4, 5, 6, 7, 8];

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
                                <label htmlFor="email"> E-mail <span className="small text-success">(required)</span></label>
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
                                <label htmlFor="password"> Password <span className="small text-success">(required)</span></label>
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
                                <label htmlFor="firstName"> First Name <span className="small text-success">(required)</span></label>
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
                                <label htmlFor="lastName"> Last Name <span className="small text-success">(required)</span></label>
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
                                <label htmlFor="role">Role <span className="small text-success">(required)</span></label>
                                
                                {roles && (
                                    <React.Fragment>
                                        <select
                                            className="custom-select"
                                            name="role"
                                            id="role"
                                            value={this.state.role}
                                            onChange={(e) => this.handleOptionChanges(e)}
                                            required
                                            >
                                            <option >Set role</option>
                                            { roles.map((role: any) => (
                                                <option className="text-capitalize" key={role._id} value={role._id}>{ capitalizeFirstLetter(role.name) }</option>
                                            ))}
                                        </select>
                                    </React.Fragment>
                                )}
                            </div>
                            <div className="form-group">
                                <label htmlFor="avatar"> Avatar </label>
                                <ImagePicker 
                                images={avatarList.map((image) => ({src: `${process.env.PUBLIC_URL}/avatars/avatar${image}.png`, value: image, alt: image}))}
                                onPick={this.onPick}
                                />
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
