import React, { Component } from "react";

class Nav extends Component {
  render() {
    return (
      <React.Fragment>
        <h1>LED WEAR</h1>
        <nav>
          <div class="nav nav-tabs" id="nav-tab" role="tablist">
            <a
              class="nav-item nav-link active"
              id="nav-post-tab"
              data-toggle="tab"
              href="#nav-post"
              role="tab"
              aria-controls="nav-post"
              aria-selected="true"
            >
              Post
            </a>
            <a
              class="nav-item nav-link"
              id="nav-animation-tab"
              data-toggle="tab"
              href="#nav-animation"
              role="tab"
              aria-controls="nav-animation"
            >
              Animation
            </a>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}

export default Nav;
