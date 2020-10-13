import React from "react";

const Footer = () => {

    return (
        <footer className="footer mt-auto py-5">
            <div className="container d-flex justify-content-around align-items-center">
                <div className="d-flex">
                        <span className="text-muted col-12">
                            Get your Todo's together in this <strong>TodoApp</strong> by <a href="mailto:granholm.ida@gmail.com">Ida Granholm</a> @ Chas Academy.
                        </span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;