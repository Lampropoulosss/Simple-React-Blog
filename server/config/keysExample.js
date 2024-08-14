// Your keys.js file should look like this:
// Make sure to replace the data with your own credentials

module.exports = {
  sql: {
    host: "",
    user: "",
    password: "",
    port: 0000, // Replace 000 with your Database's Port
    database: "",
  },
  jwt: {
    secretKey: "", // Use crypto.randomBytes(32).toString('hex') to generate a secret key
  },
  captcha: {
    secretKey: "",
  },
};
