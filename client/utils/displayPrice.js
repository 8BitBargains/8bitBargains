
// takes in price as an integer and converts to a currency-formatted string as ($0.00)
export default function displayPrice(price) {
  const priceStr = price.toString();
  const priceArr = priceStr.split('');
  priceArr.splice(priceArr.length - 2, 0, '.'); // insert a '.' before last two chars
  let result = '$' + priceArr.join(''); // convert back to string and prepend $
  return result;
}
