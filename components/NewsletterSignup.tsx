"use client";

import { useState } from "react";
import { cutVariant } from "@/lib/cutVariant";

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
        const emailDomain = email.split("@")[1] || "";
        console.log("newsletter_signup", { email_domain: emailDomain });
      } else {
        setState("error");
        setErrorMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setState("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  if (state === "success") {
    return (
      <div className="mx-auto w-full max-w-2xl">
        <h2 className="mb-2 font-bold">Thank you</h2>
        <p>You are signed up for the email list.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-stretch gap-4">
      <h2 className="newsletter-heading">
        Sign up to hear about<br className="md:hidden" />{" "}the latest releases.
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <span
          data-paper-nav
          data-cut={cutVariant("newsletter-email")}
          className="newsletter-paper-nav text-center"
        >
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={state === "loading"}
            autoComplete="email"
            aria-label="Enter your email"
            className="newsletter-field"
          />
        </span>
        <span
          data-paper-nav
          data-cut={cutVariant("newsletter-subscribe")}
          className="newsletter-paper-nav text-center"
        >
          <button
            type="submit"
            disabled={state === "loading"}
            className="newsletter-field"
          >
            {state === "loading" ? "Subscribing…" : "Subscribe"}
          </button>
        </span>
      </form>

      {state === "error" && errorMessage && (
        <p className="text-center">{errorMessage}</p>
      )}
    </div>
  );
}
