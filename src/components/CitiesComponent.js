import React from "react";

const CitiesComponent = props => {
  return props.cities.map(city => (
    <button className="btn" id={city.source} onClick={props.changeCity}>
      {city.name}
    </button>
  ));
};
export default CitiesComponent;
