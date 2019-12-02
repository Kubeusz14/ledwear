import React, { Component } from "react";
import Main from "./components/main";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NavTab } from "react-router-tabs";
import Settings from "./components/settings";
import { Row, Col } from "react-bootstrap";
import "./App.scss";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Router>
          <div>
            <header>
              <Row>
                <Col>
                  <NavTab to="/main">Post</NavTab>
                  <NavTab to="/animation">Animation</NavTab>
                </Col>
                <Col>
                  <h1>LED Wear</h1>
                </Col>
                <Col>
                  <Settings />
                </Col>
              </Row>
            </header>
            <main>
              <Switch>
                <Route path="/main" component={Main} />
                <Route path="/animation" component={Settings} />
              </Switch>
            </main>
          </div>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
