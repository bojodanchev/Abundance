import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { trackEvent } from "@/lib/tracking";
import { getUTMFormFields } from "@/lib/utm";
import { Sparkles } from "lucide-react";

const StrategySession = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    country: "",
    age: "",
    challenge: "",
    outcome: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Track form submission
    trackEvent('form_submit', {
      form_name: 'strategy_session',
      ...formData
    });

    // Capture lead in CRM
    const utm = getUTMFormFields();
    try {
      await fetch("/api/lead-capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_name: formData.fullName,
          user_email: formData.email,
          user_phone: formData.phone,
          source: "archive-strategy-session",
          locale: "bg",
          message: `Challenge: ${formData.challenge}\nDesired Outcome: ${formData.outcome}`,
          extra: {
            city: formData.city,
            country: formData.country,
            age: formData.age,
            ...utm,
          },
        }),
      });
    } catch {
      // still show success to user
    }

    toast({
      title: "Request Received",
      description: "Every request is personally reviewed. You'll hear from us within 24 hours.",
    });

    // Reset form
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      city: "",
      country: "",
      age: "",
      challenge: "",
      outcome: ""
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="strategy" className="py-32 bg-background relative">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 border border-primary/20 bg-card/30 backdrop-blur-sm">
              <Sparkles className="text-primary" size={20} />
              <span className="text-sm font-medium tracking-[0.2em] uppercase text-primary/90">
                Exclusive Invitation
              </span>
            </div>
            
            <h2 className="font-display text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Your Path to <span className="text-gradient">Abundance</span>
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-4">
              Let's map your next evolution.
            </p>
            
            <p className="text-lg text-muted-foreground/80">
              This isn't a sales call — it's clarity, direction, and strategy tailored to your mission.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="relative">
            <div className="p-8 md:p-12 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className="bg-background/50"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    className="bg-background/50"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+359 ..."
                    className="bg-background/50"
                  />
                </div>

                {/* Age */}
                <div className="space-y-2">
                  <Label htmlFor="age">Age *</Label>
                  <Input
                    id="age"
                    name="age"
                    type="number"
                    value={formData.age}
                    onChange={handleChange}
                    required
                    placeholder="Your age"
                    className="bg-background/50"
                  />
                </div>

                {/* City */}
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    placeholder="Your city"
                    className="bg-background/50"
                  />
                </div>

                {/* Country */}
                <div className="space-y-2">
                  <Label htmlFor="country">Country *</Label>
                  <Input
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                    placeholder="Your country"
                    className="bg-background/50"
                  />
                </div>
              </div>

              {/* Current Challenge */}
              <div className="space-y-2 mb-6">
                <Label htmlFor="challenge">Current Challenge *</Label>
                <Textarea
                  id="challenge"
                  name="challenge"
                  value={formData.challenge}
                  onChange={handleChange}
                  required
                  placeholder="What's your biggest obstacle right now?"
                  className="bg-background/50 min-h-[100px]"
                />
              </div>

              {/* Desired Outcome */}
              <div className="space-y-2 mb-8">
                <Label htmlFor="outcome">Desired Outcome *</Label>
                <Textarea
                  id="outcome"
                  name="outcome"
                  value={formData.outcome}
                  onChange={handleChange}
                  required
                  placeholder="Where do you want to be in 90 days?"
                  className="bg-background/50 min-h-[100px]"
                />
              </div>

              {/* Submit Button */}
              <Button 
                type="submit"
                variant="premium"
                size="lg"
                className="w-full shadow-gold"
              >
                Request Strategy Session
              </Button>

              {/* Disclaimer */}
              <p className="text-center text-sm text-muted-foreground/80 mt-6">
                Every request is personally reviewed — serious seekers only.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default StrategySession;
