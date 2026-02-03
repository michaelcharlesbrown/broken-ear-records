"use client";

import { useState } from "react";

type FormState = "idle" | "loading" | "success" | "error";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) {
      setState("error");
      setErrorMessage("Email is required");
      return;
    }

    setState("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.ok) {
        setState("success");
        // Extract email domain for tracking
        const emailDomain = email.split("@")[1] || "";
        console.log("newsletter_signup", { email_domain: emailDomain });
      } else {
        setState("error");
        setErrorMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setState("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  if (state === "success") {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">THANK YOU</h2>
        <p>You are signed up for the email list.</p>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-0 max-w-[380px] mx-auto px-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={state === "loading"}
          className="flex-1 px-4 py-2 border border-white bg-black text-white placeholder-gray-400 disabled:opacity-50 min-w-0"
        />
        <button
          type="submit"
          disabled={state === "loading"}
          className="px-4 py-2 border border-white border-l-0 bg-black text-white hover:bg-white hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {state === "loading" ? "Subscribing..." : "Subscribe"}
        </button>
      </form>
      {state === "error" && errorMessage && (
        <p className="text-center mt-4 text-red-300 px-4">{errorMessage}</p>
      )}
    </div>
  );
}
