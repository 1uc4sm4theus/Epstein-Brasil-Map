import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Initialize seed data
  await storage.seedData();

  app.get(api.locations.list.path, async (req, res) => {
    const locations = await storage.getLocations();
    res.json(locations);
  });

  app.get(api.locations.get.path, async (req, res) => {
    const location = await storage.getLocation(Number(req.params.id));
    if (!location) {
      return res.status(404).json({ message: "Location not found" });
    }
    res.json(location);
  });

  app.get(api.timeline.list.path, async (req, res) => {
    const events = await storage.getTimelineEvents();
    res.json(events);
  });

  app.post("/api/timeline/lead", async (req, res) => {
    try {
      const { description, externalLink } = req.body;
      const shortId = `BR-EP-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      const newLead = await storage.createLead({
        year: new Date().getFullYear(),
        title: `Pista Anônima: ${shortId}`,
        description: description || "Contribuição da comunidade via RecomendeMe.",
        type: "lead",
        externalLink,
        shortId
      });
      res.json(newLead);
    } catch (error) {
      res.status(500).json({ message: "Erro ao registrar pista" });
    }
  });

  app.get(api.stats.get.path, async (req, res) => {
    const locations = await storage.getLocations();
    
    // Calculate stats by state (simple regex from name ex: "Fortaleza (CE)")
    const stateCounts: Record<string, number> = {};
    
    locations.forEach(loc => {
      const match = loc.name.match(/\(([A-Z]{2})\)/);
      const state = match ? match[1] : 'Outros';
      stateCounts[state] = (stateCounts[state] || 0) + 1;
    });

    // Neon colors for the chart
    const colors = ["#b026ff", "#00ff9d", "#00d4ff", "#ff007a", "#ffff00"];
    
    const byState = Object.entries(stateCounts).map(([name, value], index) => ({
      name,
      value,
      fill: colors[index % colors.length]
    }));

    res.json({ byState });
  });

  return httpServer;
}
