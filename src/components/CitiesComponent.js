import React from "react";

const CitiesComponent = props => {
  //changes cities on click
  const changeCity = event => {
    props.webcam.setSource(event.target.id);
  };
  return props.cities.map(city => (
    <button className="btn" id={city.source} onClick={changeCity}>
      {city.name}
    </button>
  ));
};
export default CitiesComponent;
