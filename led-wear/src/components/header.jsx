import React, { Component } from "react";
import Nav from "react-bootstrap/Nav";

class Header extends Component {
  render() {
    return (
      <React.Fragment>
        <h1>LED WEAR</h1>
        <Nav variant="tabs" activeKey="/post-tab" role="tablist" id="nav-tab">
          <Nav.Item role="navigation">
            <Nav.Link
              className="nav-item nav-link"
              id="nav-post-tab"
              data-toggle="tab"
              href="/post-tab"
              role="tab"
              aria-controls="nav-post"
              aria-selected="true"
            >
              Post
            </Nav.Link>
          </Nav.Item>
          <Nav.Item role="navigation">
            <Nav.Link
              className="nav-item nav-link"
              id="nav-animation-tab"
              data-toggle="tab"
              href="/animation-tab"
              role="tab"
              aria-controls="nav-animation"
            >
              Animation
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </React.Fragment>
    );
  }
}

export default Header;
