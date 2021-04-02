// helpers function to find out which planet the NEO is orbiting
// Based on the date closest to the current date
// Return the planet name

export default function actualOrbit(object) {
  const date = new Date();
  const orbit = object.map((item) => item.epoch_date_close_approach);
  const closest = orbit.reduce((a, b) => {
    return Math.abs(b - date.getTime()) < Math.abs(a - date.getTime()) ? b : a;
  });
  const found = object.find(
    (element) => element.epoch_date_close_approach === closest
  );

  return found.orbiting_body;
}
