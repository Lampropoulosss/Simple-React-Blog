import { useState } from "react";
import Cookies from "js-cookie";

const Register = () => {
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPending(true);
    setError("");
    const user = {
      firstName,
      lastName,
      email,
      password1,
      password2,
    };

    fetch("http://localhost:8000/auth/register", {
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
          // history.push("/");
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

        {!isPending && <button>Register</button>}
        {isPending && <button disabled>Please Wait...</button>}
      </form>
    </div>
  );
};

export default Register;
