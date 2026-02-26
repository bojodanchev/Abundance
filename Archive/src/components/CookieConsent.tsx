import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useTranslation } from 'react-i18next';

const CookieConsent = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [preferences, setPreferences] = useState({
    functional: true,
    marketing: false,
  });

  useEffect(() => {
    const raw = localStorage.getItem("archive-cookie-consent");
    if (!raw) {
      setIsVisible(true);
    } else {
      try {
        const parsed = JSON.parse(raw);
        if (typeof parsed !== "object" || !parsed) {
          localStorage.removeItem("archive-cookie-consent");
          setIsVisible(true);
        }
      } catch {
        localStorage.removeItem("archive-cookie-consent");
        setIsVisible(true);
      }
    }
  }, []);

  const handleAcceptAll = () => {
    const consent = {
      functional: true,
      marketing: true,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("archive-cookie-consent", JSON.stringify(consent));
    setIsVisible(false);
    if (window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': 'granted',
        'ad_storage': 'granted'
      });
    }
  };

  const handleSavePreferences = () => {
    const consent = {
      ...preferences,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("archive-cookie-consent", JSON.stringify(consent));
    setIsVisible(false);
    if (window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': preferences.marketing ? 'granted' : 'denied',
        'ad_storage': preferences.marketing ? 'granted' : 'denied'
      });
    }
  };

  const handleReject = () => {
    const consent = {
      functional: true,
      marketing: false,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("archive-cookie-consent", JSON.stringify(consent));
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 bg-card border-t border-border shadow-elegant animate-fade-in">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-2">{t('cookieConsent.title')}</h3>
            <p className="text-sm text-muted-foreground mb-4 md:mb-0">
              {t('cookieConsent.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={preferences.functional}
                  disabled
                  className="rounded border-border"
                />
                <span className="text-muted-foreground">{t('cookieConsent.functional')}</span>
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.marketing}
                  onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                  className="rounded border-border"
                />
                <span>{t('cookieConsent.marketing')}</span>
              </label>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <Button variant="outline" size="sm" onClick={handleReject}>
              {t('cookieConsent.rejectAll')}
            </Button>
            <Button variant="outline" size="sm" onClick={handleSavePreferences}>
              {t('cookieConsent.savePreferences')}
            </Button>
            <Button variant="premium" size="sm" onClick={handleAcceptAll}>
              {t('cookieConsent.acceptAll')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
