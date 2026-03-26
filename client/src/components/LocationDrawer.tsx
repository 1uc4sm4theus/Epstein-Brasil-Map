import { Location } from "@/hooks/use-locations";
import { X, ExternalLink, Calendar, MapPin, Share2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface LocationDrawerProps {
  location: Location | null;
  onClose: () => void;
}

export function LocationDrawer({ location, onClose }: LocationDrawerProps) {
  if (!location) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: "100%", opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed right-0 top-0 bottom-0 w-full md:w-[480px] glass z-50 overflow-y-auto border-l border-white/10 shadow-2xl"
      >
        {/* Header Image */}
        <div className="relative h-64 w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
          <img 
            /* Unsplash cityscape for drawer hero */
            src={location.imageUrl || `https://source.unsplash.com/random/800x600/?${location.name},city,night`} 
            alt={location.name}
            className="w-full h-full object-cover filter brightness-75 contrast-125"
          />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="absolute bottom-6 left-6 z-20">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 rounded bg-primary/80 text-white text-xs font-bold uppercase tracking-wider border border-primary/50 shadow-[0_0_10px_rgba(176,38,255,0.4)]">
                {location.type}
              </span>
              {location.yearRange && (
                <span className="px-2 py-0.5 rounded bg-secondary/80 text-black text-xs font-bold flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {location.yearRange}
                </span>
              )}
            </div>
            <h2 className="text-4xl font-display font-bold text-white tracking-wide text-glow">{location.name}</h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {location.categories.map(cat => (
              <span 
                key={cat.id} 
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-200 hover:bg-white/10 hover:border-primary/50 transition-all cursor-default"
              >
                <span>{cat.icon}</span> {cat.name}
              </span>
            ))}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-sm uppercase tracking-widest text-muted-foreground font-semibold flex items-center gap-2">
              <span className="w-8 h-[1px] bg-primary"></span> Intel Summary
            </h3>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base border-l-2 border-white/10 pl-4">
              {location.description}
            </p>
          </div>

          {/* Location Data */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <span className="text-xs text-muted-foreground block mb-1">COORDINATES</span>
              <div className="flex items-center gap-2 text-secondary font-mono">
                <MapPin className="w-4 h-4" />
                {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
              </div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <span className="text-xs text-muted-foreground block mb-1">STATUS</span>
              <div className="flex items-center gap-2 text-primary font-mono">
                <Share2 className="w-4 h-4" />
                ACTIVE INVESTIGATION
              </div>
            </div>
          </div>

          {/* Sources */}
          {location.sources.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-white/10">
              <h3 className="text-sm uppercase tracking-widest text-muted-foreground font-semibold">Verified Sources</h3>
              <div className="space-y-2">
                {location.sources.map((source, idx) => (
                  <a 
                    key={idx}
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-lg bg-black/40 border border-white/10 hover:border-primary/50 hover:bg-primary/5 transition-all group"
                  >
                    <span className="text-sm text-gray-300 group-hover:text-white truncate pr-4">{source.title}</span>
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary flex-shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          )}
          
          <div className="pt-8 text-center">
            <a 
              href={`https://pt.wikipedia.org/wiki/${location.name.replace(/\s/g, '_')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-white transition-colors uppercase tracking-widest border-b border-transparent hover:border-white pb-0.5"
            >
              Open Wikipedia Dossier <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
