// Minimal mock for @clerk/nextjs/server
export function auth() {
  return { userId: 'test-user' };
}

const _clerk = { auth };
export default _clerk;
