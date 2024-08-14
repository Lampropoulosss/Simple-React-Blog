const connection = require("../sql/connection");
const keys = require("../config/keys");
const request = require("request");
const {
  createToken,
  createID,
  hash,
  compareHash,
} = require("../other/utilities");

// Vars
const maxAge = 7 * 24 * 60 * 60;

const postLogin = (req, res) => {
  // Recaptcha Validation
  // if (
  //   req.body.captcha === undefined ||
  //   req.body.captcha === "" ||
  //   req.body.captcha === null
  // ) {
  //   return res
  //     .status(400)
  //     .json({ success: false, error: "Please select ReCaptcha" });
  // }

  // Verify URL
  // const verifyURL = `https://google.com/recaptcha/api/siteverify?secret=${keys.captcha.secretKey}&response=${req.body.captcha}&remoteip=${req.connection.remoteAddress}`;

  // Make request to VerifyURL
  // request(verifyURL, async (err, response, body) => {
  //   body = JSON.parse(body);
  //   // If not successful
  //   if (body.success !== undefined && !body.success) {
  //     return res
  //       .status(400)
  //       .json({ success: false, error: "Failed ReCaptcha Verification" });
  //   }
  // });

  const { email, password } = req.body.user;

  // Validation
  if (!email || !password) {
    return res.status(400).json({ error: "Please fill all the fields" });
  }

  if (
    !email.match(
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    )
  ) {
    return res.status(400).json({ error: "Enter a valid email address" });
  }

  if (
    email.includes("=") ||
    email.includes(" ") ||
    password.includes("=") ||
    password.includes(" ")
  ) {
    return res
      .status(400)
      .json({ error: "Spaces and the equal symbol are not allowed" });
  }

  // Validation passed
  connection.query(
    `SELECT * FROM users WHERE email = "${email}" LIMIT 1`,
    async (err, data) => {
      if (err) throw err;

      if (data.length < 1) {
        return res.status(400).json({ error: "Email is not registered" });
      }

      if (await compareHash(password, data[0].password)) {
        const token = await createToken({ email: data[0].email });
        return res.status(201).json({ token });
      }

      return res.status(400).json({ error: "Password is incorrect" });
    }
  );
};

const postRegister = async (req, res) => {
  // Recaptcha Validation
  // if (
  //   req.body.captcha === undefined ||
  //   req.body.captcha === "" ||
  //   req.body.captcha === null
  // ) {
  //   return res
  //     .status(400)
  //     .json({ success: false, error: "Please select ReCaptcha" });
  // }

  // Verify URL
  // const verifyURL = `https://google.com/recaptcha/api/siteverify?secret=${keys.captcha.secretKey}&response=${req.body.captcha}&remoteip=${req.connection.remoteAddress}`;

  // Make request to VerifyURL
  // request(verifyURL, async (err, response, body) => {
  //   body = JSON.parse(body);
  //   // If not successful
  //   if (body.success !== undefined && !body.success) {
  //     return res
  //       .status(400)
  //       .json({ success: false, error: "Failed ReCaptcha Verification" });
  //   }

  //   // If successful
  // });

  const { email, firstName, lastName, password1, password2 } = req.body.user;

  // Validation
  if (!email || !firstName || !lastName || !password1 || !password2) {
    return res.status(400).json({ error: "Please fill all the fields" });
  }

  if (
    !email.match(
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    )
  ) {
    return res.status(400).json({ error: "Enter a valid email address" });
  }
  if (password1 !== password2) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  if (password1.length < 8) {
    return res
      .status(400)
      .json({ error: "Passwords must be at least 8 characters long" });
  }

  if (
    email.includes("=") ||
    email.includes(" ") ||
    password1.includes("=") ||
    password1.includes(" ")
  ) {
    return res
      .status(400)
      .json({ error: "Spaces and the equal symbol are not allowed" });
  }

  // Validation Passed
  const user = {
    id: createID(),
    email,
    firstName,
    lastName,
    password: await hash(password1),
    role: "user",
  };
  connection.query("INSERT INTO users SET ?", user, async (error, result) => {
    if (error) {
      if (error.code === "ER_DUP_ENTRY") {
        return res.status(400).json({ error: "Email already exists" });
      }
    }
    const token = await createToken({ email });
    res.status(201).json({ token });
  });

  // Captcha successful
};

module.exports = {
  postLogin,
  postRegister,
};
