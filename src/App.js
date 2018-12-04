import React, { Component } from 'react';
import './App.css';
import webcam from './webcam.js'

class App extends Component {
  state={
  webcam: webcam(),
  cities: []
}
componentDidMount(){
  return fetch('http://runningios.com/screamingbox/cameras.json')
  .then(response=> response.json()).then(data=> this.setState({cities:data})
)
}
//on click of the button will change the location
changeCity =(event)=> {
  this.state.webcam.setSource(event.target.id)
}
handleMove=(e)=>{
  e.target.addEventListener('mousemove', this.handleMoving);
}
handleMoving=(e)=>{
  let mouseX = e.clientX;
  let mouseY = e.clientY;
  //using get bounding client to avoid with issues with nesting
  let rect = e.target.getBoundingClientRect()
  let newOriginX= rect.x + rect.width/2
  let newOriginY= rect.y + rect.height/2
  let xdistance = mouseX - newOriginX
  let ydistance = (mouseY - newOriginY )
  //call webcam move with coordinates
  this.state.webcam.move(xdistance, ydistance)
    e.target.addEventListener('mouseout', this.mouseOut);
}
mouseOut=(e)=>{
  console.log('hello')
}
  render() {
    let image = this.state.webcam.getCameraNode()
    return (
      <div className="App">
        {image}
  {/* create a button for each of the camera locations */}
  {this.state.cities.map(city => <button className='btn' id={city.source} onClick={this.changeCity} >{city.name} </button>)}
<div className='circle-wrapper'>
  <div id="circle" onMouseDown={this.handleMove}/>
</div>
      </div>
    );
  }
}

export default App;
