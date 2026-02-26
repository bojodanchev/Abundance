import { useState } from "react";
import { Input } from "@/components/ui/input";
import { COUNTRY_CODES } from "@/lib/validation";

interface PhoneInputProps {
  value: string;
  countryCode: string;
  onChangeNumber: (number: string) => void;
  onChangeCountryCode: (code: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  id?: string;
}

export const PhoneInput = ({
  value,
  countryCode,
  onChangeNumber,
  onChangeCountryCode,
  placeholder = "888 123 456",
  disabled = false,
  className = "",
  id,
}: PhoneInputProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedCountry = COUNTRY_CODES.find((c) => c.code === countryCode) || COUNTRY_CODES[0];

  return (
    <div className={`flex gap-2 ${className}`}>
      {/* Country code dropdown */}
      <div className="relative">
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className="flex items-center gap-1 h-10 px-3 rounded-md border border-input bg-background text-sm whitespace-nowrap hover:bg-accent/50 transition-colors disabled:opacity-50"
        >
          <span>{selectedCountry.label}</span>
          <svg
            className={`w-3 h-3 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute top-full left-0 mt-1 z-50 bg-popover border border-border rounded-md shadow-lg max-h-48 overflow-y-auto min-w-[140px]">
              {COUNTRY_CODES.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  className={`w-full text-left px-3 py-2 text-sm hover:bg-accent/50 transition-colors ${
                    c.code === countryCode ? "bg-accent/30 font-medium" : ""
                  }`}
                  onClick={() => {
                    onChangeCountryCode(c.code);
                    setIsOpen(false);
                  }}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Phone number input */}
      <Input
        id={id}
        type="tel"
        value={value}
        onChange={(e) => onChangeNumber(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="flex-1"
      />
    </div>
  );
};
