// Datadog browser logging — requires @datadog/browser-logs and @datadog/browser-rum
// To enable: npm install @datadog/browser-logs @datadog/browser-rum
// Then uncomment the initialization below and set your client token.

export function initDatadogBrowser(): void {
  // Uncomment when ready:
  // import { datadogLogs } from "@datadog/browser-logs";
  // datadogLogs.init({
  //   clientToken: "<YOUR_CLIENT_TOKEN>",
  //   site: "datadoghq.com",
  //   service: "command-center-frontend",
  //   env: "development",
  //   forwardErrorsToLogs: true,
  //   sessionSampleRate: 100,
  // });

  console.log("[datadog] Browser logging not configured — set client token to enable");
}
