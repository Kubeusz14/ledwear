import React, { Component } from 'react';
import Figure from 'react-bootstrap/Figure';
import shirt from '../assets/images/shirt.jpg';
import './main.scss';

class Main extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="container-fluid">
            <Figure className="shirt__figure">
            <Figure.Image className="shirt__image" alt="LED WEAR" src={shirt} fluid/></Figure>
            </div>
      </React.Fragment>
    );
  }
}

export default Main;
