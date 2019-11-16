import React, { Component } from "react";
import { Figure, Tab, Nav, Form } from "react-bootstrap";
import shirt from "../assets/images/shirt.jpg";
import Settings from "./settings";
import "./main.scss";

class Main extends Component {
  render() {
    return (
      <React.Fragment>
        <div>
          <Tab.Container id="nav-container" defaultActiveKey="post-tab">
            <div id="header-section">
              <Nav variant="tabs" role="tablist" id="nav-tab">
                <Nav.Item role="navigation">
                  <Nav.Link
                    className="nav-item nav-link"
                    id="nav-post-tab"
                    data-toggle="tab"
                    eventKey="post-tab"
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
                    eventKey="animation-tab"
                    role="tab"
                    aria-controls="nav-animation"
                  >
                    Animation
                  </Nav.Link>
                </Nav.Item>
              </Nav>
              <div className="shirt__settings">
                <Settings />
              </div>
            </div>
            <Tab.Content>
              <Tab.Pane eventKey="post-tab" title="Post-Tab">
                <Figure className="shirt__figure">
                  <Figure.Image
                    className="shirt__image"
                    alt="LED WEAR"
                    src={shirt}
                    fluid
                  />
                  <Form>
                    <Form.Group controlId="formColorPickers">
                      <Form.Label>LEDs</Form.Label>
                      <input type="color" id="left-collar" name="left collar" />
                      <label for="left-collar" aria-label="left collar"></label>
                      <input
                        type="color"
                        id="right-collar"
                        name="right collar"
                      />
                      <label
                        for="right-collar"
                        aria-label="right collar"
                      ></label>
                      <input
                        type="color"
                        id="left-placket"
                        name="left placket"
                      />
                      <label
                        for="left-placket"
                        aria-label="left placket"
                      ></label>
                      <input
                        type="color"
                        id="right-placket"
                        name="right placket"
                      />
                      <label
                        for="right-placket"
                        aria-label="right placket"
                      ></label>
                      <input
                        type="color"
                        id="body-higher-left"
                        name="body higher left"
                      />
                      <label
                        for="body-higher-left"
                        aria-label="body higher left"
                      ></label>
                      <input
                        type="color"
                        id="body-higher-right"
                        name="body higher right"
                      />
                      <label
                        for="body-higher-right"
                        aria-label="body higher right"
                      ></label>
                      <input
                        type="color"
                        id="body-lower-left"
                        name="body lower left"
                      />
                      <label
                        for="body-lower-left"
                        aria-label="body lower left"
                      ></label>
                      <input
                        type="color"
                        id="body-lower-right"
                        name="body lower right"
                      />
                      <label
                        for="body-lower-right"
                        aria-label="body lower right"
                      ></label>
                      <input
                        type="color"
                        id="left-armhole"
                        name="left armhole"
                      />
                      <label
                        for="left-armhole"
                        aria-label="left armhole"
                      ></label>
                      <input
                        type="color"
                        id="right-armhole"
                        name="right armhole"
                      />
                      <label
                        for="right-armhole"
                        aria-label="right armhole"
                      ></label>
                      <input type="color" id="left-sleeve" name="left sleeve" />
                      <label for="left-sleeve" aria-label="left sleeve"></label>
                      <input
                        type="color"
                        id="right-sleeve"
                        name="right sleeve"
                      />
                      <label
                        for="right-sleeve"
                        aria-label="right sleeve"
                      ></label>
                      <input type="color" id="left-cuff" name="left cuff" />
                      <label for="left-cuff" aria-label="left cuff"></label>
                      <input type="color" id="right-cuff" name="right cuff" />
                      <label for="right-cuff" aria-label="right cuff"></label>
                    </Form.Group>
                  </Form>
                </Figure>
              </Tab.Pane>
              <Tab.Pane
                eventKey="animation-tab"
                title="Animation-Tab"
              ></Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </div>
      </React.Fragment>
    );
  }
}

export default Main;
