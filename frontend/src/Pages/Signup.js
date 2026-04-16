import React from "react";

const Signup = ({
  formData,
  handleChange,
  handleSubmit,
  isSubmitting,
  error,
  success,
}) => {
  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <label className="auth-field">
        <span>Name</span>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </label>

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

      <label className="auth-field">
        <span>Confirm Password</span>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
      </label>

      <label className="auth-field">
        <span>Profile Image URL (Optional)</span>
        <input
          type="url"
          name="pic"
          placeholder="https://example.com/avatar.png"
          value={formData.pic}
          onChange={handleChange}
        />
      </label>

      {error && <p className="auth-message error">{error}</p>}
      {success && <p className="auth-message success">{success}</p>}

      <button type="submit" className="auth-submit" disabled={isSubmitting}>
        {isSubmitting ? "Please wait..." : "Create Account"}
      </button>
    </form>
  );
};

export default Signup;
