import { useEffect, useRef } from "react";
import { Database, Info, ArrowLeft, Maximize2, ZoomIn, ZoomOut, RefreshCw } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";

declare global {
  interface Window {
    vis: any;
  }
}

export function GraphView() {
  const containerRef = useRef<HTMLDivElement>(null);
  const networkRef = useRef<any>(null);

  const handleZoomIn = () => {
    if (networkRef.current) {
      const scale = networkRef.current.getScale();
      networkRef.current.moveTo({ scale: scale * 1.2 });
    }
  };

  const handleZoomOut = () => {
    if (networkRef.current) {
      const scale = networkRef.current.getScale();
      networkRef.current.moveTo({ scale: scale / 1.2 });
    }
  };

  const handleReset = () => {
    if (networkRef.current) {
      networkRef.current.fit({ animation: true });
    }
  };

  useEffect(() => {
    if (!containerRef.current || !window.vis) return;

    const nodes = new window.vis.DataSet([
      { id: 1, label: "<b>Jeffrey Epstein</b>", color: { background: "#FFFFFF", border: "#00A0FF" }, shape: "ellipse", size: 50, font: { multi: 'html', size: 20, color: '#000000', face: 'Inter, Montserrat, sans-serif' } },
      { id: 2, label: "Jean-Luc Brunel", color: { background: "#000000", border: "#00A0FF" }, shape: "box", margin: 12, font: { color: '#FFFFFF', face: 'Inter, sans-serif' } },
      { id: 3, label: "Ghislaine Maxwell", color: { background: "#000000", border: "#00A0FF" }, shape: "box", margin: 12, font: { color: '#FFFFFF', face: 'Inter, sans-serif' } },
      { id: 4, label: "MC2 Model", color: { background: "#000000", border: "#00A0FF" }, shape: "box", margin: 10, font: { color: '#FFFFFF', face: 'Inter, sans-serif' } },
      { id: 5, label: "<b>São Paulo</b>\n(Vila Olímpia)", color: { background: "#000000", border: "#FFFFFF" }, shape: "box", font: { multi: 'html', color: "#FFFFFF", face: 'Inter, sans-serif' }, margin: 10 },
      { id: 6, label: "<b>Rio de Janeiro</b>\n(Carnaval)", color: { background: "#000000", border: "#FFFFFF" }, shape: "box", font: { multi: 'html', color: "#FFFFFF", face: 'Inter, sans-serif' }, margin: 10 },
      { id: 7, label: "<b>Fortaleza (CE)</b>", color: { background: "#000000", border: "#FFFFFF" }, shape: "box", font: { multi: 'html', color: "#FFFFFF", face: 'Inter, sans-serif' }, margin: 10 },
      { id: 8, label: "<b>Canoa Quebrada (CE)</b>", color: { background: "#000000", border: "#FFFFFF" }, shape: "box", font: { multi: 'html', color: "#FFFFFF", face: 'Inter, sans-serif' }, margin: 10 },
      { id: 9, label: "<b>Natal (RN)</b>", color: { background: "#000000", border: "#FFFFFF" }, shape: "box", font: { multi: 'html', color: "#FFFFFF", face: 'Inter, sans-serif' }, margin: 10 },
      { id: 10, label: "<b>Vitória (ES)</b>", color: { background: "#000000", border: "#FFFFFF" }, shape: "box", font: { multi: 'html', color: "#FFFFFF", face: 'Inter, sans-serif' }, margin: 10 },
      { id: 11, label: "<b>Belo Horizonte (MG)</b>", color: { background: "#000000", border: "#FFFFFF" }, shape: "box", font: { multi: 'html', color: "#FFFFFF", face: 'Inter, sans-serif' }, margin: 10 },
      { id: 12, label: "<b>Brasília (DF)</b>", color: { background: "#000000", border: "#FFFFFF" }, shape: "box", font: { multi: 'html', color: "#FFFFFF", face: 'Inter, sans-serif' }, margin: 10 },
      { id: 13, label: "<b>Santa Catarina</b>", color: { background: "#000000", border: "#FFFFFF" }, shape: "box", font: { multi: 'html', color: "#FFFFFF", face: 'Inter, sans-serif' }, margin: 10 },
      { id: 14, label: "Alexia", color: { background: "#00A0FF", border: "#FFFFFF" }, shape: "dot", size: 15, font: { color: "#FFFFFF", face: 'Inter, sans-serif' } },
      { id: 15, label: "Jamile", color: { background: "#00A0FF", border: "#FFFFFF" }, shape: "dot", size: 15, font: { color: "#FFFFFF", face: 'Inter, sans-serif' } },
      { id: 16, label: "Alana", color: { background: "#00A0FF", border: "#FFFFFF" }, shape: "dot", size: 15, font: { color: "#FFFFFF", face: 'Inter, sans-serif' } },
    ]);

    const edges = new window.vis.DataSet([
      { from: 1, to: 2, label: "financiou", width: 2, color: { color: "rgba(255, 255, 255, 0.2)", highlight: "#00A0FF" } },
      { from: 1, to: 3, label: "parceira", width: 2, color: { color: "rgba(255, 255, 255, 0.2)", highlight: "#00A0FF" } },
      { from: 1, to: 4, label: "financiou", width: 1.5, color: { color: "rgba(255, 255, 255, 0.15)", highlight: "#00A0FF" } },
      { from: 4, to: 2, label: "recrutador", width: 1.5, color: { color: "rgba(255, 255, 255, 0.15)", highlight: "#00A0FF" } },
      { from: 1, to: 5, label: "imóvel", width: 1.5, color: { color: "rgba(0, 160, 255, 0.2)", highlight: "#00A0FF" } },
      { from: 1, to: 6, label: "visitas", width: 1.5, color: { color: "rgba(0, 160, 255, 0.2)", highlight: "#00A0FF" } },
      { from: 2, to: 7, label: "e-mails", width: 1.5, color: { color: "rgba(0, 160, 255, 0.2)", highlight: "#00A0FF" } },
      { from: 2, to: 8, label: "fotos", width: 1.5, color: { color: "rgba(0, 160, 255, 0.2)", highlight: "#00A0FF" } },
      { from: 2, to: 9, label: "contatos", width: 1.5, color: { color: "rgba(0, 160, 255, 0.2)", highlight: "#00A0FF" } },
      { from: 2, to: 10, label: "casting", width: 1.5, color: { color: "rgba(0, 160, 255, 0.2)", highlight: "#00A0FF" } },
      { from: 2, to: 11, label: "viagens", width: 1.5, color: { color: "rgba(0, 160, 255, 0.2)", highlight: "#00A0FF" } },
      { from: 2, to: 12, label: "agências", width: 1.5, color: { color: "rgba(0, 160, 255, 0.2)", highlight: "#00A0FF" } },
      { from: 2, to: 13, label: "visitas", width: 1.5, color: { color: "rgba(0, 160, 255, 0.2)", highlight: "#00A0FF" } },
      { from: 14, to: 9, label: "intermediária", width: 1.5, color: { color: "rgba(0, 160, 255, 0.2)", highlight: "#00A0FF" } },
      { from: 14, to: 15, label: "fotos", width: 1, color: { color: "rgba(0, 160, 255, 0.15)", highlight: "#00A0FF" } },
      { from: 14, to: 16, label: "familiar", width: 1, color: { color: "rgba(0, 160, 255, 0.15)", highlight: "#00A0FF" } },
      { from: 9, to: 1, label: "grooming", dashes: true, color: { color: "rgba(255, 0, 0, 0.3)", highlight: "#FF0000" }, width: 2 },
    ]);

    const data = { nodes, edges };
    const options = {
      nodes: {
        font: { 
          size: 16, 
          face: "Inter",
        },
        borderWidth: 2,
        shadow: {
          enabled: true,
          color: "rgba(0,0,0,0.5)",
          size: 10,
          x: 5,
          y: 5
        }
      },
      edges: {
        font: { 
          size: 12, 
          color: "#94a3b8",
          background: "rgba(10, 10, 10, 0.8)",
          strokeWidth: 0
        },
        arrows: { to: { enabled: true, scaleFactor: 0.5 } },
        smooth: { type: "continuous" },
        hoverWidth: 1.5,
        selectionWidth: 2
      },
      physics: {
        enabled: true,
        solver: "forceAtlas2Based",
        forceAtlas2Based: {
          gravitationalConstant: -100,
          centralGravity: 0.01,
          springLength: 200,
          springConstant: 0.08,
          damping: 0.4,
          avoidOverlap: 1
        },
        stabilization: {
          enabled: true,
          iterations: 1000,
          updateInterval: 25
        }
      },
      interaction: {
        hover: true,
        navigationButtons: false,
        zoomView: true,
        dragView: true,
        tooltipDelay: 200,
      },
    };

    networkRef.current = new window.vis.Network(containerRef.current, data, options);
    
    // Fit on load
    networkRef.current.once('stabilizationIterationsDone', () => {
      networkRef.current.fit();
    });

    return () => {
      if (networkRef.current) {
        networkRef.current.destroy();
      }
    };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-[#050505] z-[60] flex flex-col font-sans"
    >
      {/* Dynamic Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Enhanced Header */}
      <header className="h-20 border-b border-white/10 glass flex items-center justify-between px-8 shrink-0 z-10">
        <div className="flex items-center gap-6">
          <Link href="/">
            <button className="p-2.5 hover:bg-white/10 rounded-xl transition-all border border-transparent hover:border-white/10 group flex items-center gap-2">
              <ArrowLeft className="w-5 h-5 text-primary group-hover:-translate-x-1 transition-transform" />
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground group-hover:text-white">Voltar ao Mapa</span>
            </button>
          </Link>
          <div className="h-8 w-px bg-white/10" />
          <div>
            <h1 className="text-xl font-display font-bold text-primary flex items-center gap-2 tracking-tight">
              <Database className="w-5 h-5 text-secondary animate-pulse" />
              REDE DE INFLUÊNCIA BRASIL
            </h1>
            <p className="text-[9px] text-muted-foreground uppercase tracking-[0.3em] font-medium opacity-70">Arquivo Classificado • Verificação Nível 4</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex bg-black/40 p-1 rounded-xl border border-white/10 shadow-inner">
            <button onClick={handleZoomIn} className="p-2 hover:bg-white/10 rounded-lg text-muted-foreground hover:text-white transition-colors" title="Zoom In">
              <ZoomIn className="w-5 h-5" />
            </button>
            <button onClick={handleZoomOut} className="p-2 hover:bg-white/10 rounded-lg text-muted-foreground hover:text-white transition-colors" title="Zoom Out">
              <ZoomOut className="w-5 h-5" />
            </button>
            <button onClick={handleReset} className="p-2 hover:bg-white/10 rounded-lg text-muted-foreground hover:text-white transition-colors" title="Centralizar">
              <Maximize2 className="w-5 h-5" />
            </button>
          </div>
          <button onClick={() => window.location.reload()} className="p-2.5 bg-primary/10 border border-primary/30 rounded-xl text-primary hover:bg-primary/20 transition-all shadow-[0_0_15px_rgba(176,38,255,0.2)]">
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
      </header>

      <div className="flex-1 relative overflow-hidden bg-black">
        {/* Dynamic Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
        <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
        
        {/* Floating Legend */}
        <motion.div 
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute top-8 right-8 p-6 bg-black/90 rounded-2xl border border-[#00A0FF]/30 max-w-xs space-y-5 pointer-events-none shadow-[0_0_40px_rgba(0,160,255,0.15)] backdrop-blur-2xl"
        >
          <h3 className="text-[10px] font-black text-[#00A0FF] uppercase tracking-[0.2em] flex items-center gap-2 mb-2 border-b border-[#00A0FF]/20 pb-2">
            <Info className="w-3.5 h-3.5" /> Classificação de Nós
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4 group">
              <div className="w-4 h-4 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.4)] border border-[#00A0FF]" /> 
              <div className="flex flex-col">
                <span className="text-xs font-black text-white uppercase tracking-tight">Alvo Principal</span>
                <span className="text-[9px] text-[#00A0FF] font-bold uppercase tracking-wider">Jeffrey Epstein</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-4 h-4 rounded-md bg-black border border-[#00A0FF] shadow-[0_0_10px_rgba(0,160,255,0.3)]" /> 
              <div className="flex flex-col">
                <span className="text-xs font-black text-white uppercase tracking-tight">Operadores / Rede</span>
                <span className="text-[9px] text-white/40 font-bold uppercase tracking-wider">Associados Diretos</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-4 h-4 rounded bg-black border border-white/40" /> 
              <div className="flex flex-col">
                <span className="text-xs font-black text-white uppercase tracking-tight">Geolocalização</span>
                <span className="text-[9px] text-white/40 font-bold uppercase tracking-wider">Cidades no Brasil</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-4 h-4 rounded-full bg-[#00A0FF] border border-white/20 shadow-[0_0_10px_rgba(0,160,255,0.3)]" /> 
              <div className="flex flex-col">
                <span className="text-xs font-black text-white uppercase tracking-tight">Intermediários</span>
                <span className="text-[9px] text-white/40 font-bold uppercase tracking-wider">Contatos Locais</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Left Badge */}
        <div className="absolute bottom-8 left-8 flex flex-col gap-1">
          <div className="flex items-center gap-2 bg-black border border-[#00A0FF]/40 px-3 py-1.5 rounded-full shadow-[0_0_20px_rgba(0,160,255,0.1)]">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00A0FF] animate-pulse shadow-[0_0_8px_#00A0FF]" />
            <span className="text-[9px] font-black text-white uppercase tracking-[0.2em]">Status: Conexão Verificada</span>
          </div>
        </div>
      </div>

      <footer className="h-24 border-t border-white/10 bg-black flex items-center justify-between px-10 shrink-0 z-20 shadow-[0_-10px_30px_rgba(0,0,0,0.8)]">
        <div className="flex items-center gap-4">
          <div className="relative w-10 h-10 flex items-center justify-center">
            <RefreshCw className="w-8 h-8 text-[#00A0FF] absolute animate-[spin_10s_linear_infinite]" />
            <RefreshCw className="w-5 h-5 text-[#00A0FF] opacity-50" />
          </div>
          <div className="flex flex-col">
            <p className="text-[13px] font-black text-white uppercase tracking-tighter leading-none">
              Mapa de Conexões: Jeffrey Epstein & Brasil
            </p>
            <p className="text-[11px] text-[#00A0FF] font-bold uppercase tracking-widest mt-1">
              Curadoria humana por pessoas reais
            </p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-[11px] text-white/90 font-medium leading-relaxed">
            Powered by <span className="font-black tracking-tight">Recomende<span className="text-[#00A0FF]">Me</span></span> — Descobertas reais, comunidade em primeiro lugar. Sem algoritmos opacos.
          </p>
          <div className="flex items-center justify-end gap-3 mt-1.5">
            <span className="text-[10px] text-[#00A0FF] font-black tracking-widest">RECOMENDEME.COM</span>
            <span className="text-[10px] text-white/40 font-bold tracking-widest">#CURADORIAHUMANA</span>
            <span className="text-[10px] text-white/40 font-bold tracking-widest">#RECOMENDEME</span>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}
