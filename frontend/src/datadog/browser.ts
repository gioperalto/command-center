// Datadog browser logging — requires @datadog/browser-logs
// Set VITE_DD_CLIENT_TOKEN in your .env to enable.
import { datadogLogs } from "@datadog/browser-logs";
import { datadogRum } from '@datadog/browser-rum';

export function initDatadogBrowser(): void {
  const clientToken = import.meta.env.VITE_DD_CLIENT_TOKEN;
  const applicationId = import.meta.env.VITE_DD_APPLICATION_ID;

  if (!clientToken) {
    console.log("[datadog] Browser logging disabled — set VITE_DD_CLIENT_TOKEN in .env to enable");
    return;
  }

  datadogLogs.init({
    clientToken,
    site: import.meta.env.VITE_DD_SITE || "datadoghq.com",
    service: import.meta.env.VITE_DD_SERVICE || "command-center-frontend",
    env: import.meta.env.VITE_DD_ENV || "development",
    forwardErrorsToLogs: true,
    sessionSampleRate: 100,
  });

  console.log("[datadog] Browser logging enabled");

  if (!applicationId) {
    console.log("[datadog] RUM disabled — set VITE_DD_APPLICATION_ID in .env to enable");
    return;
  }

  datadogRum.init({
    applicationId,
    clientToken,
    site: import.meta.env.VITE_DD_SITE || "datadoghq.com",
    service: import.meta.env.VITE_DD_SERVICE || "command-center-frontend",
    env: import.meta.env.VITE_DD_ENV || "development",
    sessionReplaySampleRate: 100,
    sessionSampleRate: 100,
    trackResources: true,
    trackLongTasks: true,
    trackUserInteractions: true,
    // Propagate trace context to API requests via x-datadog-* headers
    allowedTracingUrls: [
      { match: /\/api\//, propagatorTypes: ["datadog"] },
    ],
  });

  console.log("[datadog] RUM enabled");
}
