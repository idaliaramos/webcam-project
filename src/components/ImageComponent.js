import React from "react";
const ImageComponent = props => {
  let image = props.webcam.getCameraNode();
  return image;
};
export default ImageComponent;
