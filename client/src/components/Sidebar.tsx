import { useState } from "react";
import { Location } from "@/hooks/use-locations";
import { Search, MapPin, Filter, Database, Download, Share2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Link, useLocation } from "wouter";

interface SidebarProps {
  locations: Location[];
  onSelect: (id: number) => void;
  selectedId: number | null;
  categories: string[]; // List of unique categories derived from data
}

export function Sidebar({ locations, onSelect, selectedId, categories }: SidebarProps) {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("Todas");
  const [location] = useLocation();

  const filteredLocations = locations.filter(loc => {
    const matchesSearch = loc.name.toLowerCase().includes(search.toLowerCase()) || 
                          loc.description.toLowerCase().includes(search.toLowerCase());
    
    const matchesFilter = activeFilter === "Todas" || 
                          loc.categories.some(c => c.name === activeFilter) ||
                          (activeFilter === "Pequenas" && loc.type === "Pequena");

    return matchesSearch && matchesFilter;
  });

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.text("Epstein Brasil Map - Relatório de Cidades", 14, 20);
    
    const tableData = filteredLocations.map(loc => [
      loc.name,
      loc.type,
      loc.categories.map(c => c.name).join(", "),
      loc.yearRange || "N/A"
    ]);

    autoTable(doc, {
      startY: 30,
      head: [["Cidade", "Tipo", "Categorias", "Período"]],
      body: tableData,
      theme: "grid",
      headStyles: { fillColor: [176, 38, 255] }, // Primary purple
    });

    doc.save("epstein-brasil-report.pdf");
  };

  return (
    <aside className="fixed left-4 top-24 bottom-4 w-80 glass rounded-2xl z-20 flex flex-col overflow-hidden border-l-4 border-l-primary/50 transition-all duration-300 hidden md:flex">
      {/* Header */}
      <div className="p-6 border-b border-white/10 bg-black/20 flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-display font-bold text-primary flex items-center gap-2">
            <Database className="w-5 h-5 text-secondary animate-pulse" />
            DATABASE_V1
          </h2>
          <p className="text-xs text-muted-foreground mt-1 uppercase tracking-widest">Accessing Secure Records</p>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="px-4 py-2 flex gap-2 border-b border-white/5">
        <Link href="/">
          <a className={`flex-1 text-center py-2 text-xs font-bold uppercase tracking-widest rounded-lg transition-all ${location === "/" ? "bg-primary/20 text-primary border border-primary/30" : "text-muted-foreground hover:bg-white/5"}`}>
            Mapa
          </a>
        </Link>
        <Link href="/connections">
          <a className={`flex-1 text-center py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${location === "/connections" ? "bg-[#00A0FF]/20 text-[#00A0FF] border border-[#00A0FF]/30" : "text-white/40 hover:bg-white/5"}`}>
            Grafo
          </a>
        </Link>
        <Link href="/investigation">
          <a className={`flex-1 text-center py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${location === "/investigation" ? "bg-[#8B0000]/20 text-[#D4AF37] border border-[#8B0000]/30 shadow-[0_0_15px_rgba(139,0,0,0.2)]" : "text-white/40 hover:bg-white/5"}`}>
            Dossiê
          </a>
        </Link>
      </div>

      {/* Search & Filter */}
      <div className="p-4 space-y-4">
        {location === "/" ? (
          <>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search locations..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-muted-foreground/50"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => setActiveFilter("Todas")}
                className={`text-xs px-3 py-1 rounded-full border transition-all ${activeFilter === "Todas" ? "bg-primary/20 border-primary text-primary shadow-[0_0_10px_rgba(176,38,255,0.3)]" : "bg-transparent border-white/10 text-muted-foreground hover:border-white/30"}`}
              >
                All
              </button>
              {categories.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`text-xs px-3 py-1 rounded-full border transition-all ${activeFilter === cat ? "bg-secondary/20 border-secondary text-secondary shadow-[0_0_10px_rgba(0,255,157,0.3)]" : "bg-transparent border-white/10 text-muted-foreground hover:border-white/30"}`}
                >
                  {cat}
                </button>
              ))}
              <button 
                onClick={() => setActiveFilter("Pequenas")}
                className={`text-xs px-3 py-1 rounded-full border transition-all ${activeFilter === "Pequenas" ? "bg-blue-500/20 border-blue-500 text-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.3)]" : "bg-transparent border-white/10 text-muted-foreground hover:border-white/30"}`}
              >
                Small Cities
              </button>
            </div>
          </>
        ) : (
          <div className="py-4 text-center">
            <Share2 className="w-12 h-12 text-primary/30 mx-auto mb-2" />
            <p className="text-xs text-muted-foreground px-4">
              Explore o grafo de conexões para entender a rede de influência e recrutamento no Brasil.
            </p>
          </div>
        )}
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar">
        {location === "/" && (
          <AnimatePresence>
            {filteredLocations.map((loc) => (
              <motion.div
                key={loc.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onClick={() => onSelect(loc.id)}
                className={`p-4 rounded-xl cursor-pointer border transition-all duration-200 group relative overflow-hidden ${
                  selectedId === loc.id 
                    ? "bg-primary/10 border-primary/50 shadow-[0_0_15px_rgba(176,38,255,0.2)]" 
                    : "bg-transparent border-transparent hover:bg-white/5 hover:border-white/10"
                }`}
              >
                {/* Hover effect bar */}
                <div className={`absolute left-0 top-0 bottom-0 w-1 transition-colors ${selectedId === loc.id ? "bg-primary" : "bg-transparent group-hover:bg-white/20"}`} />
                
                <div className="flex justify-between items-start pl-2">
                  <div>
                    <h3 className={`font-display font-bold text-lg ${selectedId === loc.id ? "text-white" : "text-muted-foreground group-hover:text-white"}`}>
                      {loc.name}
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground/70 mt-1">
                      <MapPin className="w-3 h-3" />
                      <span>{loc.lat.toFixed(2)}, {loc.lng.toFixed(2)}</span>
                    </div>
                  </div>
                  {loc.type === "Capital" && (
                    <span className="text-[10px] uppercase tracking-wider bg-white/5 px-1.5 py-0.5 rounded text-muted-foreground border border-white/5">Cap</span>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
        
        {location === "/" && filteredLocations.length === 0 && (
          <div className="p-8 text-center text-muted-foreground text-sm opacity-50">
            No records found in database.
          </div>
        )}
      </div>

      {/* Footer Status */}
      <div className="p-3 bg-black/40 border-t border-white/10 text-[10px] text-muted-foreground flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <span>Records: {filteredLocations.length}</span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
            ONLINE
          </span>
        </div>
        <button 
          onClick={exportPDF}
          className="hover:text-primary transition-colors flex items-center gap-1"
          title="Export Report"
        >
          <Download className="w-3 h-3" />
          PDF
        </button>
      </div>
    </aside>
  );
}
