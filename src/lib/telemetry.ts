/**
 * Lightweight telemetry shim used across server and client code for
 * instrumentation of key events (search failures, cache hits/misses, rate limits).
 * This is intentionally small and synchronous (console-based). Replace with a
 * proper telemetry/analytics backend in production.
 */
export function logTelemetry(event: string, payload?: Record<string, unknown>) {
  try {
    // Keep messages concise for IDE Output/Terminal visibility.
    // The project may wire this to a remote collector later.
    // Avoid throwing from telemetry paths.
    // eslint-disable-next-line no-console
    console.info(`[telemetry] ${event}`, payload ?? {});
  } catch (err) {
    // Best-effort only — swallow errors.
    // eslint-disable-next-line no-console
    console.error('[telemetry] failed to log', err);
  }
}
