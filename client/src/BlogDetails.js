import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import useFetch from "./useFetch";
import Cookies from "js-cookie";
import DOMPurify from "dompurify";
import moment from "moment";

const BlogDetails = () => {
  const [errors, setErrors] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: blog, isPending, error } = useFetch("/api/blogs/" + id);

  const handleDelete = () => {
    fetch("/api/blogs/" + blog[0].id, {
      method: "DELETE",
      credentials: "same-origin",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          return setErrors(data.error);
        }
        navigate("/");
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
            {/* <pre className="pre">{blog[0].body}</pre> */}
            <pre
              className="pre"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(blog[0].body),
              }}
            ></pre>
          </div>
          <p className="posted">
            Posted: {moment(blog[0].creationDate, "DDMMYYYY").fromNow()}
          </p>
          {Cookies.get("webToken") && <button>Edit</button>}
          {Cookies.get("webToken") && (
            <button onClick={handleDelete}>Delete</button>
          )}
        </article>
      )}
    </div>
  );
};

export default BlogDetails;
