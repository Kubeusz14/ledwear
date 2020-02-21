import React, { Component } from "react";
import "./main.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Background from "../assets/images/shirt.png";
import Form from "react-bootstrap/Form";
import Animations from "../components/animations";
import { Button } from "react-bootstrap";
import Slider from "react-slick";

let backgroundImage = {
  backgroundImage: `url(${Background})`
};

const positions = [
  {
    name: "Cuff: Right",
    left: 0.15,
    top: 0.85,
    value: "#009900"
  },
  {
    name: "Sleeve: Right",
    left: 0.18,
    top: 0.5,
    value: "#990099"
  },
  {
    name: "Armhole: Right",
    left: 0.25,
    top: 0.2,
    value: "#909090"
  },
  {
    name: "Collar: Right",
    left: 0.41,
    top: 0.08,
    value: "#099999"
  },
  {
    name: "Placket: Right",
    left: 0.37,
    top: 0.25,
    value: "#999000"
  },
  {
    name: "Bodtop: Higher Right",
    left: 0.39,
    top: 0.4,
    value: "#000999"
  },
  {
    name: "Bodtop: Lower Right",
    left: 0.38,
    top: 0.7,
    value: "#900000"
  },
  {
    name: "Bodtop: Lower Left",
    right: 0.38,
    top: 0.7,
    value: "#000099"
  },
  {
    name: "Bodtop: Higher Left",
    right: 0.39,
    top: 0.4,
    value: "#990090"
  },
  {
    name: "Placket: Left",
    right: 0.37,
    top: 0.25,
    value: "#009900"
  },
  {
    name: "Collar: Left",
    right: 0.41,
    top: 0.08,
    value: "#090999"
  },
  {
    name: "Armhole: Left",
    right: 0.25,
    top: 0.2,
    value: "#990909"
  },
  {
    name: "Sleeve: Left",
    right: 0.18,
    top: 0.5,
    value: "#999990"
  },
  {
    name: "Cuff: Left",
    right: 0.15,
    top: 0.85,
    value: "#990009"
  }
];

function saveValue(key, value) {
  // setValue(key, value);
}

function watchColorPicker(event) {
  if( document.getElementById('checkSameColor').checked ) {
    let shirt_index = event.target.id.split('_')[1];
    let shirtInputs = document.getElementById('shirt_'+shirt_index).querySelectorAll('input');
    for(let shirtInput of shirtInputs) {
      console.log(shirtInput);
      shirtInput.value = event.target.value;
    }
  }
  console.log(event.target);
}

class Main extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    let ledColorString = '';
    let inputs = document.getElementById("main-form").querySelectorAll('input[type=color]');

    for(let input of inputs) {
      let currentLedString = input.value.substring(1);
      console.log(input.id);
      ledColorString += currentLedString;
    }

    if( ledColorString.length < 85 ) {
      for( let i = 0; i < 2; i++ ) {
        ledColorString += ledColorString;
      }
    }

    let blinkingSpeed = document.getElementById('inputSpeed').value;

    let brigthness = document.getElementById('formBrightnessRange').value;

    const data = new FormData(event.target);
    const xhr1 = new XMLHttpRequest();
    const xhr2 = new XMLHttpRequest();
    const xhr3 = new XMLHttpRequest();

    let mainCommand = 'http://192.168.4.1/cc?';

    let command = '';

    command = mainCommand+'pixels='+ledColorString;
    xhr1.open( 'GET', command, true);
    xhr1.send();

    command = mainCommand+'speed='+blinkingSpeed;
    xhr2.open( 'GET', command, true);
    xhr2.send();

    command = mainCommand+'brightness='+brigthness;
    xhr3.open( 'GET', command, true);
    xhr3.send();
  }

  render() {
    return (
        <React.Fragment>
          <Form className="mainForm" id="main-form" onSubmit={this.handleSubmit}>
            <Animations />
            <SimpleSlider />
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
            top: (positions[position].top * 100) + "%",
            left: typeof positions[position].left !== "undefined" ? ((positions[position].left * 100) + '%') : '',
            right: typeof positions[position].right !== "undefined" ? ((positions[position].right * 100) + '%') : ''      
          }}
          defaultValue={positions[position].value}
          id={colorpicker_id}
          key={colorpicker_id}
      /> );
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
        key={this.props.id}
        onInput={saveValue(this.props.id, this.value)}
    />;
  }
}

class SimpleSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slides: [0]
    };
    this.animatedSlide = this.animatedSlide.bind( this );
    this.staticSlide   = this.staticSlide.bind( this );
  }

  animatedSlide() {
    const { slides } = this.state;
    this.setState({
      slides: [0, 1, 2, 3]/*slides.concat(slides.length+1)*/
    });
  }
  staticSlide() {
    const { slides } = this.state;
    this.setState({
      slides: [0]/*(function(){slides.pop(); return slides;})()*/
    });
  }

  render() {
    let settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
        <div className="sliderButtons">
          <Button className="button" onClick={this.animatedSlide}>
              Animated Shirt
          </Button>
          <Button className="button" onClick={this.staticSlide}>
              Static Shirt
          </Button>
          <Slider {...settings}>
            {this.state.slides.map(function(slide){
              return (
                  <Shirt key={"shirt_" + slide} id={"shirt_" + slide} />
              )
            })}
          </Slider>
        </div>
    );
  }
}

export default Main;
