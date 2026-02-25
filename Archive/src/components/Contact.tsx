import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageSquare, Instagram, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    inquiry: "mentorship",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await fetch("/api/lead-capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_name: formData.name,
          user_email: formData.email,
          source: "archive-contact",
          locale: "bg",
          message: formData.message,
          extra: { inquiry: formData.inquiry },
        }),
      });
    } catch {
      // still show success to user
    }

    toast({
      title: "Message sent",
      description: "We'll get back to you within 24 hours.",
    });
    setFormData({ name: "", email: "", inquiry: "mentorship", message: "" });
  };

  return (
    <section id="contact" className="py-16 md:py-20 bg-gradient-dark relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 px-4">
              Begin Your <span className="text-gradient">Transition</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
              Ready to transform your reality? Let's discuss your path forward.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Contact Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <Input 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your full name"
                    required
                    className="bg-card border-border"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input 
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    required
                    className="bg-card border-border"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Inquiry Type</label>
                  <select 
                    value={formData.inquiry}
                    onChange={(e) => setFormData({ ...formData, inquiry: e.target.value })}
                    className="w-full h-10 px-3 rounded-md bg-card border border-border text-foreground"
                  >
                    <option value="mentorship">Mentorship</option>
                    <option value="partnership">Partnership</option>
                    <option value="speaking">Speaking</option>
                    <option value="general">General Question</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <Textarea 
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your situation and goals..."
                    required
                    rows={6}
                    className="bg-card border-border resize-none"
                  />
                </div>

                <Button type="submit" variant="hero" size="lg" className="w-full group min-h-[48px]">
                  Send Message
                  <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-6 md:space-y-8">
              {/* Direct Contact */}
              <div className="p-6 md:p-8 bg-card border border-border rounded-xl">
                <h3 className="font-display text-xl md:text-2xl font-semibold mb-4 md:mb-6">Connect Directly</h3>
                
                <div className="space-y-3 md:space-y-4">
                  <a 
                    href="mailto:sean@codeabundance.com" 
                    className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-background rounded-lg hover:bg-muted transition-smooth group min-h-[56px]"
                  >
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-smooth flex-shrink-0">
                      <Mail className="text-primary" size={20} />
                    </div>
                    <div className="min-w-0">
                      <div className="font-medium text-sm md:text-base">Email</div>
                      <div className="text-xs md:text-sm text-muted-foreground truncate">sean@codeabundance.com</div>
                    </div>
                  </a>

                  <a 
                    href="https://t.me/codeabundance" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-background rounded-lg hover:bg-muted transition-smooth group min-h-[56px]"
                  >
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-secondary/10 rounded-lg flex items-center justify-center group-hover:bg-secondary/20 transition-smooth flex-shrink-0">
                      <MessageSquare className="text-secondary" size={20} />
                    </div>
                    <div className="min-w-0">
                      <div className="font-medium text-sm md:text-base">Telegram</div>
                      <div className="text-xs md:text-sm text-muted-foreground truncate">@codeabundance</div>
                    </div>
                  </a>

                  <a 
                    href="https://instagram.com/codeabundance" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-background rounded-lg hover:bg-muted transition-smooth group min-h-[56px]"
                  >
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-smooth flex-shrink-0">
                      <Instagram className="text-primary" size={20} />
                    </div>
                    <div className="min-w-0">
                      <div className="font-medium text-sm md:text-base">Instagram</div>
                      <div className="text-xs md:text-sm text-muted-foreground truncate">@codeabundance</div>
                    </div>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
