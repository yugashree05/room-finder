// src/pages/Login.jsx
import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [ email, setEmail ] = useState("");
  const [ message, setMessage ] = useState("");
  const navigate = useNavigate();

  // ✅ Detect magic link redirect
  useEffect(() => {
    const detectSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/my-rooms"); // redirect if already logged in
      }
    };
    detectSession();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) {
      setMessage("Error sending login link: " + error.message);
    } else {
      setMessage("Check your email for the login link!");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Login</h1>
      <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "300px" }}>
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Magic Link</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
