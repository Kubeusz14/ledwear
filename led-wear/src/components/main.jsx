import React, { Component } from "react";
import { Tab, Nav, Form } from "react-bootstrap";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import Settings from "./settings";
import "./main.scss";

const positions = [
  {
    name: "Cuff: Left",
    x: 0.05,
    y: 0.8
  },
  {
    x: 0.05,
    y: 0.5
  }
];

function init() {
  const shirt = document.querySelector("#shirt");
  const colorPickers = positions.map(position => {
    console.log(position);
    const colorPicker = document.createElement("input");
    colorPicker.type = "color";
    // colorPicker.addEventListener('change', ...)
    // ...
    colorPicker.style.left = position.x * 100 + "%";
    colorPicker.style.top = `${position.y * 100}%`;
    colorPicker.name = `${position.description}`;
    shirt.appendChild(colorPicker);
    return colorPicker;
  });
  console.log("COLOR PICKERS:", colorPickers);
}

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
                <div className="shirt__figure" id="shirt"></div>
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

/*
<Form className="shirt__form">
                    <Form.Group controlId="formColorPickers">
                      <Form.Label>LEDs</Form.Label>
                      <MDBContainer>
                        <MDBRow>
                          <MDBCol size="2" md="3" id="right-col">
                            <Form.Control
                              type="color"
                              name="right armhole"
                              label="Right Armhole"
                            />
                          </MDBCol>
                          <MDBCol size="2" md="3" id="center-col">
                            <Form.Control
                              type="color"
                              name="right collar"
                              label="Right Collar"
                            />
                          </MDBCol>
                          <MDBCol size="3" md="3" id="center-col">
                            <Form.Control
                              type="color"
                              name="left collar"
                              label="Left Collar"
                            />
                          </MDBCol>
                          <MDBCol size="3" md="3" id="left-col">
                            <Form.Control
                              type="color"
                              name="left armhole"
                              label="Left Armhole"
                            />
                          </MDBCol>
                        </MDBRow>
                        <MDBRow>
                          <MDBCol size="2" md="3"></MDBCol>
                          <MDBCol size="2" md="3" id="center-col">
                            <Form.Control
                              type="color"
                              name="right placket"
                              label="Right Placket"
                            />
                          </MDBCol>
                          <MDBCol size="2" md="3" id="center-col">
                            <Form.Control
                              type="color"
                              name="left placket"
                              label="Left Placket"
                            />
                          </MDBCol>
                          <MDBCol size="2" md="3"></MDBCol>
                        </MDBRow>
                        <MDBRow>
                          <MDBCol size="2" md="3" id="left-col">
                            <Form.Control
                              type="color"
                              name="right sleeve"
                              label="Right Sleeve"
                            />
                          </MDBCol>
                          <MDBCol size="2" md="3" id="center-col">
                            <Form.Control
                              type="color"
                              name="body higher right"
                              label="Body Higher Right"
                            />
                          </MDBCol>
                          <MDBCol size="2" md="3" id="center-col">
                            <Form.Control
                              type="color"
                              name="body higher left"
                              label="Body Higher Left"
                            />
                          </MDBCol>
                          <MDBCol size="2" md="3" id="right-col">
                            <Form.Control
                              type="color"
                              name="left sleeve"
                              label="Left Sleeve"
                            />
                          </MDBCol>
                        </MDBRow>
                        <MDBRow>
                          <MDBCol size="2" md="3" id="left-col">
                            <Form.Control
                              type="color"
                              name="right cuff"
                              label="Right Cuff"
                            />
                          </MDBCol>
                          <MDBCol size="2" md="3" id="center-col">
                            <Form.Control
                              type="color"
                              id="body-lower-right"
                              name="body lower right"
                            />
                          </MDBCol>
                          <MDBCol size="2" md="3" id="center-col">
                            <input
                              type="color"
                              id="body-lower-left"
                              name="body lower left"
                            />
                            <label
                              htmlFor="body-lower-left"
                              aria-label="body lower left"
                            ></label>
                          </MDBCol>
                          <MDBCol size="2" md="3" id="right-col">
                            <input
                              type="color"
                              id="left-cuff"
                              name="left cuff"
                            />
                            <label
                              htmlFor="left-cuff"
                              aria-label="left cuff"
                            ></label>
                          </MDBCol>
                        </MDBRow>
                      </MDBContainer>
                    </Form.Group>
                  </Form>
*/

init();
