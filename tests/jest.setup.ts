// Minimal Jest setup to provide environment variables and globals used by server routes
process.env.NODE_ENV = process.env.NODE_ENV || 'test';
process.env.SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY || 'test-key';
process.env.DATABASE_URL = process.env.DATABASE_URL || 'postgresql://user:pass@localhost:5432/testdb';

// Provide a global fetch mock if needed
if (!(global as any).fetch) {
  // simple fetch mock that can be overridden in tests
  (global as any).fetch = jest.fn(async () => ({
    ok: false,
    status: 500,
    json: async () => ({ error: 'no fetch mock registered' }),
    text: async () => 'no fetch mock registered',
  }));
}
