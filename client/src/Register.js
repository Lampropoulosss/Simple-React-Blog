import { useState } from "react";
import { useEffect } from "react";
import Cookies from "js-cookie";

const Register = () => {
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

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

    // window.grecaptcha.ready(function () {
    //   window.grecaptcha
    //     .execute("6Ler0HIcAAAAAMh8uvNlxXthHB0oC00r27ocDQn3", {
    //       action: "register",
    //     })
    //     .then(function (captcha) {
    //     });
    // });

    const user = {
      firstName,
      lastName,
      email,
      password1,
      password2,
    };

    fetch("/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
      // body: JSON.stringify(user),
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
    <div className="register">
      <h2>Create a New Account</h2>
      {error && (
        <div>
          <p className="error">{error}</p>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <label>First Name:</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <label>Last Name:</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <label>Email:</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password:</label>
        <input
          type="password"
          value={password1}
          onChange={(e) => setPassword1(e.target.value)}
        />
        <label>Re-Enter Your Password:</label>
        <input
          type="password"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
        />

        {!isPending && <button data-action="register">Register</button>}
        {isPending && <button disabled>Please Wait...</button>}
      </form>
    </div>
  );
};

export default Register;
