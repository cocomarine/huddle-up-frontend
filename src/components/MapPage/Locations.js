import React from 'react';
import "../../styles/locations.css";

const Locations = ({locations}) => {

  console.log(locations)

  return (
    <ul className="card__list">
      {locations.map((item) => {
        return <li className="card__item" key={`${item.place_id}`}>
                {item.label} &nbsp;&#58;&nbsp; {item.suggestion} &#44;&nbsp; {item.address}
              </li>
      })}
    </ul>
  )
};

export default Locations;
