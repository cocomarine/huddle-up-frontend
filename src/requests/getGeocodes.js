const getGeocodes = (
  locationInputs,
  setMarkerList,
  setLocationList
) => {
  const geocoder = new window.google.maps.Geocoder();
  
  // defining function for reverse geocodeing
  const geocoderResult = (placeId) => {
    return new Promise((resolve, reject) => {
      geocoder
      .geocode({ placeId: placeId }, (results, status) => {
          if (status === window.google.maps.GeocoderStatus.OK) {
            return resolve({
              place_id: results[0].place_id,
              lat: results[0].geometry.location.lat(),
              lng: results[0].geometry.location.lng(),
              address: results[0].formatted_address,
            })
          } else {
            reject(new Error("No results found"));
          }
        });
    });
  };
  
  const placeList = locationInputs?.map(({place_id, suggestion}) => ({place_id, suggestion}));

  const geocoderList= Promise.all(placeList.map(({place_id}) => geocoderResult(place_id).then(res => res)));

  geocoderList
    .then((res => {
      // map method on response with callback functions for selcting properties and adding label property
      const markerList = res.map(({lat, lng}, index) => ({lat, lng, label: (index + 1).toString()}));
      
      let tempList = res.map(({address, place_id}, index) => ({address, place_id, label: (index + 1).toString()}));
      
      // To each tempList object element, add matching suggestion from placeList.
      // First compare placeList place_id with tempList place_id.
      // If they match, add the suggestion of matching object to the matching placeList object.
      // <-- also can just merge placeList and tempList to make locationList
      // Using map and Object.assign()
      const locationList = tempList.map((item, i) => 
        Object.assign({}, item, placeList[i])
      );
      
      setMarkerList(markerList);
      setLocationList(locationList);
    }))
    .catch((error) => {
      console.error("Not valid", error)
    });
  };

export default getGeocodes;