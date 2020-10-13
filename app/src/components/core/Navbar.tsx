import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListAlt, faUser, faUnlockAlt  } from '@fortawesome/free-solid-svg-icons';

import AuthService from "../../services/auth.services";

const Navbar = () => {

    const user = AuthService.getCurrentUser();
    const [showSuperAdminBoard, setShowSuperAdminBoard] = useState(false);
    const [showAdminBoard, setShowAdminBoard] = useState(false);
    
    useEffect(() => {
        const currentUser = AuthService.getCurrentUser();

        if (currentUser) {
            setShowSuperAdminBoard(currentUser.roles.includes("ROLE_SUPERADMIN"));
            setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
        }
    
    }, []);

    const logOut = () => {
        AuthService.logout();
    };

    return (
        <section id="navbar" className="navbar-dark bg-dark">
          <nav className="navbar container justify-content-between">
                <Link to="/" className="navbar-brand" href="#"><FontAwesomeIcon className="mr-1" icon={faListAlt} /> TodoApp</Link>
                {user && (
                <button className="navbar-toggler" 
                    type="button" 
                    data-toggle="collapse" 
                    data-target="#navbarsExample01"
                    aria-controls="navbarsExample01"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                )}

                {user && (
                <div className="collapse navbar-collapse dropdown-menu-right text-right" id="navbarsExample01">
                    
                    {showAdminBoard && (
                        <ul className="navbar-nav mr-auto mt-3">
                            <li className="nav-item">
                                    <Link to={"/admin"} className="nav-link"><FontAwesomeIcon className="mr-1" icon={faUnlockAlt} /> <strong>Admin pages</strong></Link>
                            </li>
                        </ul>
                    )}
                    
                    {user && (
                        <ul className="navbar-nav mr-auto mt-3">
                            <li className="text-light small mb-1">
                                <FontAwesomeIcon className="mr-1" icon={faUser} /> <strong>{user.email}</strong>
                            </li>
                            <li className="nav-item">
                                <Link to="/my-todos" className="nav-link">My todos</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/profile" className="nav-link">My profile</Link>
                            </li>
                            <li className="nav-item mb-2">
                                <Link to="/" className="nav-link" onClick={logOut}>Log out</Link>
                            </li>
                        </ul>
                    )}

                    {showSuperAdminBoard && (
                        <ul className="navbar-nav mr-auto">
                            <li><h4 className="text-light">Admin</h4></li>
                            <li className="nav-item">
                                <Link to={"/superadmin"} className="nav-link">Admin pages</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/create-user"} className="nav-link">Admin: Create users</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/create-todo"} className="nav-link">Admin: Create todos</Link>
                            </li>
                        </ul>
                    )}

                </div>
                )}

                {!user && (
                    <ul className="nav ml-auto">
                        <li className="nav-item">
                            <Link to="/login" className="nav-link text-white">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/register" className="nav-link text-white">Sign Up</Link>
                        </li>
                    </ul>
                )}
            </nav>
        </section>
    );
};

export default Navbar;