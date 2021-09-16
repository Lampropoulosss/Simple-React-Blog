const keys = require("../config/keys");
const { EncryptJWT } = require("jose/jwt/encrypt");
const { jwtDecrypt } = require("jose/jwt/decrypt");
const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const connection = require("../sql/connection");

const createToken = async (email) => {
  const secretKey = await crypto.createSecretKey(
    Buffer.from(keys.jwt.secretKey, "hex")
  );

  return await new EncryptJWT({ email })
    .setProtectedHeader({ alg: "dir", enc: "A256GCM" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .encrypt(secretKey);
};

const decryptToken = async (token) => {
  const secretKey = await crypto.createSecretKey(
    Buffer.from(keys.jwt.secretKey, "hex")
  );

  const { payload } = await jwtDecrypt(token, secretKey);
  return payload;
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

const requireAdmin = async (req, res, next) => {
  if (!req.cookies.webToken) {
    return res.status(400).json({
      error: "You must be logged in",
    });
  }
  const secretKey = crypto.createSecretKey(
    Buffer.from(keys.jwt.secretKey, "hex")
  );
  const { payload } = await jwtDecrypt(req.cookies.webToken, secretKey);
  connection.query(
    `SELECT role FROM users WHERE email = "${payload.email.email}" LIMIT 1`,
    (err, data) => {
      if (err) throw err;
      if (data.length < 1) {
        return res.status(400).json({
          error: "Please log out and log in again",
        });
      }
      if (data[0].role === "admin") return next();
      return res.status(400).json({
        error: "You must have administrator privileges to post / delete blogs",
      });
    }
  );
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

  try {
    await jwtDecrypt(token, secretKey);
    return next();
  } catch (err) {
    if (err.code === "ERR_JWT_EXPIRED" || err.code === "ERR_JWE_INVALID") {
      return res.redirect("/login");
    }
    console.log(err);
  }
};

const requireNoAuth = (req, res, next) => {
  if (!req.cookies.webToken) {
    return next();
  }

  return res.status(400).json({
    error: "You must log out first",
  });
};

module.exports = {
  createToken,
  decryptToken,
  createID,
  hash,
  compareHash,
  requireAuth,
  requireNoAuth,
  requireAdmin,
};
