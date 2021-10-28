const { v4: uuidv4 } = require("uuid");
const connection = require("../sql/connection");
const { decryptToken } = require("../other/utilities");

// Get All Blogs
const getBlogs = (req, res) => {
  connection.query(
    "SELECT id, title, author, creationDate FROM blogs",
    (err, result) => {
      if (err) throw err;
      res.json(result);
    }
  );
};

// Create a new blog
const postBlog = async (req, res) => {
  if (!req.body.title || !req.body.body) {
    return res.status(400).json({ error: "Please fill all fields" });
  }

  const email = await decryptToken(req.cookies.webToken);
  connection.query(
    `SELECT firstName, lastName FROM users WHERE email = "${email.email.email}"`,
    (err, data) => {
      if (err) throw err;
      if (data.length < 1) {
        return res.status(400).json({
          error: "Please log out and log in again",
        });
      }

      const sql = "INSERT INTO blogs SET ?";
      const today = new Date();
      const blog = {
        id: uuidv4(),
        title: req.body.title,
        body: req.body.body,
        creationDate: `${today.getDate()}${
          today.getMonth() + 1
        }${today.getFullYear()}`,
        edited: 0,
        author: `${data[0].firstName} ${data[0].lastName}`,
      };

      connection.query(sql, blog, (err, result) => {
        if (err) throw err;
        res.json(result);
      });
    }
  );
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
      res.json({ msg: "Deleted" });
    }
  );
};

module.exports = {
  getBlogs,
  postBlog,
  getBlog,
  deleteBlog,
};
