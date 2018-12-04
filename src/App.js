import React, { Component } from "react";
import "./App.css";
import webcam from "./webcam.js";
import CitiesComponent from "./components/CitiesComponent";
import CircleComponent from "./components/CircleComponent";
class App extends Component {
  state = {
    webcam: webcam(),
    // cities: [],
    showCities: false,
    showControl: false
  };
  componentDidMount() {
    return fetch("http://runningios.com/screamingbox/cameras.json")
      .then(response => response.json())
      .then(data => this.setState({ cities: data }));
  }
  showCities = () => {
    !this.state.showCities
      ? this.setState({ showControl: false })
      : this.setState({ showControl: this.state.showControl });
    this.setState({ showCities: !this.state.showCities });
    // this.setState({showControl:!this.state.showControl})
  };
  showControl = () => {
    !this.state.showControl
      ? this.setState({ showCities: false })
      : this.setState({ showCities: this.state.showCities });
    this.setState({ showControl: !this.state.showControl });
  };
  //on click of the button will change the location
  changeCity = event => {
    this.state.webcam.setSource(event.target.id);
  };

  render() {
    let image = this.state.webcam.getCameraNode();
    return (
      <div className="App">
        <div className="container">
          <div className="image-wrapper">{image}</div>
          {/*  tabbing navigation */}
          <div className="tabs">
            <button className="btn" onClick={this.showCities}>
              Cameras
            </button>
            <button className="btn" onClick={this.showControl}>
              Control
            </button>
          </div>
          {/* create a button for each of the camera locations */}
          <div className="button-wrapper">
            {this.state.showCities ? (
              <CitiesComponent
                cities={this.state.cities}
                changeCity={this.changeCity}
              />
            ) : null}
            {/* show circle on click of the control button */}
            {this.state.showControl ? (
              <div className="circle-wrapper">
                <CircleComponent />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
