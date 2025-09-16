// @ts-nocheck
// Minimal mocked prisma client for Jest tests used by server routes

const _prisma: any = {};
_prisma.recipe = {
  findUnique: jest.fn(async (_opts: any) => null),
  upsert: jest.fn(async (opts: any) => ({ id: (opts.where && opts.where.id) || 'mocked-id', ...opts.create })),
};
_prisma.$queryRaw = jest.fn(async () => 1);
_prisma.$transaction = jest.fn(async (fn: any) => {
  // Basic transaction wrapper that calls the passed function with a mock tx equal to prisma
  return await fn(_prisma as any);
});

export const prisma = _prisma;
export default prisma;
