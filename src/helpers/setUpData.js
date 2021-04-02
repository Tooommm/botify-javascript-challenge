// helpers function to get information needed from the NASA api

export default function setUpData(data) {
  const array = [];
  data.forEach((item) => {
    array.push({
      name: item.name,
      min: item.estimated_diameter.kilometers.estimated_diameter_min,
      max: item.estimated_diameter.kilometers.estimated_diameter_max,
    });
  });
  return array;
}
