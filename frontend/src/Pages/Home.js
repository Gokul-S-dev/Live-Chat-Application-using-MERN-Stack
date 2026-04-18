import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./Home.css";
import Login from "./Login";
import Signup from "./Signup";

const initialFormState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  pic: "",
};

const Home = () => {
  const history = useHistory();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const titleText = useMemo(
    () => (isLogin ? "Welcome Back" : "Create Your Account"),
    [isLogin]
  );

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      history.push("/chat");
    }
  }, [history]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetMessages = () => {
    setError("");
    setSuccess("");
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      return "Email and password are required.";
    }

    if (!isLogin) {
      if (!formData.name) {
        return "Name is required.";
      }

      if (formData.password !== formData.confirmPassword) {
        return "Password and confirm password do not match.";
      }
    }

    return "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    resetMessages();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);

    try {
      const endpoint = isLogin ? "/api/user/login" : "/api/user";
      const payload = isLogin
        ? {
            email: formData.email,
            password: formData.password,
          }
        : {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            pic: formData.pic,
          };

      const { data } = await axios.post(endpoint, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      setSuccess(isLogin ? "Login successful." : "Signup successful.");
      history.push("/chat");
    } catch (requestError) {
      const serverMessage = requestError.response?.data?.message;
      setError(serverMessage || "Unable to complete request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const switchMode = (loginMode) => {
    setIsLogin(loginMode);
    setFormData(initialFormState);
    resetMessages();
  };

  return (
    <main className="auth-shell">
      <section className="auth-brand-panel">
        <p className="auth-eyebrow">Live Chat Platform</p>
        <h1 className="auth-brand">Talk A Tive</h1>
        <p className="auth-copy">
          Connect in real time with a focused, simple chat experience. Sign in to
          continue your conversations or create an account to get started.
        </p>
      </section>

      <section className="auth-card" aria-label="Authentication form">
        <div className="auth-tabs" role="tablist" aria-label="Authentication mode">
          <button
            type="button"
            className={`auth-tab ${isLogin ? "active" : ""}`}
            onClick={() => switchMode(true)}
            role="tab"
            aria-selected={isLogin}
          >
            Login s
          </button>
          <button
            type="button"
            className={`auth-tab ${!isLogin ? "active" : ""}`}
            onClick={() => switchMode(false)}
            role="tab"
            aria-selected={!isLogin}
          >
            Signup
          </button>
        </div>

        <h2 className="auth-title">{titleText}</h2>

        {isLogin ? (
          <Login
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            error={error}
            success={success}
          />
        ) : (
          <Signup
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            error={error}
            success={success}
          />
        )}
      </section>
    </main>
  );
};

export default Home;