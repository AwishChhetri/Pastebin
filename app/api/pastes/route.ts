import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createPasteSchema } from '@/lib/validations';
import { nanoid } from 'nanoid';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const result = createPasteSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json({ error: 'Invalid input', details: result.error.format() }, { status: 400 });
        }

        const { content, title, ttl_seconds, max_views } = result.data;
        const id = nanoid(10); // Short unique ID

        const expiresAt = ttl_seconds ? new Date(Date.now() + ttl_seconds * 1000) : null;

        const paste = await prisma.paste.create({
            data: {
                id,
                title,
                content,
                expiresAt,
                maxViews: max_views,
            },
        });

        // Determine the base URL dynamically or from env, fallback to request headers
        const host = req.headers.get('host') || 'localhost:3000';
        const protocol = host.includes('localhost') ? 'http' : 'https';
        const url = `${protocol}://${host}/p/${paste.id}`;

        return NextResponse.json({ id: paste.id, url }, { status: 201 });
    } catch (error) {
        console.error('Create paste failed:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
