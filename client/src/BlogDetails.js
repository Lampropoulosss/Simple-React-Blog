import { useParams, useHistory } from "react-router-dom";
import useFetch from "./useFetch";

const BlogDetails = () => {
  const { id } = useParams();
  const history = useHistory();
  const {
    data: blog,
    isPending,
    error,
  } = useFetch("http://localhost:8000/api/blogs/" + id);

  const handleDelete = () => {
    fetch("http://localhost:8000/api/blogs/" + blog[0].id, {
      method: "DELETE",
    }).then(() => {
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
      {error && (
        <div>
          <p>{error}</p>
        </div>
      )}
      {blog && (
        <article>
          <h2>{blog[0].title}</h2>
          <p>Written by {blog[0].author}</p>
          <div>
            <p>{blog[0].body}</p>
          </div>
          <button onClick={handleDelete}>Delete</button>
        </article>
      )}
    </div>
  );
};

export default BlogDetails;
