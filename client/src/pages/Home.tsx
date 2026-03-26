import { useState, useMemo } from "react";
import { useLocations, useTimeline, useStats } from "@/hooks/use-locations";
import { Map } from "@/components/Map";
import { Sidebar } from "@/components/Sidebar";
import { LocationDrawer } from "@/components/LocationDrawer";
import { ParticleBackground } from "@/components/ParticleBackground";
import { Timeline } from "@/components/Timeline";
import { InvestigationSection } from "@/components/InvestigationSection";
import { StatsModal } from "@/components/StatsModal";
import { Loader2, RefreshCw } from "lucide-react";

export default function Home() {
  const { data: locations, isLoading } = useLocations();
  const { data: timelineEvents } = useTimeline();
  const { data: stats } = useStats();
  
  const [selectedId, setSelectedId] = useState<number | null>(null);
  
  const selectedLocation = useMemo(() => 
    locations?.find(l => l.id === selectedId) || null
  , [locations, selectedId]);

  // Extract unique categories for filter
  const categories = useMemo(() => {
    if (!locations) return [];
    const allCats = locations.flatMap(l => l.categories.map(c => c.name));
    return Array.from(new Set(allCats));
  }, [locations]);

  if (isLoading) {
    return (
      <div className="h-screen w-screen bg-black flex items-center justify-center text-primary flex-col gap-4">
        <Loader2 className="w-12 h-12 animate-spin" />
        <span className="font-display tracking-[0.2em] animate-pulse">INITIALIZING SYSTEM...</span>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-screen bg-black overflow-hidden flex flex-col">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <ParticleBackground />
      </div>
      <div className="scanlines z-50 pointer-events-none"></div>

      {/* Header */}
      <header className="absolute top-0 left-0 right-0 h-20 z-10 bg-gradient-to-b from-black/90 to-transparent pointer-events-auto flex items-center justify-between px-6 md:px-12 pt-4">
        <div className="flex items-center gap-4">
          <div className="relative w-10 h-10 flex items-center justify-center">
            <RefreshCw className="w-8 h-8 text-[#00A0FF] absolute animate-[spin_10s_linear_infinite]" />
            <RefreshCw className="w-5 h-5 text-[#00A0FF] opacity-50" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-display font-bold text-white tracking-widest text-glow select-none leading-none">
              EPSTEIN <span className="text-[#00A0FF]">BRASIL</span> MAP
            </h1>
            <p className="text-[9px] text-[#00A0FF] font-black uppercase tracking-[0.3em] mt-1">
              Powered by RecomendeMe
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
           <StatsModal stats={stats} locations={locations} />
           <div className="hidden md:block text-right">
             <div className="text-[10px] text-muted-foreground tracking-widest">INVESTIGAÇÃO ATIVA</div>
             <div className="text-xs font-mono text-[#00A0FF] animate-pulse">RECOMENDEME.COM</div>
           </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 relative z-0">
        {locations && (
          <Map 
            locations={locations} 
            selectedId={selectedId} 
            onSelect={setSelectedId} 
          />
        )}
      </main>

      {/* UI Overlays */}
      {locations && (
        <Sidebar 
          locations={locations} 
          onSelect={setSelectedId} 
          selectedId={selectedId}
          categories={categories}
        />
      )}

      <LocationDrawer 
        location={selectedLocation} 
        onClose={() => setSelectedId(null)} 
      />

      {/* Bottom Timeline Section (Visible on large screens) */}
      <div className="hidden lg:block absolute bottom-0 left-80 right-0 h-48 z-10 pointer-events-none bg-gradient-to-t from-black via-black/80 to-transparent">
        <div className="pointer-events-auto h-full overflow-x-auto overflow-y-hidden pt-12 px-8 custom-scrollbar">
           {/* Horizontal ticker style timeline could go here, for now using modal/drawer timeline approach */}
        </div>
      </div>
      
      {/* Investigation Section - Drawer for Mobile/Desktop */}
      <div className="fixed bottom-4 right-4 z-30">
        <InvestigationSection events={timelineEvents || []} />
      </div>

      {/* Footer Disclaimer */}
      <footer className="absolute bottom-4 left-0 right-0 text-center pointer-events-none z-20 px-6">
        <div className="max-w-2xl mx-auto glass p-3 rounded-full border border-[#00A0FF]/20 flex items-center justify-center gap-6 pointer-events-auto">
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-white/90 font-black uppercase tracking-tight">
              Recomende<span className="text-[#00A0FF]">Me</span>
            </span>
          </div>
          <div className="h-3 w-px bg-white/10" />
          <p className="text-[9px] text-white/60 font-medium uppercase tracking-[0.1em]">
            Curadoria humana por pessoas reais — Descobertas reais, comunidade em primeiro lugar.
          </p>
          <div className="h-3 w-px bg-white/10" />
          <span className="text-[9px] text-[#00A0FF] font-black tracking-widest">RECOMENDEME.COM</span>
        </div>
      </footer>
    </div>
  );
}
