import React, { Component } from "react";
import "./main.scss";
import Background from "../assets/images/shirt.png";

let backgroundImage = {
    backgroundImage: `url(${Background})`
};

const positions = [
  {
    name: "Cuff: Left",
    x: 0.23,
    y: 0.8
  },
  {
    name: "Sleeve: Left",
    x: 0.25,
    y: 0.5
  },
  {
    name: "Armhole: Left",
    x: 0.3,
    y: 0.2
  },
  {
    name: "Collar: Left",
    x: 0.44,
    y: 0.1
  },
  {
    name: "Placket: Left",
    x: 0.4,
    y: 0.25
  },
  {
    name: "Body: Higher Left",
    x: 0.4,
    y: 0.4
  },
  {
    name: "Body: Lower Left",
    x: 0.4,
    y: 0.6
  },
  {
    name: "Body: Lower Right",
    x: 0.58,
    y: 0.6
  },
  {
    name: "Body: Higher Right",
    x: 0.58,
    y: 0.4
  },
  {
    name: "Placket: Right",
    x: 0.58,
    y: 0.25
  },
  {
    name: "Collar: Right",
    x: 0.54,
    y: 0.1
  },
  {
    name: "Armhole: Right",
    x: 0.68,
    y: 0.2
  },
  {
    name: "Sleeve: Right",
    x: 0.72,
    y: 0.5
  },
  {
    name: "Cuff: Right",
    x: 0.75,
    y: 0.8
  }
];


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
  constructor(props) {
    super(props);
    this.shirt = React.createRef();
    this.init = this.init.bind(this);
  }

  init() {
    let shirt = document.getElementById("shirt");
    let colorPickers = positions.map(position => {
      console.log(position);
      let colorPicker = document.createElement("input");
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

  render() {
    return (
      <React.Fragment>
        <div className="shirt__figure" id="shirt" style={ backgroundImage } ref={this.init} />
      </React.Fragment>

    );
  }
}

export default Main;


