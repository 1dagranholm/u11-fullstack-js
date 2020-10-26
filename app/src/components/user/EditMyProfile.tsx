import * as React from "react";
import { RouteComponentProps, withRouter, Link } from "react-router-dom";
import axios from "axios";

import authHeader from "../../services/auth-header";

import ImagePicker from 'react-image-picker'
import 'react-image-picker/dist/index.css'

import AuthService from "../../services/auth.services";

import Tooltip from '@material-ui/core/Tooltip';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEye, faEyeSlash, faSave, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 

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
            avatar: 0,
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

        const user = await axios.get(`${process.env.REACT_APP_NODE_URL}/users/${currentUser.id}`, { headers: authHeader() }).then((response) => {
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
        
        let currentUser = AuthService.getCurrentUser();
        
        axios.patch(`${process.env.REACT_APP_NODE_URL}/users/${currentUser.id}`, this.state.values, { headers: authHeader() }).then((data) => {
            this.setState({ submitSuccess: true });

            let valuesData = this.state.values;

            for (const [key, value] of Object.entries(valuesData)) {
                currentUser[key] = value;
            }

            localStorage.setItem("user", JSON.stringify(currentUser));

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

    logOut = () => {
        AuthService.logout();
    };

    private deleteUser(id: string) {
        const user = AuthService.getCurrentUser();

        axios.delete(`${process.env.REACT_APP_NODE_URL}/users/${user.id}`, { headers: authHeader() }).then((response) => {
            user.deletedAt = response.data.data.deletedAt;
            this.setState({user});
                setTimeout(() => {
                    this.logOut();
                    this.props.history.push("/");
                }, 1500);
        });
    }

    private confirmDelete() {
        confirmAlert({
          message: "Are you really absolutely sure that you want to do delete your account?",
          buttons: [
            {
              label: "Yes, please delete me now!",
              onClick: () => this.deleteUser(this.state.user.id)
            },
            {
              label: "Oh no, cancel this request.",
              onClick: () => {}
            }
          ]
        });
      };

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
                                <button className="btn btn-success mr-2" type="submit">
                                    <FontAwesomeIcon className="mr-1" icon={faSave} /> Save edit
                                </button>
                                <Link 
                                    to="/profile"
                                    className="btn btn-primary"
                                >
                                    <FontAwesomeIcon icon={faArrowLeft}/> Cancel and get back
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    <button
                        type="button" 
                        className="btn btn-danger"
                        onClick={() => this.confirmDelete()}
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
