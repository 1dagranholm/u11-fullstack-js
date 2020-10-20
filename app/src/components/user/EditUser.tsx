import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import axios from "axios";

import ImagePicker from 'react-image-picker'
import 'react-image-picker/dist/index.css'

import { capitalizeFirstLetter } from "../../helper";

export interface IValues {
    [key: string]: any;
}
export interface IFormState {
    id: string;
    user: any;
    values: IValues[];
    submitSuccess: boolean;
    loading: boolean;
    role: string;
    roles: any[];
    avatar: string;
}

class EditUser extends React.Component<RouteComponentProps<any>, IFormState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            user: {},
            values: [],
            loading: false,
            submitSuccess: false,
            role: "",
            roles: [],
            avatar:  ""
        };
        this.onPick = this.onPick.bind(this)
    }

    public async componentDidMount() {
        const roles = await axios.get(`http://localhost:8080/api/roles`).then((response) => {
            return response.data.data;
        });

        const user = await axios.get(`http://localhost:8080/api/users/${this.state.id}`).then((response) => {
            return response.data.data;
        });

        this.setState({ roles, user, avatar: user.avatar, role: user.role });
    }

    private processFormSubmission = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        this.setState({ loading: true });
        axios.patch(`http://localhost:8080/api/users/${this.state.id}`, this.state.values).then((data) => {
            this.setState({ submitSuccess: true });
            setTimeout(() => {
                this.props.history.push("/admin");
            }, 1500);
        });
    };

    private setValues = (values: IValues) => {
        this.setState({ values: { ...this.state.values, ...values } });
    };

    private handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        this.setValues({ [e.currentTarget.id]: e.currentTarget.value });
    };

    private handleOptionChanges = (e: React.FormEvent<HTMLSelectElement>) => {
        e.preventDefault();
        this.setValues({ [e.currentTarget.id]: e.currentTarget.value });
        this.setState({ role: e.currentTarget.value });
    };

    onPick(avatar: any) {
        this.setValues({ avatar: avatar.value});
        this.setState({ avatar: avatar.value })
    }

    public render() {
        const { submitSuccess, roles } = this.state;
        const avatarList = [1, 2, 3, 4, 5, 6, 7, 8];

    return (
        <React.Fragment>
            {this.state.user && (
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h1 className="display-4">Edit User</h1>
                    {submitSuccess && (
                        <div className="alert alert-info" role="alert">
                            The new user was successfully submitted!
                        </div>
                    )}
                            <form id={"create-post-form"} onSubmit={this.processFormSubmission} noValidate={true}>
                                <div className="form-group">
                                    <label htmlFor="firstName"> First Name <span className="small text-success">(required)</span></label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        defaultValue={this.state.user.firstName}
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
                                        defaultValue={this.state.user.lastName}
                                        onChange={(e) => this.handleInputChanges(e)}
                                        name="lastName"
                                        className="form-control"
                                        placeholder="Enter user's last name"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email"> E-mail <span className="small text-success">(required)</span></label>
                                    <input
                                        type="email"
                                        id="email"
                                        defaultValue={this.state.user.email}
                                        onChange={(e) => this.handleInputChanges(e)}
                                        name="email"
                                        className="form-control"
                                        placeholder="Enter user's email address"
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
                                                    <option 
                                                        className="text-capitalize" 
                                                        key={role._id} 
                                                        value={role._id}>{ capitalizeFirstLetter(role.name) }</option>
                                                ))}
                                            </select>
                                        </React.Fragment>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password"> Password </label>
                                    <input
                                        type="text"
                                        id="password"
                                        // defaultValue={this.state.user.password}
                                        onChange={(e) => this.handleInputChanges(e)}
                                        name="password"
                                        className="form-control"
                                        placeholder="Set new password"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="avatar"> Avatar </label>
                                    <ImagePicker 
                                    images={avatarList.map((image, i) => ({src: `${process.env.PUBLIC_URL}/avatars/avatar${image}.png`, value: image, alt: image}))}
                                    onPick={this.onPick}
                                    
                                    />
                                </div>
                                <div className="form-group mt-4">
                                    <button className="btn btn-success" type="submit">
                                        Edit User
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
            )}
        </React.Fragment>
        );
    }
}
export default withRouter(EditUser);
