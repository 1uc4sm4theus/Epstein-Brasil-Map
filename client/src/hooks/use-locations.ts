import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";

// Define Types based on Schema manually if needed, or rely on API response inference
export interface Location {
  id: number;
  name: string;
  type: string;
  lat: number;
  lng: number;
  description: string;
  yearRange: string | null;
  imageUrl: string | null;
  categories: {
    id: number;
    name: string;
    icon: string;
    slug: string;
  }[];
  sources: {
    title: string;
    url: string;
  }[];
}

export interface TimelineEvent {
  id: number;
  year: number;
  title: string;
  description: string;
  locationId: number | null;
}

export interface Stats {
  byState: {
    name: string;
    value: number;
    fill: string;
  }[];
}

export function useLocations() {
  return useQuery({
    queryKey: [api.locations.list.path],
    queryFn: async () => {
      const res = await fetch(api.locations.list.path);
      if (!res.ok) throw new Error("Failed to fetch locations");
      return await res.json() as Location[];
    },
  });
}

export function useLocation(id: number | null) {
  return useQuery({
    queryKey: [api.locations.get.path, id],
    queryFn: async () => {
      if (!id) return null;
      const url = buildUrl(api.locations.get.path, { id });
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch location details");
      return await res.json() as Location;
    },
    enabled: !!id,
  });
}

export function useTimeline() {
  return useQuery({
    queryKey: [api.timeline.list.path],
    queryFn: async () => {
      const res = await fetch(api.timeline.list.path);
      if (!res.ok) throw new Error("Failed to fetch timeline");
      return await res.json() as TimelineEvent[];
    },
  });
}

export function useStats() {
  return useQuery({
    queryKey: [api.stats.get.path],
    queryFn: async () => {
      const res = await fetch(api.stats.get.path);
      if (!res.ok) throw new Error("Failed to fetch stats");
      return await res.json() as Stats;
    },
  });
}
