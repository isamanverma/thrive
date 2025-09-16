// Minimal telemetry mock
export function logTelemetry(_event: string, _payload?: Record<string, unknown>) {
  // noop for tests - intentionally empty
}

export default { logTelemetry };
