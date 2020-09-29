import * as React from "react";
import axios from "axios";
import { RouteComponentProps, withRouter } from "react-router-dom";

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

class Create extends React.Component<RouteComponentProps, IFormState> {
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
        };
    }

    private processFormSubmission = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
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
                this.props.history.push("/");
            }, 1500),
        ]);
    };

    private handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value,
        });
    };

    public render() {
        const { submitSuccess, loading } = this.state;
        return (
            <div>
                <div className={"col-md-12 form-wrapper"}>
                    <h2> Create Todo </h2>
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
                            <label htmlFor="title"> Title </label>
                            <input
                                type="text"
                                id="title"
                                onChange={(e) => this.handleInputChanges(e)}
                                name="title"
                                className="form-control"
                                placeholder="Enter title"
                            />
                        </div>
                        <div className="form-group col-md-12">
                            <label htmlFor="description"> Description </label>
                            <input
                                type="text"
                                id="description"
                                onChange={(e) => this.handleInputChanges(e)}
                                name="description"
                                className="form-control"
                                placeholder="Edit description"
                            />
                        </div>
                        <div className="form-group col-md-12">
                            <label htmlFor="ownerId"> Owner </label>
                            <input
                                type="text"
                                id="ownerId"
                                onChange={(e) => this.handleInputChanges(e)}
                                name="ownerId"
                                className="form-control"
                                placeholder="Edit owner"
                            />
                        </div>
                        <div className="form-group col-md-4 pull-right">
                            <button className="btn btn-success" type="submit">
                                Create Todo
                            </button>
                            {loading && <span className="fa fa-circle-o-notch fa-spin" />}
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default withRouter(Create);
