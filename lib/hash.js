const { createHash } = require("crypto");

/**
 * @description Calculates the SHA256 value of either a string or text value
 * @param {string} input The input value to be hashed using the SHA256 algorithm
 * @param {boolean} isHexValue Flag that tells the function if it is a hex value or a text string
 * @returns {string} the hex value of the input
 *
 * @author Teddy Kalp
 */
function SHA256(input, isHexValue = false) {
  if (isHexValue) {
    const hexValue = hexToString(input);
    if (hexValue) {
      console.log(createHash("sha256").update(hexValue).digest("hex"));
      return createHash("sha256").update(hexValue).digest("hex");
    } else {
      return "Not a Valid Hex Number";
    }
  } else {
    return createHash("sha256").update(input).digest("hex");
  }
}

/**
 * @description converts a hex value to a buffer int array
 * @param {string} hex the string representation of the hex valut
 * @returns {int []} byte array representing the hex value
 *
 * @author Teddy Kalp
 */
function hexToString(hex) {
  if (!hex.match(/^[0-9a-fA-F]+$/)) {
    return null;
  }
  if (hex.length % 2 !== 0) {
    hex = "0" + hex;
  }
  var bytes = [];
  for (var n = 0; n < hex.length; n += 2) {
    var code = parseInt(hex.substr(n, 2), 16);
    bytes.push(code);
  }
  return bytes;
}

exports.SHA256 = SHA256;
