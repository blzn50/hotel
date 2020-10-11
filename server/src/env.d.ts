declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL: string;
    CORS_ORIGIN: string;
    SENDGRID_KEY: string;
    JWT_SECRET: string;
    PORT: string;
  }
}
