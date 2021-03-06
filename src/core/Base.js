import React from "react";
import "./Base.css";
import { CLOUDFRONT } from "../backend";


// Function to get current date
const date = () => {
  var currentTime = new Date();
  const currentDate = currentTime.getFullYear();
  return currentDate;
}

export const Footer = () => (
  <footer className="footer-block ">
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 pt-2 mx-auto text-center bg-blue text-light">
          <h6>&copy; {date()} Ambrosia All Right Reserved</h6>
        </div>
      </div>
    </div>
  </footer>
)
const Base = ({
  title1 = "My Title",
  title2 = "",
  description = "The Ultimate Zero Contact Experiance",
  className = "",
  children
}) => {
  // eslint-disable-next-line
  var url = 'url(' + String(CLOUDFRONT) + 'banner/jumbotron_Final_1.jpg' + ')';



  return (
    <div>
      {/*Cover Section */}
      <div className="jumbotron bg-cover" style={{ backgroundImage: url }}>
        <div className="shade">
          <div className="custom-container">
            <h1 className="display-3 mb-1 title-upper">{title1}</h1>
            <h2 className="display-3 mb-1 title-lower">{title2}</h2>
            <p className="lead">{description}</p>
          </div>
        </div>
      </div>
      {/* Body Section: to be inserted through props*/}
      <div className={className}>

        {children}</div>

      {/* Footer Section */}
      <Footer />
    </div>
  )
};

export default Base;


