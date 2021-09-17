import { useState } from "react";
import { useHistory } from "react-router-dom";

const Create = () => {
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isPending, setIsPending] = useState(false);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = {
      title,
      body,
    };

    setIsPending(true);
    setError("");

    fetch("https://lampropoulos.me/api/blogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
      body: JSON.stringify(blog),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
          setIsPending(false);
          return;
        }

        setIsPending(false);
        history.push("/");
      });
  };

  return (
    <div className="create">
      <h2>Add a New Blog</h2>
      {error && (
        <div>
          <p className="error">{error}</p>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <label>Blog Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Blog Body:</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <label>Blog Author:</label>
        <input placeholder="Your Name" disabled />
        {!isPending && <button>Add Blog</button>}
        {isPending && <button disabled>Adding blog...</button>}
      </form>
    </div>
  );
};

export default Create;
