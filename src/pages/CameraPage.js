import React, { Component } from "react";

import webcam from "../webcam";
import CitiesComponent from "../components/CitiesComponent";
import CircleComponent from "../components/CircleComponent";
import ImageComponent from "../components/ImageComponent";

class CameraPage extends Component {
  state = {
    webcam: webcam(),
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
  };
  showControl = () => {
    !this.state.showControl
      ? this.setState({ showCities: false })
      : this.setState({ showCities: this.state.showCities });
    this.setState({ showControl: !this.state.showControl });
  };
  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="image-wrapper">
            <ImageComponent webcam={this.state.webcam} />
          </div>
          {/*  tabbing navigation */}
          <div>
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
                webcam={this.state.webcam}
                cities={this.state.cities}
                changeCity={this.changeCity}
              />
            ) : null}
            {/* show circle on click of the control button */}
            {this.state.showControl ? (
              <div className="circle-wrapper">
                <CircleComponent webcam={this.state.webcam} />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default CameraPage;
