import { useLang } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

export function LangToggle() {
  const { lang, toggleLang } = useLang();

  return (
    <motion.button
      onClick={toggleLang}
      whileTap={{ scale: 0.93 }}
      className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#00A0FF]/40 transition-all group select-none"
      title="Toggle Language / Mudar Idioma"
    >
      <span className={`text-[11px] font-black uppercase tracking-widest transition-colors ${lang === "pt" ? "text-white" : "text-white/30"}`}>
        PT
      </span>
      <div className="w-6 h-3 rounded-full bg-white/10 border border-white/10 relative mx-0.5">
        <motion.div
          animate={{ x: lang === "en" ? 12 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="absolute top-0.5 left-0.5 w-2 h-2 rounded-full bg-[#00A0FF] shadow-[0_0_6px_#00A0FF]"
        />
      </div>
      <span className={`text-[11px] font-black uppercase tracking-widest transition-colors ${lang === "en" ? "text-white" : "text-white/30"}`}>
        EN
      </span>
    </motion.button>
  );
}
