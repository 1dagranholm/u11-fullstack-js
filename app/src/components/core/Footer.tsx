import React from "react";

const Footer = () => {

    return (
        <section id="footer-section" className="fixed-bottom">
            <footer id="bottom-footer" className="footer pt-4 pb-4">
                <div className="container d-flex justify-content-around align-items-center">
                    <div className="d-flex">
                            <span id="footer-text" className="text-muted col-12">
                                Get your Todo's together in this <strong>TodoApp</strong> by <a href="mailto:granholm.ida@gmail.com">Ida Granholm</a> @ Chas Academy.
                            </span>
                    </div>
                </div>
            </footer>
        </section>
    );
};

export default Footer;