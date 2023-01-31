const { createHash } = require("crypto");

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
