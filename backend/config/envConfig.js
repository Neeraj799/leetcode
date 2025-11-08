import dotenv from "dotenv";
dotenv.config({ quiet: true });

const envConfig = {
  general: {
    PORT: process.env.PORT || 8080,
    APP_KEY: process.env.SECRET_KEY || "testkey",
  },

  db: {
    URL: process.env.MONGO_URL,
    CLIENT_BASE_URL: process.env.CLIENT_BASE_URL,
  },

  inngest: {
    INNGEST_EVENT_KEY: process.env.INNGEST_EVENT_KEY,
    INNGEST_SIGNING_KEY: process.env.INNGEST_SIGNING_KEY,
  },

  stream: {
    STREAM_API_KEY: process.env.STREAM_API_KEY,
    STREAM_API_SECRET: process.env.STREAM_API_SECRET,
  },

  clerk: {
    CLERK_PUBLISHABLE_KEY: process.env.CLERK_PUBLISHABLE_KEY,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
  },
};

export default envConfig;
