import {
  faUtensils,
  faMugSaucer,
  faMartiniGlassCitrus,
  faMountainSun,
  faTicket,
  faChildReaching,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

const categoryIcons = {
  restaurant: faUtensils,
  "coffee-tea": faMugSaucer,
  drinks: faMartiniGlassCitrus,
  outdoor: faMountainSun,
  "cinema-show": faTicket,
  playdate: faChildReaching,
  other: faUsers,
};

export const getCategoryIcon = (category) => {
  return categoryIcons[category] || faUsers;
}
