"use client";

import { useState, useEffect } from "react";

type NewsletterData = {
  vorname: string;
  email: string;
  subscribedAt: string;
};

export function useNewsletterForm() {
  const [vorname, setVorname] = useState("");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [alreadySubscribed, setAlreadySubscribed] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("newsletter-subscribed");
    if (stored) {
      setAlreadySubscribed(true);
    }
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    const data: NewsletterData = {
      vorname: vorname.trim(),
      email: email.trim(),
      subscribedAt: new Date().toISOString(),
    };

    localStorage.setItem("newsletter-subscribed", JSON.stringify(data));
    setSuccess(true);
    setAlreadySubscribed(true);
  }

  return {
    vorname,
    setVorname,
    email,
    setEmail,
    success,
    alreadySubscribed,
    handleSubmit,
  };
}
