import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import axios from "axios";

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
                {this.state.todo && (
                    <div>
                        <div>
                            <div className={"col-md-12 form-wrapper"}>
                                <h2> Edit Todo </h2>
                                {submitSuccess && (
                                    <div className="alert alert-info" role="alert">
                                        Todo details has been edited successfully{" "}
                                    </div>
                                )}
                                <form id={"create-post-form"} onSubmit={this.processFormSubmission} noValidate={true}>
                                    <div className="form-group col-md-12">
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
                                    <div className="form-group col-md-12">
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
                                    <div className="form-group col-md-12">
                                        <label htmlFor="ownerId"> Owner </label>
                                        <input
                                            type="text"
                                            id="ownerId"
                                            defaultValue={this.state.todo.ownerId}
                                            onChange={(e) => this.handleInputChanges(e)}
                                            name="ownerId"
                                            className="form-control"
                                            placeholder="Edit owner"
                                        />
                                    </div>
                                    <div className="form-group col-md-4 pull-right">
                                        <button className="btn btn-success" type="submit">
                                            Edit Todo{" "}
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
export default withRouter(EditTodo);
