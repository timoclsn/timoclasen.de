import { z } from "zod";

const envVarSchema = z.string().min(1);

const envSchema = z.object({
  // Server

  // Contentful
  CONTENTFUL_SPACE_ID: envVarSchema,
  CONTENTFUL_ACCESS_TOKEN: envVarSchema,
  CONTENTFUL_PREVIEW_SECRET: envVarSchema,
  CONTENTFUL_PREVIEW_ACCESS_TOKEN: envVarSchema,

  // homee
  HOMEE_ID: envVarSchema,
  HOMEE_ACCESS_TOKEN: envVarSchema,

  // Mapbox
  MAPBOX_ACCESS_TOKEN: envVarSchema,

  // Spotify
  SPOTIFY_CLIENT_ID: envVarSchema,
  SPOTIFY_CLIENT_SECRET: envVarSchema,
  SPOTIFY_REFRESH_TOKEN: envVarSchema,

  // Strava
  STRAVA_CLIENT_ID: envVarSchema,
  STRAVA_CLIENT_SECRET: envVarSchema,
  STRAVA_REFRESH_TOKEN: envVarSchema,

  // Turso DB
  TURSO_DATABASE_URL: envVarSchema,
  TURSO_AUTH_TOKEN: envVarSchema,

  // Grafana
  GRAFANA_CLOUD_API_KEY: envVarSchema,

  // Client

  // Vercel
  NEXT_PUBLIC_VERCEL_ENV: z
    .enum(["production", "preview", "development"])
    .optional(),
});

envSchema.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.input<typeof envSchema> {}
  }
}
