import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        // Check database connectivity
        await prisma.$queryRaw`SELECT 1`;
        return NextResponse.json({ ok: true }, { status: 200 });
    } catch (error) {
        console.error('Health check failed:', error);
        return NextResponse.json({ ok: false, error: 'Database unavailable' }, { status: 503 });
    }
}
