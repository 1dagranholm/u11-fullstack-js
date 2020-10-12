import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import axios from "axios";
import { formatTimestamp } from "../../helper";

export interface IValues {
    [key: string]: any;
}
export interface IFormState {
    id: string;
    todo: any;
    values: IValues[];
    submitSuccess: boolean;
    loading: boolean;
}

class EditTodo extends React.Component<RouteComponentProps<any>, IFormState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            todo: {},
            values: [],
            loading: false,
            submitSuccess: false,
        };
    }

    public componentDidMount(): void {
        axios.get(`http://localhost:8080/api/todos/${this.state.id}`).then((response) => {
            this.setState({ todo: response.data.data });
        });
    }

    private processFormSubmission = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        this.setState({ loading: true });
        axios.patch(`http://localhost:8080/api/todos/${this.state.id}`, this.state.values).then((data) => {
            this.setState({ submitSuccess: true, loading: false });
            setTimeout(() => {
                this.props.history.push("/my-todos");
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
        const { submitSuccess } = this.state;
        return (
            <div className="App">
                {this.state.todo && (
                    <div>
                        <div>
                        <div className="jumbotron jumbotron-fluid">
                            <div className="container">
                                <div className="row">
                                    <div className="col-12">
                                        <h1 className="display-4">Edit todo</h1>
                                        <span> This todo was created <strong>{formatTimestamp(this.state.todo.createdAt)}</strong></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="container">
                            <div className="row">
                                {submitSuccess && (
                                    <div className="alert alert-success fade show h6" role="alert">
                                        <strong>Well done!</strong> Your todo has been updated.
                                    </div>
                                )}
                                    <div className="col-12">
                                        <form id={"create-post-form"} onSubmit={this.processFormSubmission} noValidate={true}>
                                            <div className="form-group">
                                                <label htmlFor="title"> Title </label>
                                                <input
                                                    type="text"
                                                    id="title"
                                                    defaultValue={this.state.todo.title}
                                                    onChange={(e) => this.handleInputChanges(e)}
                                                    name="title"
                                                    className="form-control"
                                                    placeholder="Enter title"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="description"> Description </label>
                                                <input
                                                    type="text"
                                                    id="description"
                                                    defaultValue={this.state.todo.description}
                                                    onChange={(e) => this.handleInputChanges(e)}
                                                    name="description"
                                                    className="form-control"
                                                    placeholder="Edit description"
                                                />
                                            </div>
                                            <div className="form-group pull-right">
                                                <button className="btn btn-success" type="submit">
                                                    Save
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
export default withRouter(EditTodo);
