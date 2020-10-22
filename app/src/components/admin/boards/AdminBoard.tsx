import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import UserService from "../../../services/user.service";

import UserDashboard from "../UserDashboard";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCheckSquare } from '@fortawesome/free-solid-svg-icons';

const AdminBoard = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getAdminBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
  <React.Fragment>
    <div className="jumbotron jumbotron-fluid">
      <div className="container">
        <h1 className="display-4">{content}</h1>
          <Link to={"/create-user"} className="btn btn-primary mt-4 mr-2">
            <FontAwesomeIcon className="mr-1" icon={faUser} /> Create new user
          </Link>
          <Link to={"/create-todo"} className="btn btn-secondary mt-4">
            <FontAwesomeIcon className="mr-2" icon={faCheckSquare} />Create new todo for users
          </Link>
      </div>
    </div>
    <div className="container">
      <div className="row">
        <div className="col-12 table-wrapper">
          <UserDashboard />
        </div>
      </div>
    </div>
  </React.Fragment>
  );
};

export default AdminBoard;