import React, { Component } from "react";
import "./App.css";
import webcam from "./webcam.js";

class App extends Component {
  state = {
    webcam: webcam(),
    cities: [],
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
  //gets called on mouseDown, then proceeds to move around image
  handleMouseDown = e => {
    e.target.addEventListener("mousemove", this.handleMoving);
  };
  //gets coordinates and resets the coordinates on user input, calls move function
  handleMoving = e => {
    let mouseX = e.clientX;
    let mouseY = e.clientY;
    //using get bounding client to avoid with issues with nesting
    let rect = e.target.getBoundingClientRect();
    let newOriginX = rect.x + rect.width / 2;
    let newOriginY = rect.y + rect.height / 2;
    let xdistance = mouseX - newOriginX;
    let ydistance = (mouseY - newOriginY) * -1;
    //call webcam move with coordinates
    this.state.webcam.move(xdistance, ydistance);
  };
  //removes mousemove functionality to reset
  handleRelease = e => {
    e.target.removeEventListener("mousemove", this.handleMoving);
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
            {this.state.showCities
              ? this.state.cities.map(city => (
                  <button
                    className="btn"
                    id={city.source}
                    onClick={this.changeCity}
                  >
                    {city.name}
                  </button>
                ))
              : null}
            {/* show circle on click of the control button */}
            {this.state.showControl ? (
              <div className="circle-wrapper">
                <div
                  id="circle"
                  onMouseDown={this.handleMouseDown}
                  onMouseUp={this.handleRelease}
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
