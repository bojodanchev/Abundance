"use client";

import { useState } from "react";
import Button from "./Button";

export default function CookieConsent() {
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    return !localStorage.getItem("cookie-consent");
  });

  function accept() {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 p-4">
      <div className="max-w-4xl mx-auto p-4 bg-surface-muted border border-border rounded-xl flex flex-col sm:flex-row items-center gap-4">
        <p className="text-text-secondary text-sm flex-1">
          We use cookies to improve your experience and analyze usage. By continuing, you agree to our privacy policy.
        </p>
        <Button size="sm" onClick={accept}>
          Accept
        </Button>
      </div>
    </div>
  );
}
