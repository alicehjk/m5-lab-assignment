import React, { useState } from "react";
import { LoginSocialFacebook } from "reactjs-social-login";

function SignIn({ onLogin }) {
  const [user, setUser] = useState(null);
  const [formUser, setFormUser] = useState({ name: "", email: "" });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formUser.name && formUser.email) {
      setUser(formUser);
      if (onLogin) onLogin(formUser);
    }
  };

  return (
    <div className="signin-container">
      <h2>Sign In</h2>
      <p>Please login using one of the following:</p>

      {!user ? (
        <>
          {/* Manual Form */}
          <form className="signin-form" onSubmit={handleFormSubmit}>
            <div>
              <label>Name:</label>
              <input
                type="text"
                value={formUser.name}
                onChange={(e) =>
                  setFormUser({ ...formUser, name: e.target.value })
                }
                placeholder="Your name"
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                value={formUser.email}
                onChange={(e) =>
                  setFormUser({ ...formUser, email: e.target.value })
                }
                placeholder="Your email"
              />
            </div>
            <button type="submit" className="form-login-btn">
              Login
            </button>
          </form>

          {/* Divider */}
          <div className="divider">OR</div>

          {/* Facebook Login */}

          <LoginSocialFacebook
            appId="1103866245202692"
            scope="public_profile"   // only ask for basic profile
            onResolve={({ data }) => {
              setUser(data);
              if (onLogin) onLogin(data);
            }}
            onReject={(err) => {
              console.error(err);
            }}
          >
            <button className="facebook-login-btn">Login with Facebook</button>
          </LoginSocialFacebook>
        </>
      ) : (
        <div className="user-info">
          <p>Welcome, {user.name}!</p>
          <p>{user.email}</p>
        </div>
      )}
    </div>
  );
}

export default SignIn;
