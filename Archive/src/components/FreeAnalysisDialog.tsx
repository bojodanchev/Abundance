import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { PhoneInput } from "@/components/PhoneInput";
import { validateName, validateEmail, validatePhone, formatPhone } from "@/lib/validation";

interface FreeAnalysisDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

export const FreeAnalysisDialog = ({ isOpen, onOpenChange }: FreeAnalysisDialogProps) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [countryCode, setCountryCode] = useState("+359");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const nameError = validateName(name);
        if (nameError) {
            toast.error(nameError);
            return;
        }

        const emailError = validateEmail(email);
        if (emailError) {
            toast.error(emailError);
            return;
        }

        const phoneError = validatePhone(phoneNumber, countryCode);
        if (phoneError) {
            toast.error(phoneError);
            return;
        }

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
        toast.success("Пренасочване към диагностиката...");

        setTimeout(() => {
            navigate("/diagnostic");
        }, 500);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px] bg-background/95 backdrop-blur-xl border-gold/20">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-display font-bold text-center text-gradient">
                        Безплатен Анализ
                    </DialogTitle>
                    <DialogDescription className="text-center text-muted-foreground">
                        Попълнете данните си, за да започнете своя персонален анализ.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-foreground/80">Име и фамилия</Label>
                        <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Алекс Иванов"
                            className="bg-background/50 border-gold/20 focus:border-gold/50"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-foreground/80">Имейл</Label>
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="vashiat@email.com"
                            className="bg-background/50 border-gold/20 focus:border-gold/50"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone" className="text-foreground/80">Телефон</Label>
                        <PhoneInput
                            id="phone"
                            value={phoneNumber}
                            countryCode={countryCode}
                            onChangeNumber={setPhoneNumber}
                            onChangeCountryCode={setCountryCode}
                            placeholder="888 123 456"
                            className="bg-background/50"
                        />
                    </div>
                    <Button
                        type="submit"
                        className="w-full bg-gold hover:bg-gold/90 text-black font-bold"
                    >
                        Започни Анализ
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};
