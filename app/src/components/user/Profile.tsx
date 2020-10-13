import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../services/auth.services";

const Profile = () => {

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
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 className="display-4"><strong>{user.firstName} {user.lastName}</strong> Profile</h1>
              <ul className="list-group"> 
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