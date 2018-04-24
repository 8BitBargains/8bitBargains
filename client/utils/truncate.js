
// util function that takes in a string and a desired length,
export default function (str, numWords = 30) {
  let strArray = str.split(' ');

  // truncate our string array to length specified
  let result = strArray.slice(0, numWords);

  // convert back to string and append an ellipsis, only if our string was actually truncated
  result = result.join(' ');
  if (numWords < strArray.length) result += ' ...';

  return result;
}
