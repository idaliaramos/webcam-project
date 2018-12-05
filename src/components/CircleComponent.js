import React from "react";
import webCam from "../webcam.js";
const CircleComponent = props => {
  // let webcam = webCam();

  //gets called on mouseDown, then proceeds to move around image
  const handleMouseDown = e => {
    e.target.addEventListener("mousemove", handleMoving);
  };
  //gets coordinates and resets the coordinates on user input, calls move function
  const handleMoving = e => {
    let mouseX = e.clientX;
    let mouseY = e.clientY;
    //using get bounding client to avoid with issues with nesting
    let rect = e.target.getBoundingClientRect();
    let newOriginX = rect.x + rect.width / 2;
    let newOriginY = rect.y + rect.height / 2;
    let xdistance = mouseX - newOriginX;
    let ydistance = (mouseY - newOriginY) * -1;
    //call webcam move with coordinates
    props.webcam.move(xdistance, ydistance);
  };
  //removes mousemove functionality to reset
  const handleRelease = e => {
    e.target.removeEventListener("mousemove", handleMoving);
  };
  return (
    <div id="circle" onMouseDown={handleMouseDown} onMouseUp={handleRelease} />
  );
};
export default CircleComponent;
