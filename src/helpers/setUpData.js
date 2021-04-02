// helpers function to get information needed from the NASA api
import actualOrbit from "./actualOrbit";

export default function setUpData(data) {
  const array = [];
  data.forEach((item) => {
    array.push({
      name: item.name,
      min: item.estimated_diameter.kilometers.estimated_diameter_min,
      max: item.estimated_diameter.kilometers.estimated_diameter_max,
      orbiting_body: actualOrbit(item.close_approach_data),
    });
  });
  return array;
}
