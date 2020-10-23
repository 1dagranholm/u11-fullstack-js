import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import AuthService from "../../services/auth.services";

const backgroundImage = require("../../assets/todo-image.jpeg");
const imageStyle = {
  width: '100%',
  height: '800px',
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'noRepeat',
  backgroundPosition: 'center'
};

const Restricted = () => {

  const user = AuthService.getCurrentUser();
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  
  useEffect(() => {
      const currentUser = AuthService.getCurrentUser();

      if (currentUser) {
          setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
      }
  
  }, []);

    return (
      <div className="full-image-background" style={imageStyle}>
      <header className="jumbotron jumbotron-fluid">
        <div className="container d-flex flex-column justify-content-between align-items-center">
          <h1 className="display-4">Restricted access</h1>
          <span>You do not have access to this part of TodoApp.</span>
          {!user && (
            <Link to={"/login"} className="btn btn-info mt-4 mr-2">
              Go to login <FontAwesomeIcon className="ml-1" icon={faArrowRight} /> 
            </Link>
          )}
          {user && (
            <Link to={"/my-todos"} className="btn btn-success mt-4 mr-2">
              Go to your Todo's <FontAwesomeIcon className="ml-1" icon={faArrowRight} /> 
            </Link>
          )}
          {showAdminBoard && (
            <Link to={"/my-todos"} className="btn btn-warning mt-4 mr-2">
              Go to admin pages <FontAwesomeIcon className="ml-1" icon={faArrowRight} /> 
            </Link>
          )}
          </div>
      </header>
    </div>
  );
};

export default Restricted;