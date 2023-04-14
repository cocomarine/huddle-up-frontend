import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import "../../styles/place-input.css"

const PlaceInput = ({ setNewSuggestion }) => {
  const autoCompleteRef = useRef();
  const inputRef = useRef();

  const options = {
    componentRestrictions: { country: "uk" },
    fields: ["adr_address", "name", "place_id"],
    types: ["establishment", "geocode"]
  };

  useEffect(() => {
    autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      options
    );

    autoCompleteRef.current.addListener("place_changed", async function () {
      const place = await autoCompleteRef.current.getPlace();

      setNewSuggestion({
        place_id: place.place_id,
        place_name: place.name,
      });
    });
  }, []);

  return (
    <div className="place-input-container">
      <input 
        className="suggestion__input"
        ref={inputRef} 
      />
    </div>
  );
};

PlaceInput.propTypes = {
  setNewSuggestion: PropTypes.func,
};

export default PlaceInput;