// helpers function to get averagre value from an array of numbers

export default function average(array) {
  let sum = 0;
  for (const num of array) {
    sum += num;
  }
  return sum / array.length;
}
