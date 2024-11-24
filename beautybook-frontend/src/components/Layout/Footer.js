import React from "react";

const AppFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white py-4">
      <div className="container">
        <div className="row">
          {/* About Us Section */}
          <div className="col-md-4 mb-3">
            <h5>About Us</h5>
            <p>
              BeautyBook is your go-to platform for managing appointments and
              services with ease. Connect with us for a seamless experience.
            </p>
          </div>
          {/* Contact Section */}
          <div className="col-md-4 mb-3">
            <h5>Contact</h5>
            <p>Email: <a href="mailto:support@beautybook.com" className="text-white">support@beautybook.com</a></p>
            <p>Phone: +962790640416</p>
          </div>
          {/* Social Media Section */}
          <div className="col-md-4 mb-3">
            <h5>Follow Us</h5>
            <div>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-white me-3">
                <i className="fab fa-facebook fa-lg"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-white me-3">
                <i className="fab fa-twitter fa-lg"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-white">
                <i className="fab fa-instagram fa-lg"></i>
              </a>
            </div>
          </div>
        </div>
        <hr className="bg-light" />
        <div className="text-center">
          <p className="mb-0">&copy; {currentYear} BeautyBook. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
