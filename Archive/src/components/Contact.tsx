import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageSquare, Instagram, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const { t } = useTranslation();
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
      title: t('contact.toastTitle'),
      description: t('contact.toastDescription'),
    });
    setFormData({ name: "", email: "", inquiry: "mentorship", message: "" });
  };

  return (
    <section id="contact" className="py-16 md:py-20 bg-gradient-dark relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 px-4"
              dangerouslySetInnerHTML={{ __html: t('contact.heading') }}
            />
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
              {t('contact.subheading')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Contact Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">{t('contact.nameLabel')}</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t('contact.namePlaceholder')}
                    required
                    className="bg-card border-border"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">{t('contact.emailLabel')}</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={t('contact.emailPlaceholder')}
                    required
                    className="bg-card border-border"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">{t('contact.inquiryLabel')}</label>
                  <select
                    value={formData.inquiry}
                    onChange={(e) => setFormData({ ...formData, inquiry: e.target.value })}
                    className="w-full h-10 px-3 rounded-md bg-card border border-border text-foreground"
                  >
                    <option value="mentorship">{t('contact.inquiryMentorship')}</option>
                    <option value="partnership">{t('contact.inquiryPartnership')}</option>
                    <option value="speaking">{t('contact.inquirySpeaking')}</option>
                    <option value="general">{t('contact.inquiryGeneral')}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">{t('contact.messageLabel')}</label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={t('contact.messagePlaceholder')}
                    required
                    rows={6}
                    className="bg-card border-border resize-none"
                  />
                </div>

                <Button type="submit" variant="hero" size="lg" className="w-full group min-h-[48px]">
                  {t('contact.submitButton')}
                  <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-6 md:space-y-8">
              {/* Direct Contact */}
              <div className="p-6 md:p-8 bg-card border border-border rounded-xl">
                <h3 className="font-display text-xl md:text-2xl font-semibold mb-4 md:mb-6">{t('contact.connectTitle')}</h3>

                <div className="space-y-3 md:space-y-4">
                  <a
                    href="mailto:sean@codeabundance.com"
                    className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-background rounded-lg hover:bg-muted transition-smooth group min-h-[56px]"
                  >
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-smooth flex-shrink-0">
                      <Mail className="text-primary" size={20} />
                    </div>
                    <div className="min-w-0">
                      <div className="font-medium text-sm md:text-base">{t('contact.emailChannel')}</div>
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
