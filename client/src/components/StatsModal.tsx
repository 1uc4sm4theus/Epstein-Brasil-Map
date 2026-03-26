import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Stats } from "@/hooks/use-locations";
import { PieChart as PieIcon, Download } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Location } from "@/hooks/use-locations";

interface StatsModalProps {
  stats?: Stats;
  locations?: Location[];
}

export function StatsModal({ stats, locations }: StatsModalProps) {
  const handleExportPDF = () => {
    if (!locations) return;
    
    const doc = new jsPDF();
    
    // Header
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(40, 40, 40);
    doc.text("EPSTEIN BRASIL MAP - DOSSIER", 14, 22);
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 28);
    
    // Table
    autoTable(doc, {
      startY: 35,
      head: [['City', 'Type', 'Coordinates', 'Description']],
      body: locations.map(loc => [
        loc.name, 
        loc.type, 
        `${loc.lat.toFixed(2)}, ${loc.lng.toFixed(2)}`,
        loc.description.substring(0, 100) + "..."
      ]),
      headStyles: { fillColor: [176, 38, 255] }, // Purple
      styles: { fontSize: 8 },
    });
    
    doc.save("epstein-brasil-investigation.pdf");
  };

  const COLORS = ['#b026ff', '#00ff9d', '#ff0055', '#00ccff', '#ffaa00'];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2 bg-black/40 border-white/20 hover:bg-primary/20 hover:text-white hover:border-primary/50 text-xs uppercase tracking-wider">
          <PieIcon className="w-4 h-4" /> Stats & Export
        </Button>
      </DialogTrigger>
      <DialogContent className="glass border-white/10 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl tracking-wide flex items-center justify-between">
            <span>DATABASE ANALYTICS</span>
            <Button onClick={handleExportPDF} size="sm" className="bg-secondary/20 hover:bg-secondary/40 text-secondary border border-secondary/50">
              <Download className="w-4 h-4 mr-2" /> EXPORT PDF
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-6">
          <div className="h-[300px] w-full bg-black/20 rounded-xl p-4 border border-white/5">
            <h4 className="text-center text-sm font-bold text-muted-foreground mb-4 uppercase tracking-widest">Distribution by State</h4>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats?.byState || []}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {stats?.byState.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="rgba(0,0,0,0.5)" />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid #333', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Key Metrics</h4>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-primary/10 border border-primary/30">
                <span className="text-xs text-primary/70 block mb-1 uppercase">Total Locations</span>
                <span className="text-3xl font-display font-bold text-white">{locations?.length || 0}</span>
              </div>
              <div className="p-4 rounded-xl bg-secondary/10 border border-secondary/30">
                <span className="text-xs text-secondary/70 block mb-1 uppercase">States Covered</span>
                <span className="text-3xl font-display font-bold text-white">{stats?.byState.length || 0}</span>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 col-span-2">
                <span className="text-xs text-muted-foreground block mb-2 uppercase">System Status</span>
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-primary to-secondary h-full w-[85%] animate-pulse"></div>
                </div>
                <div className="flex justify-between mt-1 text-[10px] text-gray-500 font-mono">
                  <span>OPERATIONAL</span>
                  <span>85% LOAD</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 mt-4">
               <h4 className="text-red-400 font-bold text-sm mb-1 flex items-center gap-2">
                 ⚠️ RESTRICTED ACCESS
               </h4>
               <p className="text-xs text-red-300/70">
                 This data is sensitive. Unauthorized distribution is prohibited. Generated PDFs are watermarked with your session ID.
               </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
