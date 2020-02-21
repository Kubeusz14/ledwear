import React, { Component } from "react";
import Main from "./views/main";
import Footer from "./components/footer";
import { Row, Col } from "react-bootstrap";
import "./App.scss";

class App extends Component {
  render() {
    return (
      <React.Fragment>
            <header>
              <Row>
                <Col className="header title">
                  <h1>LED Wear</h1>
                </Col>
              </Row>
            </header>
            <main>
              <Main />
            </main>
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
