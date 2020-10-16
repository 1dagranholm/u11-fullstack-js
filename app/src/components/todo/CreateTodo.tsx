import * as React from "react";
import axios from "axios";
import { RouteComponentProps, withRouter } from "react-router-dom";

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
class CreateTodo extends React.Component<RouteComponentProps, IFormState> {
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
        };
    }

    public async componentDidMount() {
        const users = await axios.get(`http://localhost:8080/api/users`).then((response) => {
            return response.data.data;
        });

        this.setState({users});
    }

    private processFormSubmission = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        if (this.state.ownerId === "") {
            return;
        }

        this.setState({ loading: true });
        const formData = {
            title: this.state.title,
            description: this.state.description,
            ownerId: this.state.ownerId,
            completedAt: this.state.completedAt,
            deletedAt: this.state.deletedAt,
            createdAt: this.state.createdAt,
            updatedAt: this.state.updatedAt,
        };
        this.setState({ submitSuccess: true, values: [...this.state.values, formData], loading: false });
        axios.post(`http://localhost:8080/api/todos/`, formData).then((data) => [
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
                            <div className="form-group">
                                <label htmlFor="title"> Title <span className="small text-success">(required)</span></label>
                                <input
                                    type="text"
                                    id="title"
                                    onChange={(e) => this.handleInputChanges(e)}
                                    name="title"
                                    className="form-control"
                                    placeholder="Enter title"
                                    required
                                />
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
                                />
                            </div>
                            <div className="form-group">
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
                                            <option >Select user</option>
                                            { users.map((user: any) => (
                                                !user.deletedAt && (
                                                    <option key={user._id} value={user._id}>{user.firstName} {user.lastName}</option>
                                                )
                                            ))}
                                        </select>
                                    </React.Fragment>
                                )}
                            </div>
                            <div className="form-group">
                                <button className="btn btn-success mt-4" type="submit">
                                    Create Todo
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default withRouter(CreateTodo);
