import React, { useState } from 'react';
import { Collapse, Button } from 'reactstrap';
import Form from "react-bootstrap/Form";
import "./animations.scss";

const Animations = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="animations__container">
      <Button className="btn btn-primary animation_btn" onClick={toggle}>Animation Settings</Button>
          <Collapse isOpen={isOpen} className="animations__card container">
          <Form.Group controlId="mainForm.Checkboxes">
                <Form.Label>Modes</Form.Label>
                <Form.Check className="same_color_check" type="radio" name="modeRadios" label="All same Color Mode" />
                <Form.Check className="pattern_check" type="radio" name="modeRadios" label="Example Pattern Mode" />
            </Form.Group>
            <Form.Group controlId="mainForm.ExamplePatterns">
              <Form.Label className="animations__label">Example Animations:</Form.Label>
              <Form.Control as="select">
                <option>Rainbow</option>
                <option>Blinking </option>
                <option>Red-Blue</option>
                <option>Pulse</option>
              </Form.Control>
              <Form.Group controlId="formRange">
                    <Form.Label className="animations__label">Blinking Speed</Form.Label>
                    <Form.Control type="range"/>
              </Form.Group>
            </Form.Group>
        </Collapse>
    </div>
  );
}

export default Animations;