import { useState } from "react";
import { useEffect } from "react";
import Cookies from "js-cookie";

const Login = () => {
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // useEffect(() => {
  //   const script = document.createElement("script");

  //   script.src =
  //     "https://www.google.com/recaptcha/api.js?render=6Ler0HIcAAAAAMh8uvNlxXthHB0oC00r27ocDQn3";
  //   script.async = true;

  //   document.body.appendChild(script);
  // }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPending(true);
    setError("");

    const user = {
      email,
      password,
    };

    fetch("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
      // body: JSON.stringify({ user, captcha }),
      body: JSON.stringify({ user }),
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
      <h2>Log in to Your Account</h2>
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

        {!isPending && <button data-action="login">Login</button>}
        {isPending && <button disabled>Please Wait...</button>}
      </form>
    </div>
  );
};

export default Login;
