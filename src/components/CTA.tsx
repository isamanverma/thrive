import React from "react";

export default function CTA() {
  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-extrabold text-card-foreground mb-4">
          Ready to Simplify Your Meals?
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Join Thrive today and start enjoying delicious, personalized meal plans
          that fit your lifestyle.
        </p>
        <button className="button_primary text-lg font-bold px-8 py-4 rounded-xl bg-primary text-primary-foreground">
          Sign Up Now
        </button>
      </div>
    </section>
  );
}
