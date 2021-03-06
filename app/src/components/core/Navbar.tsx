import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListAlt, faUser, faTools, faSignOutAlt, faCheckSquare  } from '@fortawesome/free-solid-svg-icons';

import AuthService from "../../services/auth.services";

import $ from "jquery";

const Navbar = () => {
    
    const user = AuthService.getCurrentUser();
    const [showAdminBoard, setShowAdminBoard] = useState(false);
    
    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
        }
    
    }, [user]);

    const logOut = () => {
        AuthService.logout();
    };

    const toggleNav = () => {
        $('.navbar-toggler:not(.collapsed)').trigger("click");
    }
    
    return (
        <section id="nav-section" className="fixed-top navbar-dark bg-primary">
          <nav className="navbar container justify-content-between" id="topnavbar">
                <Link to="/" className="navbar-brand" href="#" onClick={toggleNav}><FontAwesomeIcon className="mr-1" icon={faListAlt} /> TodoApp</Link>
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
                    
                    {user && (
                        <ul className="navbar-nav mr-auto mt-3">
                            <li className="nav-item mb-3">
                                <Link to="/my-todos" className="nav-link text-info" onClick={toggleNav}>
                                    <FontAwesomeIcon className="mr-2" icon={faCheckSquare} /> 
                                        <strong>My Todo-list</strong>
                                </Link>
                            </li>
                            <li className="nav-item text-white">
                                Logged in as: <strong>{user.firstName} {user.lastName}</strong> 
                            </li>
                            <li className="nav-item mb-3">
                                <Link to="/profile" className="nav-link text-success" onClick={toggleNav}>
                                    <FontAwesomeIcon className="mr-1" icon={faUser} /> View profile
                                </Link>
                            </li>
                            {showAdminBoard && (
                                <li className="nav-item mb-2">
                                        <Link to={"/admin"} className="nav-link text-warning" onClick={toggleNav}>
                                            <FontAwesomeIcon className="mr-1" icon={faTools} /> <strong>Admin pages</strong>
                                        </Link>
                                </li>
                            )}
                            <li className="nav-item mb-2">
                                <Link to="/" className="nav-link text-secondary" onClick={logOut}>
                                    <FontAwesomeIcon className="mr-1" icon={faSignOutAlt} /> Log out
                                </Link>
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