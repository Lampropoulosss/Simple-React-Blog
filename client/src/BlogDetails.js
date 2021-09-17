import { useParams, useHistory } from "react-router-dom";
import { useState } from "react";
import useFetch from "./useFetch";
import Cookies from "js-cookie";

const BlogDetails = () => {
  const [errors, setErrors] = useState("");
  const { id } = useParams();
  const history = useHistory();
  const {
    data: blog,
    isPending,
    error,
  } = useFetch("https://lampropoulos.me/api/blogs/" + id);

  const handleDelete = () => {
    fetch("https://lampropoulos.me/api/blogs/" + blog[0].id, {
      method: "DELETE",
      credentials: "same-origin",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          return setErrors(data.error);
        }
        history.push("/");
      });
  };

  return (
    <div className="blog-details">
      {isPending && (
        <div>
          <p>Loading...</p>
        </div>
      )}
      {errors && (
        <div>
          <p className="error">{errors}</p>
        </div>
      )}
      {error && (
        <div>
          <p>{error}</p>
        </div>
      )}
      {blog && (
        <article>
          <h2>{blog[0].title}</h2>
          <p className="written-by">Written by {blog[0].author}</p>
          <div>
            <pre className="pre">{blog[0].body}</pre>
          </div>
          {Cookies.get("webToken") && (
            <button onClick={handleDelete}>Delete</button>
          )}
        </article>
      )}
    </div>
  );
};

export default BlogDetails;
