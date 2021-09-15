import Cookies from "js-cookie";

const Logout = () => {
  if (Cookies.get("webToken")) {
    Cookies.remove("webToken");
  }

  window.location.replace("/");

  return (
    <div>
      <p>Please wait..</p>
    </div>
  );
};

export default Logout;
