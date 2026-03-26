import { db } from "./db";
import {
  locations, categories, locationCategories, timelineEvents, sources,
  type Location, type Category, type TimelineEvent, type Source, type LocationWithDetails
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getLocations(): Promise<LocationWithDetails[]>;
  getLocation(id: number): Promise<LocationWithDetails | undefined>;
  getTimelineEvents(): Promise<TimelineEvent[]>;
  createLead(lead: any): Promise<TimelineEvent>;
  seedData(): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getLocations(): Promise<LocationWithDetails[]> {
    const allLocations = await db.select().from(locations);
    
    // In a real app with many records, we'd use joins or dataloader. 
    // For this size, individual fetches or a big join is fine. 
    // Let's do a simple enrichment loop for simplicity in this demo scope.
    
    const results: LocationWithDetails[] = [];
    
    for (const loc of allLocations) {
      const locCats = await db
        .select({
          id: categories.id,
          name: categories.name,
          icon: categories.icon,
          slug: categories.slug
        })
        .from(categories)
        .innerJoin(locationCategories, eq(categories.id, locationCategories.categoryId))
        .where(eq(locationCategories.locationId, loc.id));

      const locSources = await db
        .select()
        .from(sources)
        .where(eq(sources.locationId, loc.id));

      results.push({
        ...loc,
        categories: locCats,
        sources: locSources
      });
    }

    return results;
  }

  async getLocation(id: number): Promise<LocationWithDetails | undefined> {
    const [loc] = await db.select().from(locations).where(eq(locations.id, id));
    if (!loc) return undefined;

    const locCats = await db
      .select({
        id: categories.id,
        name: categories.name,
        icon: categories.icon,
        slug: categories.slug
      })
      .from(categories)
      .innerJoin(locationCategories, eq(categories.id, locationCategories.categoryId))
      .where(eq(locationCategories.locationId, loc.id));

    const locSources = await db
      .select()
      .from(sources)
      .where(eq(sources.locationId, loc.id));

    return {
      ...loc,
      categories: locCats,
      sources: locSources
    };
  }

  async getTimelineEvents(): Promise<TimelineEvent[]> {
    return await db.select().from(timelineEvents).orderBy(timelineEvents.year);
  }

  async createLead(lead: any): Promise<TimelineEvent> {
    const [inserted] = await db.insert(timelineEvents).values(lead).returning();
    return inserted;
  }

  async seedData(): Promise<void> {
    const existing = await db.select().from(locations);
    if (existing.length > 0) return;

    // Categories
    const catData = [
      { name: "Recrutamento", icon: "👥", slug: "recrutamento" },
      { name: "Financeiro", icon: "💰", slug: "financeiro" },
      { name: "Scouting", icon: "🔭", slug: "scouting" },
      { name: "Turismo Sexual", icon: "✈️", slug: "sex-tourism" },
      { name: "Base Operacional", icon: "🏢", slug: "base" }
    ];

    const insertedCats = await db.insert(categories).values(catData).returning();
    const catMap = new Map(insertedCats.map(c => [c.slug, c.id]));

    // Locations Data (from user file)
    const cities = [
      {
        name: "Aracati (CE) / Canoa Quebrada",
        type: "Pequena / Praia turística",
        lat: -4.528,
        lng: -37.734,
        description: "Brunel enviou fotos de Canoa Quebrada para Epstein (e-mails 2011). Menções a praias isoladas para scouting.",
        yearRange: "2010-2016",
        cats: ["recrutamento", "scouting"],
        links: [
          { title: "Jean-Luc Brunel Connection", url: "#" },
          { title: "E-mails com fotos 'Aracati-20111121'", url: "#" }
        ]
      },
      {
        name: "Fortaleza (CE)",
        type: "Capital / Grande cidade",
        lat: -3.730,
        lng: -38.527,
        description: "Destino frequente de Brunel (chegadas noturnas, e-mails de 2013). Base para visitas a praias próximas.",
        yearRange: "2010-2016",
        cats: ["base", "recrutamento"],
        links: [
          { title: "Arquivos DOJ", url: "#" }
        ]
      },
      {
        name: "Natal (RN)",
        type: "Capital / Cidade média",
        lat: -5.794,
        lng: -35.211,
        description: "E-mails de 2011 mencionam jovem pobre da periferia. Intermediária apresenta garota a Epstein.",
        yearRange: "2011",
        cats: ["recrutamento", "financeiro"],
        links: [
          { title: "MPF Investigation", url: "#" }
        ]
      },
      {
        name: "São Paulo (SP)",
        type: "Metrópole",
        lat: -23.550,
        lng: -46.633,
        description: "Epstein menciona viagens a SP (e-mails 2006-2008). Compra de apartamento na Vila Olímpia (2003).",
        yearRange: "2003-2008+",
        cats: ["financeiro", "base"],
        links: [
          { title: "InfoMoney Report", url: "#" }
        ]
      },
      {
        name: "Rio de Janeiro (RJ)",
        type: "Capital / Metrópole",
        lat: -22.906,
        lng: -43.172,
        description: "Visitas de Brunel. Citado em arquivos JPMorgan como exemplo de turismo sexual.",
        yearRange: "2006-2019",
        cats: ["sex-tourism", "recrutamento"],
        links: [
          { title: "The Guardian", url: "#" }
        ]
      },
      {
        name: "Belo Horizonte (MG)",
        type: "Capital",
        lat: -19.916,
        lng: -43.935,
        description: "Brunel passou pela cidade em expedições de scouting (2012-2016).",
        yearRange: "2012-2016",
        cats: ["recrutamento"],
        links: [
          { title: "Agência Pública", url: "#" }
        ]
      },
      {
        name: "Santa Catarina (Balneário Camboriú)",
        type: "Área turística de luxo",
        lat: -27.000,
        lng: -48.500,
        description: "Celular de Brunel rastreado no Infinity Blue Resort & Spa. Maxwell também na região (2019).",
        yearRange: "2019",
        cats: ["base", "scouting"],
        links: [
          { title: "Sky News", url: "#" }
        ]
      }
    ];

    for (const city of cities) {
      const [loc] = await db.insert(locations).values({
        name: city.name,
        type: city.type,
        lat: city.lat,
        lng: city.lng,
        description: city.description,
        yearRange: city.yearRange,
        imageUrl: `https://source.unsplash.com/800x600/?${encodeURIComponent(city.name.split('/')[0].trim())},city`
      }).returning();

      for (const catSlug of city.cats) {
        const catId = catMap.get(catSlug);
        if (catId) {
          await db.insert(locationCategories).values({
            locationId: loc.id,
            categoryId: catId
          });
        }
      }

      for (const link of city.links) {
        await db.insert(sources).values({
          locationId: loc.id,
          title: link.title,
          url: link.url
        });
      }
    }

    // Timeline Events
    await db.insert(timelineEvents).values([
      { year: 2003, title: "Apartamento em SP", description: "Epstein compra imóvel na Vila Olímpia, São Paulo." },
      { year: 2006, title: "Início das Viagens", description: "Primeiros registros frequentes de e-mails sobre viagens ao Brasil." },
      { year: 2011, title: "Canoa Quebrada", description: "Fotos enviadas por Brunel a Epstein focando em praias do Ceará." },
      { year: 2019, title: "Fuga e Rastreamento", description: "Jean-Luc Brunel rastreado em resort de luxo em Santa Catarina pouco antes de sua prisão." },
      { year: 2026, title: "MPF Investigação", description: "Ministério Público Federal abre novo inquérito baseado em novos arquivos liberados." }
    ]);
  }
}

export const storage = new DatabaseStorage();
