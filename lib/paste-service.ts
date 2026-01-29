import { prisma } from '@/lib/prisma';
import { Paste } from '@prisma/client';

export async function getPasteWithConstraints(id: string, headersGetter: () => { get: (name: string) => string | null | undefined }) {
  // Determine 'now'
  let now = new Date();
  if (process.env.TEST_MODE === '1') {
    const headers = headersGetter();
    const testNowHeader = headers.get('x-test-now-ms');
    if (testNowHeader) {
      const testNow = parseInt(testNowHeader, 10);
      if (!isNaN(testNow)) {
        now = new Date(testNow);
      }
    }
  }

  // Atomic update and fetch
  const pastes = await prisma.$queryRaw<Paste[]>`
    UPDATE "Paste"
    SET "viewCount" = "viewCount" + 1
    WHERE "id" = ${id}
      AND ("maxViews" IS NULL OR "viewCount" < "maxViews")
      AND ("expiresAt" IS NULL OR "expiresAt" > ${now})
    RETURNING *;
  `;

  return pastes[0] || null;
}
