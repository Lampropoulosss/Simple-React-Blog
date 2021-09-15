const keys = require("../config/keys");
const { EncryptJWT } = require("jose/jwt/encrypt");
const { jwtDecrypt } = require("jose/jwt/decrypt");
const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

const createToken = async (id) => {
  const secretKey = await crypto.createSecretKey(
    Buffer.from(keys.jwt.secretKey, "hex")
  );

  return await new EncryptJWT({ id })
    .setProtectedHeader({ alg: "dir", enc: "A256GCM" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .encrypt(secretKey);
};

const createID = () => {
  return uuidv4();
};

const hash = async (password) => {
  const hash = await bcrypt.hash(password, 10);
  return hash;
};

const compareHash = async (password, hash) => {
  const result = await bcrypt.compare(password, hash);
  if (result) return true;
  return false;
};

const requireAuth = async (req, res, next) => {
  if (!req.cookies.webToken) {
    return res.status(400).json({
      error: "You must be logged in",
    });
  }
  const token = req.cookies.webToken;
  const secretKey = crypto.createSecretKey(
    Buffer.from(keys.jwt.secretKey, "hex")
  );

  // Check jwt existance & verified status

  if (token) {
    try {
      await jwtDecrypt(token, secretKey);
      next();
    } catch (err) {
      if (err.code === "ERR_JWT_EXPIRED" || err.code === "ERR_JWE_INVALID") {
        res.cookie("webToken", "", { maxAge: 1 });
        return res.redirect("/login");
      }
      console.log(err);
    }
  } else {
    return res.redirect("/login");
  }
};

module.exports = {
  createToken,
  createID,
  hash,
  compareHash,
  requireAuth,
};
