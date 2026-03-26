import { z } from 'zod';
import { insertLocationSchema, insertTimelineEventSchema } from './schema';

export const api = {
  locations: {
    list: {
      method: 'GET' as const,
      path: '/api/locations' as const,
      responses: {
        200: z.array(z.object({
          id: z.number(),
          name: z.string(),
          type: z.string(),
          lat: z.number(),
          lng: z.number(),
          description: z.string(),
          yearRange: z.string().nullable(),
          imageUrl: z.string().nullable(),
          categories: z.array(z.object({
            id: z.number(),
            name: z.string(),
            icon: z.string(),
            slug: z.string()
          })),
          sources: z.array(z.object({
            title: z.string(),
            url: z.string()
          }))
        }))
      }
    },
    get: {
      method: 'GET' as const,
      path: '/api/locations/:id' as const,
      responses: {
        200: z.any(), // LocationWithDetails
        404: z.object({ message: z.string() })
      }
    }
  },
  timeline: {
    list: {
      method: 'GET' as const,
      path: '/api/timeline' as const,
      responses: {
        200: z.array(z.any()) // TimelineEvent[]
      }
    }
  },
  stats: {
    get: {
      method: 'GET' as const,
      path: '/api/stats' as const,
      responses: {
        200: z.object({
          byState: z.array(z.object({
            name: z.string(),
            value: z.number(),
            fill: z.string()
          }))
        })
      }
    }
  }
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
