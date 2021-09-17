const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();
const port = process.env.port || 8000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    // origin: ["http://localhost:3000", "http://localhost:5000"],
    origin: "https://lampropoulos.me",
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
  })
);

// Routes
app.use("/api", require("./routes/apiRoutes"));
app.use("/auth", require("./routes/authRoutes"));
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

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
