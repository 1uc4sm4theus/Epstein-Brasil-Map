import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Shield, FileText, Send, CheckCircle, ExternalLink, 
  Globe, Lock, Search, ArrowLeft, Info, Scale, 
  ChevronRight, AlertTriangle, Fingerprint
} from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTimeline } from "@/hooks/use-locations";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { ParticleBackground } from "@/components/ParticleBackground";

export function InvestigationView() {
  const { data: events, isLoading } = useTimeline();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const { toast } = useToast();

  const leads = events?.filter(e => e.type === 'lead').sort((a, b) => (b.id || 0) - (a.id || 0)) || [];
  const mainEvents = events?.filter(e => e.type !== 'lead').sort((a, b) => b.year - a.year) || [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await apiRequest("POST", "/api/timeline/lead", { 
        description, 
        externalLink: link 
      });
      const data = await res.json();
      setSubmittedId(data.shortId);
      setDescription("");
      setLink("");
      queryClient.invalidateQueries({ queryKey: ["/api/timeline"] });
      toast({
        title: "Pista registrada",
        description: `ID: ${data.shortId}. Obrigado por contribuir.`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro no envio",
        description: "Não foi possível registrar sua pista no momento.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[100] bg-[#050505] flex flex-col font-sans overflow-hidden"
    >
      <div className="absolute inset-0 z-0 opacity-30">
        <ParticleBackground />
      </div>

      {/* Header */}
      <header className="h-20 border-b border-[#8B0000]/30 bg-black/80 backdrop-blur-xl flex items-center justify-between px-10 shrink-0 z-20">
        <div className="flex items-center gap-6">
          <Link href="/">
            <button className="flex items-center gap-2 text-white/50 hover:text-white transition-colors group">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Mapa Principal</span>
            </button>
          </Link>
          <div className="h-8 w-px bg-white/10" />
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#8B0000]/20 flex items-center justify-center text-[#D4AF37] border border-[#8B0000]/30">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-serif font-bold text-white italic tracking-tight leading-none">
                DOSSIÊ <span className="text-[#D4AF37]">BRASIL</span>
              </h1>
              <p className="text-[9px] text-[#8B0000] font-black uppercase tracking-[0.3em] mt-1">
                Conexões Epstein & Pistas Anônimas
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button 
            onClick={() => setIsFormOpen(true)}
            className="bg-[#D4AF37] text-black font-black hover:bg-[#D4AF37]/90 rounded-full px-8 text-[11px] tracking-widest uppercase shadow-[0_0_20px_rgba(212,175,55,0.3)]"
          >
            ADICIONAR PISTA
          </Button>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden z-10 relative">
        {/* Left Side: Documented Facts */}
        <div className="w-1/2 overflow-y-auto p-12 custom-scrollbar border-r border-white/5 bg-gradient-to-br from-black to-[#0a0a0a]">
          <div className="max-w-xl mx-auto space-y-12">
            <section>
              <div className="flex items-center gap-3 mb-8">
                <FileText className="w-5 h-5 text-[#D4AF37]" />
                <h2 className="text-sm font-black text-white uppercase tracking-[0.3em]">Fatos Documentados</h2>
              </div>
              
              <div className="space-y-6">
                {[
                  { title: "Recrutamento & Agências", text: "Epstein planejou expandir sua rede via Ford Models Brasil (~2016). Discussões sobre compra de agências locais." },
                  { title: "Empresários Influentes", text: "Registros de tentativas de aproximação com Eike Batista, Jorge Paulo Lemann e Armínio Fraga." },
                  { title: "Caso Natal (RN)", text: "Emails envolvendo mulheres brasileiras com pedido de fotos, investigado pelo MPF brasileiro em 2026." },
                  { title: "Projetos de Arquitetura", text: "Arthur Casas (arquiteto) citado em arquivos por possível projeto na ilha particular." },
                  { title: "Nomes Citados", text: "Reinaldo Ávila da Silva, Luma de Oliveira, Luciana Gimenez e Mario Garnero Jr. figuram em arquivos ou listas." }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl hover:bg-white/[0.04] transition-colors group"
                  >
                    <h3 className="text-[#D4AF37] text-[10px] font-black uppercase tracking-widest mb-2 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#8B0000]" /> {item.title}
                    </h3>
                    <p className="text-sm text-white/70 leading-relaxed font-medium">
                      {item.text}
                    </p>
                  </motion.div>
                ))}
              </div>
            </section>

            <section className="pt-8">
              <div className="p-8 bg-[#8B0000]/5 border border-[#8B0000]/20 rounded-3xl">
                <div className="flex items-center gap-3 mb-4 text-[#8B0000]">
                  <AlertTriangle className="w-5 h-5" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Aviso Legal</span>
                </div>
                <p className="text-xs text-white/40 leading-relaxed">
                  As informações contidas neste dossiê são baseadas em arquivos públicos e investigações jornalísticas. 
                  Este espaço é dedicado à transparência e curadoria humana. Use com responsabilidade.
                </p>
              </div>
            </section>
          </div>
        </div>

        {/* Right Side: Anonymous Leads Feed */}
        <div className="w-1/2 overflow-y-auto p-12 custom-scrollbar bg-[#080808]">
          <div className="max-w-xl mx-auto space-y-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-[#8B0000]" />
                <h2 className="text-sm font-black text-white uppercase tracking-[0.3em]">Mural de Colaboração</h2>
              </div>
              <div className="px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[9px] font-black text-green-500 uppercase tracking-tighter">Live Feed</span>
              </div>
            </div>

            <div className="space-y-6">
              {leads.length === 0 && (
                <div className="text-center py-20 border-2 border-dashed border-white/5 rounded-3xl">
                  <Fingerprint className="w-12 h-12 text-white/10 mx-auto mb-4" />
                  <p className="text-white/30 text-xs font-medium uppercase tracking-widest">Nenhuma pista registrada ainda</p>
                </div>
              )}
              {leads.map((lead, i) => (
                <motion.div 
                  key={lead.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-black border border-[#8B0000]/20 rounded-3xl p-8 relative overflow-hidden group shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
                >
                  <div className="absolute top-0 right-0 px-4 py-2 bg-[#8B0000]/20 border-l border-b border-[#8B0000]/30 rounded-bl-2xl">
                    <span className="text-[10px] font-black text-[#D4AF37] tracking-widest">{lead.shortId}</span>
                  </div>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-2 h-2 rounded-full bg-[#8B0000] mt-1.5" />
                    <p className="text-sm text-white/90 leading-relaxed font-medium italic">
                      "{lead.description}"
                    </p>
                  </div>
                  {lead.externalLink && (
                    <a 
                      href={lead.externalLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[10px] text-[#00A0FF] hover:text-[#00A0FF]/80 font-black tracking-widest uppercase mt-2 group"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> Ver Evidência
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="h-20 border-t border-white/5 bg-black flex items-center justify-between px-10 shrink-0 z-20">
        <div className="flex items-center gap-4">
          <span className="text-[10px] text-white/20 font-black tracking-[0.3em] uppercase">Powered by RecomendeMe</span>
        </div>
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]" />
            <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Encriptação Ativa</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Anonimato Garantido</span>
          </div>
        </div>
      </footer>

      {/* Form Overlay */}
      <AnimatePresence>
        {isFormOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-lg bg-[#0a0a0a] border border-[#D4AF37]/20 rounded-[40px] p-12 shadow-[0_0_100px_rgba(139,0,0,0.1)] relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-30" />
              
              <div className="text-center mb-10">
                <div className="w-20 h-20 bg-[#D4AF37]/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-[#D4AF37]/10 shadow-[0_0_40px_rgba(212,175,55,0.05)]">
                  <Fingerprint className="w-10 h-10 text-[#D4AF37]" />
                </div>
                <h3 className="text-2xl font-serif text-white mb-3 italic">Canal de Denúncia Anônima</h3>
                <p className="text-xs text-white/40 leading-relaxed max-w-sm mx-auto">
                  Sua identidade é protegida por criptografia de ponta-a-ponta. 
                  Contribua com a verdade sem riscos.
                </p>
              </div>

              {!submittedId ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.2em] ml-4">Informação Investigativa</label>
                    <Textarea 
                      placeholder="Descreva a conexão, nome ou evento..."
                      className="bg-black border-white/5 text-white min-h-[120px] rounded-3xl focus:ring-1 focus:ring-[#D4AF37]/50 p-6 text-sm placeholder:text-white/20"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      maxLength={500}
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.2em] ml-4">Link da Evidência (URL)</label>
                    <Input 
                      placeholder="https://arquivo.com/prova"
                      className="bg-black border-white/5 text-white h-14 rounded-full px-6 focus:ring-1 focus:ring-[#D4AF37]/50 text-sm placeholder:text-white/20"
                      value={link}
                      onChange={(e) => setLink(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-4 pt-6">
                    <Button 
                      type="button"
                      variant="ghost"
                      className="flex-1 text-white/30 hover:text-white hover:bg-white/5 rounded-full h-14 text-[11px] font-black tracking-widest"
                      onClick={() => setIsFormOpen(false)}
                    >
                      DESCARTAR
                    </Button>
                    <Button 
                      disabled={isSubmitting || !description}
                      className="flex-[2] bg-[#D4AF37] text-black font-black hover:bg-[#D4AF37]/90 rounded-full h-14 text-[11px] tracking-widest shadow-[0_10px_30px_rgba(212,175,55,0.2)]"
                    >
                      {isSubmitting ? "ENCRIPTANDO..." : "ENVIAR PISTA"}
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-10 space-y-8">
                  <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto border border-green-500/20">
                    <CheckCircle className="w-10 h-10 text-green-500" />
                  </div>
                  <div>
                    <p className="text-white text-xl font-serif mb-4 italic">Registro Concluído</p>
                    <div className="p-6 bg-black rounded-[30px] border border-green-500/10 inline-block px-10">
                      <span className="text-[10px] text-white/30 uppercase tracking-widest block mb-2">Protocolo de Anonimato</span>
                      <span className="text-3xl font-black text-[#D4AF37] tracking-[0.2em]">{submittedId}</span>
                    </div>
                  </div>
                  <p className="text-xs text-white/40 max-w-xs mx-auto">
                    Obrigado por sua coragem. Sua pista será processada por nossa curadoria humana.
                  </p>
                  <Button 
                    className="w-full bg-white/5 text-white hover:bg-white/10 rounded-full h-14 text-[11px] font-black tracking-widest"
                    onClick={() => {
                      setIsFormOpen(false);
                      setSubmittedId(null);
                    }}
                  >
                    VOLTAR AO DOSSIÊ
                  </Button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
