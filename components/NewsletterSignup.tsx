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
      <div className="mx-auto w-full max-w-2xl text-center normal-case">
        <h2 className="mb-2 font-bold text-white">
          Thank you
        </h2>
        <p className="text-inherit text-white/90">
          You are signed up for the email list.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-stretch">
      <p className="mb-4 w-full max-w-none text-justify text-base uppercase leading-snug tracking-wide text-white [text-align-last:justify]">
        Sign up to hear about the latest releases from Broken Ear Records.
      </p>

      <form
        onSubmit={handleSubmit}
        className="grid w-full min-w-0 grid-cols-[7fr_3fr] border border-white"
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={state === "loading"}
          autoComplete="email"
          className="min-w-0 border-0 border-r border-white bg-black px-4 py-3 font-mono text-inherit normal-case placeholder:text-gray-400 placeholder:normal-case focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={state === "loading"}
          className="min-w-0 whitespace-nowrap border-0 bg-black px-3 py-3 font-mono text-inherit font-normal normal-case text-white transition-colors hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
        >
          {state === "loading" ? "Subscribing…" : "Subscribe"}
        </button>
      </form>

      {state === "error" && errorMessage && (
        <p className="mt-3 text-left text-base normal-case text-white">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
