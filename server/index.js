const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.port || 8000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: "*", methods: ["GET", "POST", "DELETE"] }));

// Routes
app.use("/api", require("./routes/apiRoutes"));

// SQL INJECTION EXAMPLE

// connection.query(
//   "SELECT * FROM blogs WHERE id =  105 OR 1 = 1",
//   (err, result) => {
//     if (err) throw err;
//     console.log(result);
//   }
// );

app.listen(port, () => {
  console.log(`Server started on port ${port}...`);
});
