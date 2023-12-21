const jwt = require("jsonwebtoken");
const { z } = require("zod");

const jwtPassword = "secret";

// Zod validation schema for JWT input
const jwtInputSchema = z.object({
  username: z.string().email(),
  password: z.string().min(6),
});

function signJwt(username, password) {
  try {
    const input = jwtInputSchema.parse({ username, password });
    return jwt.sign({ username: input.username }, jwtPassword);
  } catch (error) {
    return null;
  }
}

function verifyJwt(token) {
  try {
    jwt.verify(token, jwtPassword);
    return true;
  } catch (error) {
    return false;
  }
}

function decodeJwt(token) {
  try {
    jwt.verify(token);
    return true;
  } catch (error) {
    return false;
  }
}

module.exports = {
  signJwt,
  verifyJwt,
  decodeJwt,
  jwtPassword,
};
