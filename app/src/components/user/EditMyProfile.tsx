import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import axios from "axios";

import ImagePicker from 'react-image-picker'
import 'react-image-picker/dist/index.css'

import AuthService from "../../services/auth.services";

import Tooltip from '@material-ui/core/Tooltip';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEye, faEyeSlash, faSave } from '@fortawesome/free-solid-svg-icons';

export interface IValues {
    [key: string]: any;
}
export interface IFormState {
    id: string;
    user: any;
    values: IValues[];
    submitSuccess: boolean;
    avatar: Number;
    currentUser: string;
    hidden: boolean;
}

class EditMyProfile extends React.Component<RouteComponentProps<any>, IFormState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            id: "",
            user: {},
            values: [],
            submitSuccess: false,
            avatar:  0,
            currentUser: "",
            hidden: true
        };
        this.onPick = this.onPick.bind(this);
        this.toggleShow = this.toggleShow.bind(this);
    }

    toggleShow(e: any) {
        e.preventDefault();
        this.setState({ hidden: !this.state.hidden });
    }

    public async componentDidMount() {
        const currentUser = AuthService.getCurrentUser();

        const user = await axios.get(`http://localhost:8080/api/users/${currentUser.id}`).then((response) => {
            return response.data.data;
        });

        this.setState({ user });
    }

    private processFormSubmission = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        if (this.state.user.firstName === "") {
            return;
        }

        if (this.state.user.lastName === "") {
            return;
        }

        if (this.state.user.email === "") {
            return;
        }
        
        const currentUser = AuthService.getCurrentUser();
        
        axios.patch(`http://localhost:8080/api/users/${currentUser.id}`, this.state.values).then((data) => {
            this.setState({ submitSuccess: true });
            setTimeout(() => {
                this.props.history.push("/profile");
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

    onPick(avatar: any) {
        this.setValues({ avatar: avatar.value});
        this.setState({ avatar: avatar.value })
    }

    private deleteUser() {
        const user = AuthService.getCurrentUser();

        axios.delete(`http://localhost:8080/api/users/${user.id}`).then((response) => {
            user.deletedAt = response.data.data.deletedAt;
            this.setState({user});
                setTimeout(() => {
                    this.props.history.push("/");
                }, 1500);
        });
    }

    public render() {
        const { submitSuccess } = this.state;
        const avatarList = [1, 2, 3, 4, 5, 6, 7, 8];

    return (
        <React.Fragment>
            {this.state.user && (
            <React.Fragment>
                <div className="jumbotron jumbotron-fluid">
                    <div className="container">
                        <h1 className="display-4">Edit my profile</h1>
                        {submitSuccess && (
                            <div className="alert alert-info" role="alert">
                                The new user was successfully submitted!
                            </div>
                        )}
                        <form id={"create-post-form"} onSubmit={this.processFormSubmission} noValidate={true}>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="firstName"> First Name <span className="small text-success">(required)</span></label>
                                <input
                                    type="text"
                                    id="firstName"
                                    defaultValue={this.state.user.firstName}
                                    onChange={(e) => this.handleInputChanges(e)}
                                    name="firstName"
                                    className="form-control"
                                    placeholder="Enter user's first name"
                                    pattern="^.{1,30}$"
                                    required
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="lastName"> Last Name <span className="small text-success">(required)</span></label>
                                <input
                                    type="text"
                                    id="lastName"
                                    defaultValue={this.state.user.lastName}
                                    onChange={(e) => this.handleInputChanges(e)}
                                    name="lastName"
                                    className="form-control"
                                    placeholder="Enter user's last name"
                                    pattern="^.{1,50}$"
                                    required
                                />
                            </div>
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
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password"> Password </label>
                                <div className="input-group">
                                    <input
                                        type={this.state.hidden ? "password" : "text"}
                                        id="password"
                                        onChange={(e) => this.handleInputChanges(e)}
                                        name="password"
                                        className="form-control"
                                        placeholder="Set new password"
                                        pattern="^.{1,100}$"
                                    />
                                    <div className="input-group-append">
                                            <Tooltip title="Toggle to show or hide password input">  
                                                <button className="btn btn-info" onClick={this.toggleShow}><FontAwesomeIcon icon={this.state.hidden ? faEye : faEyeSlash} /></button>
                                            </Tooltip>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="avatar"> Set avatar </label>
                                <ImagePicker 
                                images={avatarList.map((image) => ({src: `${process.env.PUBLIC_URL}/avatars/avatar${image}.png`, value: image, alt: image}))}
                                onPick={this.onPick}
                                required
                                />
                            </div>
                            <div className="form-group mt-4">
                                <button className="btn btn-success" type="submit">
                                    <FontAwesomeIcon className="mr-1" icon={faSave} /> Save edit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    <button
                        type="button" 
                        className="btn btn-danger"
                        onClick={() => this.deleteUser()}
                    >
                        <FontAwesomeIcon className="mr-1" icon={faTrashAlt} /> Delete my account
                    </button>
                </div>
            </React.Fragment>
            )}
        </React.Fragment>
        );
    }
}
export default withRouter(EditMyProfile);