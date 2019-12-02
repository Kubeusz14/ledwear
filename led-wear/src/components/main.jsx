import React, { Component } from "react";
import "./main.scss";
import Background from "../assets/images/shirt.png";

let backgroundImage = {
    backgroundImage: `url(${Background})`
};

const positions = [
  {
    name: "Cuff: Left",
    x: 0.1,
    y: 0.8
  },
  {
    name: "Sleeve: Left",
    x: 0.1,
    y: 0.5
  },
  {
    name: "Armhole: Left",
    x: 0.2,
    y: 0.3
  },
  {
    name: "Collar: Left",
    x: 0.4,
    y: 0.3
  },
  {
    name: "Placket: Left",
    x: 0.4,
    y: 0.4
  },
  {
    name: "Body: Higher Left",
    x: 0.4,
    y: 0.6
  },
  {
    name: "Body: Lower Left",
    x: 0.4,
    y: 0.8
  },
  {
    name: "Body: Lower Right",
    x: 0.6,
    y: 0.8
  },
  {
    name: "Body: Higher Right",
    x: 0.6,
    y: 0.6
  },
  {
    name: "Placket: Right",
    x: 0.6,
    y: 0.4
  },
  {
    name: "Collar: Right",
    x: 0.6,
    y: 0.3
  },
  {
    name: "Armhole: Right",
    x: 0.8,
    y: 0.3
  },
  {
    name: "Sleeve: Right",
    x: 0.9,
    y: 0.5
  },
  {
    name: "Cuff: Right",
    x: 0.9,
    y: 0.8
  }
];

function init() {
  const shirt = document.getElementById("shirt");
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

/*function init() {
  const shirt = document.getElementById("shirt");
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
}*/

class Main extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="shirt__figure" id="shirt" style={ backgroundImage }></div>
      </React.Fragment>
    );
  }
}

export default Main;

//init();
