import React from "react";
//returns and image component from the webcam
const ImageComponent = props => {
  let image = props.webcam.getCameraNode();
  return image;
};
export default ImageComponent;
