import { Play } from "lucide-react";
import luxuryLobby from "@/assets/luxury-lobby.jpg";
const VideoSection = () => {
  return <section id="hero" className="py-16 md:py-24 bg-gradient-to-b from-background to-background/50 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src={luxuryLobby} alt="Luxury Hotel Lobby" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/94 via-background/92 to-background"></div>
      </div>
      <div className="absolute inset-0 bg-gradient-glow opacity-30"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight">
            ВИЖ КАК <span className="text-gradient">ХАОСЪТ СТАВА СТРУКТУРА</span>
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-10 md:text-center max-w-3xl mx-auto leading-relaxed font-medium">
            Преди да започнеш да строиш, виж защо тази система работи. Аз ще ти покажа точната логика която превръща Хаоса в Ред. Това не е мотивационен разговор. Това е презентация за твоята свобода в 21-ви век.
          </p>

          {/* Video Preview */}
          <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-violet/20 rounded-xl overflow-hidden border-2 border-primary/30 group transition-all shadow-glow">
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
              <div className="text-center space-y-4">
                <Play className="w-16 h-16 md:w-20 md:h-20 text-primary/50 mx-auto" />
                <p className="text-white/60 font-bold text-sm md:text-base">ВИДЕОТО ИДВА СКОРО</p>
              </div>
            </div>
            <div className="absolute bottom-4 left-4 right-4 text-left">
              <p className="text-white font-bold text-sm md:text-base">ПЪТЯТ КЪМ ПЪЛНА СВОБОДА през 21-ви век</p>
            </div>
          </div>

          <p className="text-lg md:text-2xl text-gold/90 mt-6 italic font-bold">
            „Ключът към изобилието е себепознанието."
          </p>
        </div>
      </div>

    </section>;
};
export default VideoSection;