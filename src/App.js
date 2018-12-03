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


  render() {
    let image = this.state.webcam.getCameraNode()
    return (
      <div className="App">
        {image}
  {this.state.cities.map(city => <button id={city.source} onClick={this.changeCity} >{city.name} </button>)}
<div className='circle-wrapper'>
  <div id="circle" onMouseMove={this.onhover} onMouseOut={this.clearCoor}/>
</div>
      </div>
    );
  }
}

export default App;
