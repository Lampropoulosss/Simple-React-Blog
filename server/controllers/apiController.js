const { v4: uuidv4 } = require("uuid");
const connection = require("../sql/connection");

// Get All Blogs
const getBlogs = (req, res) => {
  connection.query("SELECT * FROM blogs", (err, result) => {
    if (err) throw err;
    res.json(result);
  });
};

// Create a new blog
const postBlog = (req, res) => {
  const sql = "INSERT INTO blogs SET ?";
  const blog = {
    id: uuidv4(),
    title: req.body.title,
    body: req.body.body,
    author: req.body.author,
  };

  connection.query(sql, blog, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
};

const getBlog = (req, res) => {
  connection.query(
    `SELECT * FROM blogs WHERE id = "${req.params.id}" LIMIT 1`,
    (err, result) => {
      if (err) throw err;
      res.json(result);
    }
  );
};

const deleteBlog = (req, res) => {
  connection.query(
    `DELETE FROM blogs WHERE id = "${req.params.id}"`,
    (err, result) => {
      if (err) throw err;
      res.json(result);
    }
  );
};

module.exports = {
  getBlogs,
  postBlog,
  getBlog,
  deleteBlog,
};
