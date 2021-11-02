const express = require("express");
const ytdl = require("ytdl-core");
const path = require("path");
const cors = require("cors");

const app = express();
const port = process.env.port || 8000;

// Middleware
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use("/files", express.static(path.join(__dirname, "files")));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api", require("./routes/apiRoutes"));
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(port, () => {
  console.log(`Server started on port ${port}...`);
});
