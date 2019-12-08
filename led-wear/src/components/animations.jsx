import React, { Component } from "react";
import "./animations.scss";
import { Form } from "react-bootstrap";

class Animation extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="container animations__card">
          <Form className="animations">
          <Form.Group controlId="animationsForm.Checkboxes">
                <Form.Label>Modes</Form.Label>
                <Form.Check className="same_color_check" type="radio" name="modeRadios" label="All same Color Mode" />
                <Form.Check className="pattern_check" type="radio" name="modeRadios" label="Example Pattern Mode" />
            </Form.Group>
            <Form.Group controlId="animationsForm.ExamplePatterns">
              <Form.Label className="animations__label">Example Animations:</Form.Label>
              <Form.Control as="select">
                <option>Rainbow</option>
                <option>Blinking</option>
                <option>Red-Blue</option>
                <option>Pulse</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </div>
      </React.Fragment>
    );
  }
}

export default Animation;
