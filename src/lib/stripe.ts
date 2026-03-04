import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY?.replace(/[\s\\n]+$/g, "").trim();
    if (!key) {
      throw new Error("Missing STRIPE_SECRET_KEY environment variable");
    }
    _stripe = new Stripe(key, {
      apiVersion: "2026-01-28.clover",
      // Organization API keys (sk_org_*) require stripeContext to target the account
      ...(key.startsWith("sk_org_") && process.env.STRIPE_ACCOUNT_ID
        ? { stripeContext: process.env.STRIPE_ACCOUNT_ID }
        : {}),
    });
  }
  return _stripe;
}
