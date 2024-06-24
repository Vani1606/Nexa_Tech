import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";

export const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { storeTokenInLS } = useAuth();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!user.username || !user.email || !user.phone || !user.password) {
      alert("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const res_data = await response.json();
      console.log("res from server", res_data.extraDetails);

      if (response.ok) {
        // Store the token in localStorage
        storeTokenInLS(res_data.token);
        setUser({ username: "", email: "", phone: "", password: "" });
        alert("Registration successful");
        navigate("/");
      } else {
        alert(res_data.extraDetails ? res_data.extraDetails : res_data.message);
      }
    } catch (error) {
      console.log("register error", error);
      alert("An error occurred during registration");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section>
      <main>
        <div className="section-registration">
          <div className="container grid grid-two-cols">
            <div className="registration-image reg-img">
              <img
                src="/images/register.png"
                alt="a nurse with a cute look"
                width="400"
                height="500"
              />
            </div>
            <div className="registration-form">
              <h1 className="main-heading mb-3">Registration Form</h1>
              <br />
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={user.username}
                    onChange={handleInput}
                    placeholder="Username"
                  />
                </div>
                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    name="email"
                    value={user.email}
                    onChange={handleInput}
                    placeholder="Email"
                  />
                </div>
                <div>
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={user.phone}
                    onChange={handleInput}
                    placeholder="Phone"
                  />
                </div>
                <div>
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleInput}
                    placeholder="Password"
                  />
                </div>
                <br />
                <button type="submit" className="btn btn-submit" disabled={isLoading}>
                  {isLoading ? "Registering..." : "Register Now"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};
