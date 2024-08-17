const { getDataType, getGUID, getInRangeInteger } = require("./a2bei4-utils.js");
const { getZhLetter, getEnLetter, getRandomZhOrEnStr } = require("./a2bei4-other.js");

console.log(getDataType(null));
console.log(getGUID());
console.log(getInRangeInteger(0, 9));
console.log(getZhLetter());
console.log(getEnLetter());
console.log(getRandomZhOrEnStr(10));
