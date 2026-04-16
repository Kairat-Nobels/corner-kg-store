import React from 'react';
import "./footer.scss";

const Footer = () => {
    return (
        <footer className='footer d-flex flex-column flex-sm-row justify-content-between p-4'>

            <div className="footer-left pt-2">
                <span>© 2025 Гүлдөр дүйнөсү</span>
            </div>

            <div className="footer-right pt-2">
                <span className='pe-1'>Жасаган:</span>
                <span
                    className='developer'
                    onClick={() => window.open("https://www.instagram.com/mamytowk")}
                >
                    Developer
                </span>
            </div>

        </footer>
    );
};

export default Footer;

