import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: "https://e552d3ad04dcd840c54268fae5a3178f@o4508991830753280.ingest.us.sentry.io/4508991840452608",
  integrations: [
    Sentry.mongoIntegration()
  ],
  registerEsmLoaderHooks: false,
  tracesSampleRate: 1.0,
});

