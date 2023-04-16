import React, { useEffect } from 'react';
import "../../styles/locations.css";

const Locations = ({locations}) => {

  console.log(locations)

  return (
    <ul className="card__list">
      <li className="card__item">
        <span>{locations[0].label} : {locations[0].suggestion}, {locations[0].address}</span>
      </li>
      <li className="card__item">
        <span>item 2</span>
      </li>
    </ul>
  )
};

export default Locations;
