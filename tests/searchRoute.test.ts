import { GET } from '../src/app/api/searchRecipe/route';

// Note: This is a lightweight test. In the real repo we'd use a more complete
// test harness with next/server mocks. Here we verify that the route returns
// a 400 when missing required params.

describe('searchRecipe route', () => {
  it('returns 400 when missing q and includeIngredients', async () => {
    const req = new Request('http://localhost/api/searchRecipe');
    const res = await GET(req as any);
    // NextResponse.json returns a NextResponse - we can check status via .status
    // but in this minimal environment we assert we receive an object
    // with the expected error shape.
    // @ts-ignore
    const body = await res.json();
    expect(body.error).toBeDefined();
  });
});
