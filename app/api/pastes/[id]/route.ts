import { NextResponse } from 'next/server';
import { getPasteWithConstraints } from '@/lib/paste-service';

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        // Create a simple map for headers since we have the Request object
        const headersMap = () => req.headers;

        const paste = await getPasteWithConstraints(id, headersMap);

        if (!paste) {
            return NextResponse.json({ error: 'Paste not found or unavailable' }, { status: 404 });
        }

        // Successful response
        return NextResponse.json({
            content: paste.content,
            remaining_views: paste.maxViews ? paste.maxViews - paste.viewCount : null,
            expires_at: paste.expiresAt,
        }, { status: 200 });

    } catch (error) {
        console.error('Fetch paste failed:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
