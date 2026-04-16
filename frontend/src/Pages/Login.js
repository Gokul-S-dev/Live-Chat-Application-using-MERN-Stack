import React from "react";

const Login = ({ formData, handleChange, handleSubmit, isSubmitting, error, success }) => {
  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <label className="auth-field">
        <span>Email</span>
        <input
          type="email"
          name="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </label>

      <label className="auth-field">
        <span>Password</span>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </label>

      {error && <p className="auth-message error">{error}</p>}
      {success && <p className="auth-message success">{success}</p>}

      <button type="submit" className="auth-submit" disabled={isSubmitting}>
        {isSubmitting ? "Please wait..." : "Login"}
      </button>
    </form>
  );
};

export default Login;
