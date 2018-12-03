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

  render() {
    let image = this.state.webcam.getCameraNode()
    return (
      <div className="App">
        {image}
  {/* create a button for each of the camera locations */}
  {this.state.cities.map(city => <button className='btn' id={city.source} onClick={this.changeCity} >{city.name} </button>)}
<div className='circle-wrapper'>
  <div  id="circle" onMouseMove={this.onhover} onMouseOut={this.clearCoor}/>
</div>
      </div>
    );
  }
}

export default App;
