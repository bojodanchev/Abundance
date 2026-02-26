import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { PhoneInput } from "@/components/PhoneInput";
import { validateName, validateEmail, validatePhone, formatPhone } from "@/lib/validation";
import { useTranslation } from 'react-i18next';
import { toast } from "sonner";

interface FreeAnalysisDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

export const FreeAnalysisDialog = ({ isOpen, onOpenChange }: FreeAnalysisDialogProps) => {
    const { t } = useTranslation();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [countryCode, setCountryCode] = useState("+359");
    const [errors, setErrors] = useState<{ name?: string; email?: string; phone?: string }>({});
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const nameError = validateName(name);
        const emailError = validateEmail(email);
        const phoneError = validatePhone(phoneNumber, countryCode);

        const newErrors: typeof errors = {};
        if (nameError) newErrors.name = t(nameError);
        if (emailError) newErrors.email = t(emailError);
        if (phoneError) newErrors.phone = t(phoneError);

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return;

        const fullPhone = formatPhone(phoneNumber, countryCode);

        // Save to sessionStorage for the diagnostic form to pick up
        sessionStorage.setItem("freeAnalysisData", JSON.stringify({ name, email, phone: fullPhone }));

        // Capture lead in CRM
        fetch("/api/lead-capture", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                user_name: name,
                user_email: email,
                user_phone: fullPhone,
                source: "archive-free-analysis",
                locale: "bg",
            }),
        }).catch(() => {}); // fire-and-forget

        onOpenChange(false);
        toast.success(t('freeAnalysis.redirectToast'));

        setTimeout(() => {
            navigate("/diagnostic");
        }, 500);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px] bg-background/95 backdrop-blur-xl border-gold/20">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-display font-bold text-center text-gradient">
                        {t('freeAnalysis.title')}
                    </DialogTitle>
                    <DialogDescription className="text-center text-muted-foreground">
                        {t('freeAnalysis.description')}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-5 mt-4">
                    <div className="space-y-1.5">
                        <Label htmlFor="name" className="text-foreground/80">{t('freeAnalysis.nameLabel')}</Label>
                        <Input
                            id="name"
                            value={name}
                            onChange={(e) => { setName(e.target.value); if (errors.name) setErrors(prev => ({ ...prev, name: undefined })); }}
                            placeholder={t('freeAnalysis.namePlaceholder')}
                            className={`bg-background/50 ${errors.name ? 'border-red-500 focus:border-red-500' : 'border-gold/20 focus:border-gold/50'}`}
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div className="space-y-1.5">
                        <Label htmlFor="email" className="text-foreground/80">{t('freeAnalysis.emailLabel')}</Label>
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors(prev => ({ ...prev, email: undefined })); }}
                            placeholder={t('freeAnalysis.emailPlaceholder')}
                            className={`bg-background/50 ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-gold/20 focus:border-gold/50'}`}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                    <div className="space-y-1.5">
                        <Label htmlFor="phone" className="text-foreground/80">{t('freeAnalysis.phoneLabel')}</Label>
                        <PhoneInput
                            id="phone"
                            value={phoneNumber}
                            countryCode={countryCode}
                            onChangeNumber={(v) => { setPhoneNumber(v); if (errors.phone) setErrors(prev => ({ ...prev, phone: undefined })); }}
                            onChangeCountryCode={setCountryCode}
                            placeholder="888 123 456"
                            className="bg-background/50"
                            error={!!errors.phone}
                        />
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                    </div>
                    <Button
                        type="submit"
                        className="w-full bg-gold hover:bg-gold/90 text-black font-bold"
                    >
                        {t('freeAnalysis.submitButton')}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};
