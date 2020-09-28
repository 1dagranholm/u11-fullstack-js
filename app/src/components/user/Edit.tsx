import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import axios from "axios";

export interface IValues {
    [key: string]: any;
}
export interface IFormState {
    id: string;
    user: any;
    values: IValues[];
    submitSuccess: boolean;
    loading: boolean;
}

class EditCustomer extends React.Component<RouteComponentProps<any>, IFormState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            user: {},
            values: [],
            loading: false,
            submitSuccess: false,
        };
    }

    public componentDidMount(): void {
        axios.get(`http://localhost:8080/api/users/${this.state.id}`).then((response) => {
            console.log(this.state.user);
            this.setState({ user: response.data.data });
        });
    }

    private processFormSubmission = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        this.setState({ loading: true });
        axios.patch(`http://localhost:8080/api/users/${this.state.id}`, this.state.values).then((data) => {
            this.setState({ submitSuccess: true, loading: false });
            setTimeout(() => {
                this.props.history.push("/");
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

    public render() {
        const { submitSuccess, loading } = this.state;
        return (
            <div className="App">
                {this.state.user && (
                    <div>
                        <div>
                            <div className={"col-md-12 form-wrapper"}>
                                <h2> Edit Customer </h2>
                                {submitSuccess && (
                                    <div className="alert alert-info" role="alert">
                                        Customer's details has been edited successfully{" "}
                                    </div>
                                )}
                                <form id={"create-post-form"} onSubmit={this.processFormSubmission} noValidate={true}>
                                    <div className="form-group col-md-12">
                                        <label htmlFor="userName"> Username </label>
                                        <input
                                            type="text"
                                            id="userName"
                                            defaultValue={this.state.user.userName}
                                            onChange={(e) => this.handleInputChanges(e)}
                                            name="userName"
                                            className="form-control"
                                            placeholder="Enter user's username"
                                        />
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label htmlFor="password"> Password </label>
                                        <input
                                            type="text"
                                            id="password"
                                            defaultValue={this.state.user.password}
                                            onChange={(e) => this.handleInputChanges(e)}
                                            name="password"
                                            className="form-control"
                                            placeholder="Set a password for the user"
                                        />
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label htmlFor="role"> Role </label>
                                        <input
                                            type="text"
                                            id="role"
                                            defaultValue={this.state.user.role}
                                            onChange={(e) => this.handleInputChanges(e)}
                                            name="role"
                                            className="form-control"
                                            placeholder="Set a role for the user"
                                        />
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label htmlFor="firstName"> First Name </label>
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
                                    <div className="form-group col-md-12">
                                        <label htmlFor="lastName"> Last Name </label>
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
                                    <div className="form-group col-md-12">
                                        <label htmlFor="email"> E-mail </label>
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

                                    <div className="form-group col-md-4 pull-right">
                                        <button className="btn btn-success" type="submit">
                                            Edit Customer{" "}
                                        </button>
                                        {loading && <span className="fa fa-circle-o-notch fa-spin" />}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
export default withRouter(EditCustomer);
