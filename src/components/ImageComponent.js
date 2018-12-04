import React from "react";
import webCam from "../webcam.js";
const ImageComponent = props => {
  let webcam = webCam();
  let image = this.state.webcam.getCameraNode();
  return { image };
};
export default ImageComponent;
