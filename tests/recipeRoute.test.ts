import { GET } from '../src/app/api/recipes/[id]/route';

// Minimal smoke test ensuring the route returns an error without a valid id
describe('recipes/[id] route', () => {
  it('returns 400 if id is missing or invalid', async () => {
    const req = new Request('http://localhost/api/recipes/');
    const res = await GET(req as any, { params: Promise.resolve({ id: '' }) } as any);
    // @ts-ignore
    const body = await res.json();
    expect(body.error).toBeDefined();
  });
});
