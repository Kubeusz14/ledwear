import React, { useState } from 'react';
import { Collapse, Button } from 'reactstrap';
import Form from "react-bootstrap/Form";
import "./animations.scss";
import { Modal } from 'react-bootstrap';

const Animations = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="animations__container">
      <Button className="btn btn-primary animation_btn" onClick={toggle}>Settings</Button>
          <Collapse isOpen={isOpen} className="animations__card container">
          <Form.Group controlId="mainForm.Checkboxes">
                <Form.Label>Modes</Form.Label>
                <Form.Check className="same_color_check" id="checkSameColor" type="checkbox" name="modeRadios" label="All same Color Mode" />
            </Form.Group>
            <Form.Group controlId="mainForm.ExamplePatterns">
              <Form.Label className="animations__label">Example Animations:</Form.Label>
              <Form.Control id="inputSameColor" as="select">
                <option>Custom</option>
                <option>Rainbow</option>
                <option>Blinking </option>
                <option>Red-Blue</option>
                <option>Pulse</option>
              </Form.Control>
              <Form.Group controlId="formAnimationSpeedRange">
                    <Form.Label className="animations__label">Blinking Speed</Form.Label>
                    <Form.Control id="inputSpeed" type="range" min="30" max="3000" step="30"/>
              </Form.Group>
            </Form.Group>
            <Form.Group controlId="formBrigthnessRange">
              <Form.Label className="settingsLabel">LED Brightness</Form.Label>
              <Form.Control id="formBrightnessRange" type="range" min="0" max="255" />
            </Form.Group>
        </Collapse>
    </div>
  );
};

export default Animations;