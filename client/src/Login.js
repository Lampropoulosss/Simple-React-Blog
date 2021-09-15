import { useState } from "react";
import Cookies from "js-cookie";

const Login = () => {
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPending(true);
    setError("");
    const user = {
      email,
      password,
    };

    fetch("http://localhost:8000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
          setIsPending(false);
        } else {
          Cookies.set("webToken", data.token, { expires: 7 });
          window.location.replace("/");
        }
      })
      .catch(() => setIsPending(false));
  };

  return (
    <div className="login">
      <h2>Log in your account</h2>
      {error && (
        <div>
          <p className="error">{error}</p>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {!isPending && <button>Login</button>}
        {isPending && <button disabled>Please Wait...</button>}
      </form>
    </div>
  );
};

export default Login;