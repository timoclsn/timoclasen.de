import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]),
  CONTENTFUL_PREVIEW_SECRET: z.string().min(1),
  CONTENTFUL_SPACE_ID: z.string().min(1),
  CONTENTFUL_ACCESS_TOKEN: z.string().min(1),
  CONTENTFUL_PREVIEW_ACCESS_TOKEN: z.string().min(1),
  HOMEE_ID: z.string().min(1),
  HOMEE_ACCESS_TOKEN: z.string().min(1),
  MAPBOX_ACCESS_TOKEN: z.string().min(1),
  SPOTIFY_CLIENT_ID: z.string().min(1),
  SPOTIFY_CLIENT_SECRET: z.string().min(1),
  SPOTIFY_REFRESH_TOKEN: z.string().min(1),
  STRAVA_CLIENT_ID: z.string().min(1),
  STRAVA_CLIENT_SECRET: z.string().min(1),
  STRAVA_REFRESH_TOKEN: z.string().min(1),
  NEXT_PUBLIC_VERCEL_ENV: z.enum(["preview", "production"]).optional(),
});

envSchema.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envSchema> {}
  }
}
