const { createHash } = require("crypto");

function SHA256(input) {
  return createHash("sha256").update(input).digest("hex");
}

exports.SHA256 = SHA256;
