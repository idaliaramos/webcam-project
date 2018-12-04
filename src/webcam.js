/*
 * WebCam Simulator
 *
 *
 *
 * */
    /**
     *
     * WebCam
     * @constructor
     */

import React from 'react'
function webcam() {
        let container = {
          width: 600,
          height: 400,
          position: "relative",
          overflow: "hidden",
        };
        let cameraViewStyle ={
          position: 'absolute',
          left: 0,
          top: 0,
          width: 'auto'
        }
        let webCamContainer = React.createElement(
  "div", {
    style: container
  },

  React.createElement("img", {style: cameraViewStyle, id: "cameraView",  src: "http://runningios.com/screamingbox/new-york.jpg" })
);

        /**
         *
         * Internal state storage
         * @constructor
         */
        var CameraStorage = function() {
            var State = {
                x: 0,
                y: 0
            };

            return {
                getY: function() {
                    return State.y;
                },

                setY: function(value) {
                    var cameraImage = document.getElementById("cameraView");
                    State.y = value;
                    cameraImage.style.top = (value + "px");
                },

                getX: function() {
                    return State.x;
                },

                setX: function(value) {
                    var cameraImage = document.getElementById("cameraView");
                    State.x = value;
                    cameraImage.style.left = (value + "px");
                },

                useCamera: function(url) {
                   let cameraView = document.getElementById("cameraView")
                    cameraView.src = url;
                },

                isAllowedY: function(y) {
                    return ((-400 < y) && (y <= 0));
                },

                isAllowedX: function (x) {
                    return ((-800 < x) && (x <= 0));
                }


            }
        };


        var cameraStorage = new CameraStorage();


        return {
            /* Move method allow you to change position of camera view
             *
             * @param {string} x - axis X coordinates
             * @param {string} y - axis Y coordinates
             *
             */
            move: function(x, y) {
                var currentY = cameraStorage.getY();
                var nextY = parseInt(currentY + y);

                if(cameraStorage.isAllowedY(nextY)) {
                    cameraStorage.setY(nextY);
                }else {
                    console.log("not allowed");
                }

                var currentX = cameraStorage.getX();
                var nextX = parseInt(currentX - x);

                if(cameraStorage.isAllowedX(nextX)) {
                    cameraStorage.setX(nextX);
                }else {
                    console.log("not allowed");
                }
            },

            /* Set source image for WebCam
             *
             * @param {object} source - representation of camera
             *
             */
            setSource: function(source) {
                cameraStorage.useCamera(source);
            },


            /* Get the camera view DOM node
             *
             * return camera view DOM node
             *
             */
            getCameraNode: function() {
                return webCamContainer;
            }
        };
    };
    export default webcam
