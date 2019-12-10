import React, { Component } from "react";
import "./main.scss";
import Background from "../assets/images/shirt.png";
import Form from "react-bootstrap/Form";
import Animations from "../components/animations";
import { Button } from "react-bootstrap";
import { setValue } from "../services/data";

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

const inputs = document.querySelectorAll('input');
const submitButton = document.getElementById('submit-button');
const settingsButton = document.getElementById('settings-button');


export function saveValue(key,value) {
    setValue(key, value);
}

function send(){
    console.log('Start Send Call');
    disableForm();

    console.log('End Send Call');
}

function disableForm(){
    submitButton.disabled = true;
    settingsButton.disabled = true;
    inputs.forEach(function(input) {
        input.disabled = true;
    });
}

function enableForm(){
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
    this.shirt = React.createRef();
    this.init = this.init.bind(this);
  }

  init() {
    //enableForm();
    let shirt = document.getElementById("shirt");
    saveValue('ledColor', inputs.value);
    let colorPickers = positions.map(position => {
      console.log(position);
      let colorPicker = document.createElement("input");
      colorPicker.type = "color";
      colorPicker.addEventListener("change", watchColorPicker, false);
      // ...
      colorPicker.style.left = position.x * 100 + "%";
      colorPicker.style.top = `${position.y * 100}%`;
      colorPicker.name = `${position.name}`;
      colorPicker.title = `${position.name}`;
      colorPicker.value = `${position.value}`;
      shirt.appendChild(colorPicker);
      return colorPicker;
    });
    
    console.log("COLOR PICKERS:", colorPickers);
  }

  render() {
    return (
      <React.Fragment>
        <Form className="mainForm">

          <Animations />

          <div id="shirt" style={backgroundImage} ref={this.init}></div>

          <div className="submit__div container">
            <Button className="submit__button" type="submit" id="submit-button" size="lg" block>
              Send
            </Button>
          </div>
        </Form>
      </React.Fragment>
    );
  }
}

export default Main;
