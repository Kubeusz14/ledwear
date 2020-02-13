import React, { Component } from "react";
import "./main.scss";
import Background from "../assets/images/shirt.png";
import Form from "react-bootstrap/Form";
import Carousel from "react-bootstrap/Carousel";
import Animations from "../components/animations";
import { Button } from "react-bootstrap";
import { setValue } from "../services/data";
import { sendPost } from "../services/api_service";

let backgroundImage = {
  backgroundImage: `url(${Background})`
};

const positions = [
  {
    name: "Cuff: Right",
    x: 0.36,
    y: 0.85,
    value: "#009900"
  },
  {
    name: "Sleeve: Right",
    x: 0.37,
    y: 0.5,
    value: "#990099"
  },
  {
    name: "Armhole: Right",
    x: 0.4,
    y: 0.2,
    value: "#909090"
  },
  {
    name: "Collar: Right",
    x: 0.47,
    y: 0.1,
    value: "#099999"
  },
  {
    name: "Placket: Right",
    x: 0.45,
    y: 0.25,
    value: "#999000"
  },
  {
    name: "Body: Higher Right",
    x: 0.45,
    y: 0.4,
    value: "#000999"
  },
  {
    name: "Body: Lower Right",
    x: 0.45,
    y: 0.7,
    value: "#900000"
  },
  {
    name: "Body: Lower Left",
    x: 0.54,
    y: 0.7,
    value: "#000099"
  },
  {
    name: "Body: Higher Left",
    x: 0.54,
    y: 0.4,
    value: "#990090"
  },
  {
    name: "Placket: Left",
    x: 0.54,
    y: 0.25,
    value: "#009900"
  },
  {
    name: "Collar: Left",
    x: 0.52,
    y: 0.1,
    value: "#090999"
  },
  {
    name: "Armhole: Left",
    x: 0.59,
    y: 0.2,
    value: "#990909"
  },
  {
    name: "Sleeve: Left",
    x: 0.62,
    y: 0.5,
    value: "#999990"
  },
  {
    name: "Cuff: Left",
    x: 0.628,
    y: 0.85,
    value: "#990009"
  }
];

const inputs = document.querySelectorAll("input");
const submitButton = document.getElementById("submit-button");
const settingsButton = document.getElementById("settings-button");

export function saveValue(key, value) {
  setValue(key, value);
}

function send() {
  console.log("Start Send Call");
  //disableForm();
  sendPost(connectionStatus);
  console.log("End Send Call");
}

function connectionStatus(result) {
  switch (result) {
    case 1:
      console.log("Connection successful!");
      enableForm();
      break;
    case 2:
      console.log("Connection Warning!");
      enableForm();
      break;
    case 0:
      console.log("Connection failed!");
      enableForm();
      break;
  }
}

function disableForm() {
  submitButton.disabled = true;
  settingsButton.disabled = true;
  inputs.forEach(function(input) {
    input.disabled = true;
  });
}

function enableForm() {
  submitButton.disabled = false;
  settingsButton.disabled = false;
  inputs.forEach(function(input) {
    input.disabled = false;
  });
}

function watchColorPicker(event) {
  document.querySelectorAll("input").forEach(function(input) {
    input.style.color = event.target.value;
  });
}

class Main extends Component {
  constructor(props) {
    super(props);


    this.handleSubmit = this.handleSubmit.bind(this);
    this.init = this.init.bind(this);
    this.init();
  }

  init() {
    //enableForm();
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    fetch( /*address*/'', {
      method: 'POST',
      body: data
    } ).then( response  => {console.log(response.data)} )
  }

  render() {
    return (
        <React.Fragment>
          <Form className="mainForm" id="main-form" onSubmit={this.handleSubmit}>
            <Animations />

            <Carousel interval={null}>
              <Carousel.Item><Shirt key="shirt_1" id="shirt_1" /></Carousel.Item>
              <Carousel.Item><Shirt key="shirt_2" id="shirt_2" /></Carousel.Item>
              <Carousel.Item><Shirt key="shirt_3" id="shirt_3" /></Carousel.Item>
              <Carousel.Item><Shirt key="shirt_4" id="shirt_4" /></Carousel.Item>
            </Carousel>
            <div className="submit__div container">
              <Button
                  className="submit__button"
                  type="submit"
                  id="submit-button"
                  size="lg"
                  block
              >
                Send
              </Button>
            </div>
          </Form>
        </React.Fragment>
    );
  }
}

class Shirt extends React.Component {
  constructor(props) {
    super(props);

    this.colorPickers = [];

    for( let position in positions ) {
      let colorpicker_id = this.props.id + "_" + position;
      this.colorPickers.push( <ColorInput
          className="led-button"
          title={positions[position].name}
          style={{
            top: (positions[position].y * 100) + "%",
            left: (positions[position].x * 100) + "%"
          }}
          defaultValue={positions[position].value}
          id={colorpicker_id}
          key={colorpicker_id}
      ></ColorInput> );
    }
  }

  render() {
    return (
        <div
            className="shirt"
            id={this.props.id}
            style={backgroundImage}
            ref={this.shirt}
        >
          {this.colorPickers}
        </div> );
  }
}

class ColorInput extends React.Component {
  render() {
    return <Form.Control
        type="color"
        className={this.props.className}
        title={this.props.title}
        style={this.props.style}
        defaultValue={this.props.defaultValue}
        id={this.props.id}
        onChange={watchColorPicker}
        onInput={saveValue("ledColor", this.value)}
    />;
  }
}

export default Main;
