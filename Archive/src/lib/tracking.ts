// Tracking utilities for GA4, Meta Pixel, TikTok Pixel
// Add your tracking IDs in the respective functions

export const initializeTracking = () => {
  // Check cookie consent
  const raw = localStorage.getItem("archive-cookie-consent");
  let hasMarketingConsent = false;
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      hasMarketingConsent = typeof parsed === "object" && parsed?.marketing === true;
    } catch {
      // Legacy value (e.g. plain string "accepted") — treat as no marketing consent
    }
  }

  if (hasMarketingConsent) {
    // Only initialize pixels when real IDs are configured
    if (GA4_ID && !GA4_ID.includes('XXXXXXXXXX')) initGA4();
    if (META_PIXEL_ID && META_PIXEL_ID !== 'YOUR_PIXEL_ID') initMetaPixel();
    if (TIKTOK_PIXEL_ID && TIKTOK_PIXEL_ID !== 'YOUR_TIKTOK_PIXEL_ID') initTikTokPixel();
  }
};

// Tracking IDs — replace with real values when ready
const GA4_ID = 'G-XXXXXXXXXX';
const META_PIXEL_ID = 'YOUR_PIXEL_ID';
const TIKTOK_PIXEL_ID = 'YOUR_TIKTOK_PIXEL_ID';

// Google Analytics 4
export const initGA4 = () => {
  
  const id = GA4_ID;
  if (typeof window !== 'undefined' && !window.gtag) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', id);
  }
};

// Meta Pixel
export const initMetaPixel = () => {
  
  if (typeof window !== 'undefined' && !window.fbq) {
    const fbqFunc: any = function(...args: any[]) {
      if (fbqFunc.callMethod) {
        fbqFunc.callMethod.apply(fbqFunc, args);
      } else {
        fbqFunc.queue.push(args);
      }
    };
    fbqFunc.push = fbqFunc;
    fbqFunc.loaded = true;
    fbqFunc.version = '2.0';
    fbqFunc.queue = [];
    
    window.fbq = fbqFunc;
    if (!window._fbq) window._fbq = window.fbq;
    
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://connect.facebook.net/en_US/fbevents.js';
    document.head.appendChild(script);
    
    window.fbq('init', META_PIXEL_ID);
    window.fbq('track', 'PageView');
  }
};

// TikTok Pixel
export const initTikTokPixel = () => {
  if (typeof window !== 'undefined' && !window.ttq) {
    const ttqFunc: any = function(...args: any[]) {
      if (ttqFunc.methods) {
        ttqFunc.methods.apply(ttqFunc, args);
      } else {
        ttqFunc.queue.push(args);
      }
    };
    ttqFunc.queue = [];
    ttqFunc.version = '1.0';
    
    window.ttq = ttqFunc;
    
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://analytics.tiktok.com/i18n/pixel/events.js?sdkid=' + TIKTOK_PIXEL_ID + '&lib=ttq';
    document.head.appendChild(script);
    
    // Queue these calls - they'll execute once the script loads
    window.ttq('load', TIKTOK_PIXEL_ID);
    window.ttq('page');
  }
};

// Track custom events
export const trackEvent = (eventName: string, eventData?: Record<string, any>) => {
  // GA4
  if (window.gtag) {
    window.gtag('event', eventName, eventData);
  }
  
  // Meta Pixel
  if (window.fbq) {
    window.fbq('track', eventName, eventData);
  }
  
  // TikTok Pixel
  if (window.ttq) {
    window.ttq('track', eventName, eventData);
  }
};

// Common event trackers
export const trackCTAClick = (ctaName: string, location: string) => {
  trackEvent('cta_click', {
    cta_name: ctaName,
    location: location,
  });
};

export const trackFormSubmit = (formName: string) => {
  trackEvent('form_submit', {
    form_name: formName,
  });
};

export const trackVideoPlay = (videoName: string) => {
  trackEvent('vsl_play', {
    video_name: videoName,
  });
};

export const trackTelegramJoin = () => {
  trackEvent('telegram_join', {});
};

// TypeScript declarations
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
    fbq?: (...args: any[]) => void;
    _fbq?: any;
    ttq?: {
      (...args: any[]): void;
      load?: (id: string) => void;
      page?: () => void;
      track?: (event: string, data?: any) => void;
      methods?: any;
      queue?: any[];
      version?: string;
    };
  }
}
