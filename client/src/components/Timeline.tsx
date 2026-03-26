import { TimelineEvent } from "@/hooks/use-locations";
import { motion } from "framer-motion";

interface TimelineProps {
  events: TimelineEvent[];
}

export function Timeline({ events }: TimelineProps) {
  // Sort descending by year
  const sortedEvents = [...events].sort((a, b) => b.year - a.year);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-display font-bold text-white mb-6 flex items-center gap-3">
        <span className="w-2 h-8 bg-secondary rounded-full shadow-[0_0_10px_#00ff9d]"></span>
        INVESTIGATION TIMELINE
      </h2>
      
      <div className="relative border-l-2 border-white/10 ml-3 space-y-8">
        {sortedEvents.map((event, index) => (
          <motion.div 
            key={event.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="relative pl-8"
          >
            {/* Timeline Dot */}
            <div className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 border-black ${index === 0 ? "bg-secondary animate-pulse shadow-[0_0_10px_#00ff9d]" : "bg-primary"}`}></div>
            
            <div className="glass p-5 rounded-xl border border-white/10 hover:border-primary/30 transition-all">
              <span className={`text-2xl font-display font-bold block mb-1 ${index === 0 ? "text-secondary" : "text-white/40"}`}>
                {event.year}
              </span>
              <h3 className="text-lg font-bold text-white mb-2">{event.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {event.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
