import React, { Component } from "react";
import "./footer.scss";

const email = "jakub_piwko@wp.pl";
class Footer extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="footer">
          Contact: <a href={"mailto:" + email}>Jakub Piwowarczyk</a>
        </div>
      </React.Fragment>
    );
  }
}

export default Footer;
