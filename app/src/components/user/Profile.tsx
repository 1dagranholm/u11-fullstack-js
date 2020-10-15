import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import AuthService from "../../services/auth.services";
import { formatTimestamp } from "../../helper";

const Profile = (props: any) => {

  const user = AuthService.getCurrentUser();
  const [showAdminBoard, setShowAdminBoard] = useState(false);
    
  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();

    if (currentUser) {
      setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
    }
    
  }, []);

  return (
  <React.Fragment>
    <div className="jumbotron jumbotron-fluid">
        <div className="container mb-4">
          <div className="row">
            <div className="col-12">
              <span className="muted-text">My profile</span>
              <h1 className="display-4"><strong>{user.firstName} {user.lastName}</strong></h1>
              <ul className="list-group mt-3"> 
                  <li className="list-group-item d-flex flex-row justify-content-between align-items-center">
                    <strong>E-mail:</strong> {user.email}
                  </li> 
                  <li className="list-group-item d-flex flex-row justify-content-between align-items-center">
                    <strong>Id:</strong> {user.id}
                  </li> 
                  <li className="list-group-item d-flex flex-row justify-content-between align-items-center">
                    <strong>Authority:</strong>
                      {user.roles &&
                      user.roles.map((role: React.ReactNode, index: string | number | null | undefined) => <span key={index}>{role}</span>)}
                  </li>
                  <li className="list-group-item d-flex flex-row justify-content-between align-items-center">
                    <strong>Account created:</strong> { formatTimestamp(user.createdAt) }
                  </li>
                </ul>
              </div>
              <div className="col-12">
                <Link to={"/my-todos"} className="btn btn-success mt-4 mr-2">
                  See my Todo's
                </Link>
                {showAdminBoard && (
                <Link to={"/admin"} className="btn btn-info mt-4 mr-2">
                  Admin pages
                </Link>
                )}
              </div>
            </div>
          </div>
      </div>
  </React.Fragment>
  );
};

export default Profile;