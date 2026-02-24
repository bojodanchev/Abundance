// UTM parameter utilities

export interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
}

// Extract UTM parameters from URL
export const getUTMParams = (): UTMParams => {
  if (typeof window === 'undefined') return {};
  
  const searchParams = new URLSearchParams(window.location.search);
  const utmParams: UTMParams = {};
  
  const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
  
  utmKeys.forEach((key) => {
    const value = searchParams.get(key);
    if (value) {
      utmParams[key as keyof UTMParams] = value;
    }
  });
  
  return utmParams;
};

// Store UTM parameters in localStorage
export const storeUTMParams = () => {
  const utmParams = getUTMParams();
  
  if (Object.keys(utmParams).length > 0) {
    localStorage.setItem('utm_params', JSON.stringify(utmParams));
    localStorage.setItem('utm_timestamp', new Date().toISOString());
  }
};

// Retrieve stored UTM parameters
export const getStoredUTMParams = (): UTMParams => {
  if (typeof window === 'undefined') return {};
  
  const stored = localStorage.getItem('utm_params');
  return stored ? JSON.parse(stored) : {};
};

// Get UTM parameters (current or stored)
export const getCurrentUTMParams = (): UTMParams => {
  const currentUTM = getUTMParams();
  
  // If current URL has UTM params, use those
  if (Object.keys(currentUTM).length > 0) {
    return currentUTM;
  }
  
  // Otherwise, use stored params
  return getStoredUTMParams();
};

// Generate hidden form fields for UTM parameters
export const getUTMFormFields = () => {
  const params = getCurrentUTMParams();
  const fields: Record<string, string> = {};
  
  Object.entries(params).forEach(([key, value]) => {
    if (value) fields[key] = value;
  });
  
  return fields;
};

// Append UTM params to a URL
export const appendUTMToURL = (url: string, utmParams?: UTMParams): string => {
  const params = utmParams || getCurrentUTMParams();
  
  if (Object.keys(params).length === 0) return url;
  
  const urlObj = new URL(url, window.location.origin);
  
  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      urlObj.searchParams.set(key, value);
    }
  });
  
  return urlObj.toString();
};

// Initialize UTM tracking on page load
export const initUTMTracking = () => {
  storeUTMParams();
};
