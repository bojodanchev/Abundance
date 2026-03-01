import { useState } from "react";
import { Instagram, MessageSquare, Youtube, Music2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <footer id="contact" className="py-12 border-t border-border bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="mb-12 max-w-2xl mx-auto">
            <h3 className="font-display text-2xl font-bold text-center mb-8"
              dangerouslySetInnerHTML={{ __html: t('footer.contactHeading') }}
            />
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder={t('footer.namePlaceholder')}
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                  className="w-full px-4 py-3 bg-card/50 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  required
                  className="w-full px-4 py-3 bg-card/50 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>
              <textarea
                placeholder={t('footer.messagePlaceholder')}
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                required
                rows={4}
                className="w-full px-4 py-3 bg-card/50 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors resize-none"
              />
              <div className="text-center">
                <Button type="submit" variant="hero" size="lg">
                  <Send className="w-4 h-4 mr-2" />
                  {submitted ? t('footer.sent') : t('footer.send')}
                </Button>
              </div>
            </form>
          </div>

          {/* Main Footer Content */}
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="font-display text-2xl font-bold text-gradient mb-4">
                CODE: ABUNDANCE™
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {t('footer.brandDescription')}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">{t('footer.navigation')}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <button onClick={() => document.getElementById('philosophy')?.scrollIntoView({ behavior: 'smooth' })} className="text-muted-foreground hover:text-primary transition-colors">
                    {t('footer.navPhilosophy')}
                  </button>
                </li>
                <li>
                  <button onClick={() => document.getElementById('system')?.scrollIntoView({ behavior: 'smooth' })} className="text-muted-foreground hover:text-primary transition-colors">
                    {t('footer.navProgram')}
                  </button>
                </li>
                <li>
                  <button onClick={() => document.getElementById('levels')?.scrollIntoView({ behavior: 'smooth' })} className="text-muted-foreground hover:text-primary transition-colors">
                    {t('footer.navLevels')}
                  </button>
                </li>
                <li>
                  <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="text-muted-foreground hover:text-primary transition-colors">
                    {t('footer.navContact')}
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">{t('footer.legalTitle')}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                    {t('footer.privacyPolicy')}
                  </a>
                </li>
                <li>
                  <a href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                    {t('footer.termsOfService')}
                  </a>
                </li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 className="font-semibold mb-4">{t('footer.socialTitle')}</h4>
              <div className="flex gap-3">
                <a href="https://instagram.com/sean.isa" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-card border border-border rounded-lg flex items-center justify-center hover:border-primary/50 hover:bg-primary/10 transition-colors">
                  <Instagram size={18} />
                </a>
                <a href="https://youtube.com/@codeabundance" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-card border border-border rounded-lg flex items-center justify-center hover:border-primary/50 hover:bg-primary/10 transition-colors">
                  <Youtube size={18} />
                </a>
                <a href="https://t.me/codeabundance" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-card border border-border rounded-lg flex items-center justify-center hover:border-secondary/50 hover:bg-secondary/10 transition-colors">
                  <MessageSquare size={18} />
                </a>
                <a href="https://tiktok.com/@sean.isa" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-card border border-border rounded-lg flex items-center justify-center hover:border-primary/50 hover:bg-primary/10 transition-colors">
                  <Music2 size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Disclaimers */}
          <div className="pt-8 border-t border-border">
            <div className="text-xs text-muted-foreground space-y-3 max-w-4xl">
              <p>
                <strong className="text-foreground">{t('footer.financialDisclaimerTitle')}</strong> {t('footer.financialDisclaimerText')}
              </p>
              <p>
                <strong className="text-foreground">{t('footer.ageRequirementTitle')}</strong> {t('footer.ageRequirementText')}
              </p>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <div>
              {t('footer.copyright', { year: currentYear })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
