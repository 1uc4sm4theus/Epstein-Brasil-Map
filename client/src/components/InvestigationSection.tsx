import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, FileText, Send, CheckCircle, ExternalLink, Globe, Lock, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TimelineEvent } from "@/hooks/use-locations";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

import { Link } from "wouter";

export function InvestigationSection({ events }: { events: TimelineEvent[] }) {
  // Component can now be a simple entry point or redirected
  return (
    <Link href="/investigation">
      <button 
        className="glass p-4 rounded-2xl border-l-4 border-[#8B0000] flex items-center gap-4 hover:scale-105 transition-transform shadow-[0_0_30px_rgba(139,0,0,0.2)]"
      >
        <div className="w-10 h-10 rounded-full bg-[#8B0000]/20 flex items-center justify-center text-[#D4AF37]">
          <Search className="w-6 h-6" />
        </div>
        <div className="text-left">
          <p className="text-[10px] font-black text-[#D4AF37] uppercase tracking-widest">Dossiê Brasil</p>
          <p className="text-xs font-bold text-white uppercase tracking-tight">Conexões & Pistas</p>
        </div>
      </button>
    </Link>
  );
}
