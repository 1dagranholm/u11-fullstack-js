import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import UserService from "../../services/user.service";

import UserDashboard from "../admin/UserDashboard";

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
          <Link to={"/create-user"} className="btn btn-info mt-4 mr-2">
              Create new user
          </Link>
          <Link to={"/create-todo"} className="btn btn-secondary mt-4">
              Create new todo for users
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