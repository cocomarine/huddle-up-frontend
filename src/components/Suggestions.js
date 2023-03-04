import React, { useEffect, useState } from "react";
// import axios from "axios";

// const Suggestions = (Suggestions) => {
//   // const [suggestions, setSuggestions] = useState([]);

//   const getSuggestions = (EventID) => {
//     axios
//       .get(`http://localhost:4000/events/${EventID}`)
//       .then((res) => {
//         return res.data.Suggestions;
//       })
//   };

//   const suggestions = getSuggestions(id);

//   // useEffect(() => {
//   //   axios
//   //     .get(`http://localhost:4000/events/${id}`)
//   //     .then((res) => {
//   //       setSuggestions(res.data.Suggestions);
//   //       console.log(suggestions)
//   //     })
//   // }, []);

//   return (
//     <div>
//       {Suggestions && Suggestions.map((sug) => {
//         <div className="suggestions__item" key={sug.id}>
//           {sug.suggestion}
//         </div>
//       })}
//     </div>
//   )
// }

// export default Suggestions;