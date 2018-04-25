//Takes a string of coma separated values and returns it in the form of an address
export default function parseAddress(str) {
  let { name, address, city, state, country } = str.split(',')
  return {
    name,
    address,
    city,
    state,
    country
  };
}
