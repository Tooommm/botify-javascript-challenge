// helpers function to find out which planet the NEO is orbiting
// Based on the date closest to the current date
// Return the planet name

export default function actualOrbit(neo) {
  //define the actual date
  const date = new Date();
  // get all the orbit epoch_date of th neos
  const orbitsList = neo.map((orbit) => orbit.epoch_date_close_approach);
  // get the closest value to actual date in obitLists
  const closest = orbitsList.reduce((a, b) => {
    return Math.abs(b - date.getTime()) < Math.abs(a - date.getTime()) ? b : a;
  });
  // Find the planet around which the neo orbits
  const actualOrbitingPlanet = neo.find(
    (orbit) => orbit.epoch_date_close_approach === closest
  );

  return actualOrbitingPlanet.orbiting_body;
}
