import React, { useState, useEffect } from "react";

import UserService from "../../services/user.service";

const SuperAdminBoard = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getSuperAdminBoard().then(
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
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>
    </div>
  );
};

export default SuperAdminBoard;