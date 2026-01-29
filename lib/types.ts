export interface Paste {
    id: string;
    content: string;
    title?: string | null;
    createdAt: string | Date;
    expiresAt?: string | Date | null;
    maxViews?: number | null;
    viewCount: number;
    remainingViews?: number | null;
}

export interface CreatePastePayload {
    content: string;
    title?: string;
    ttl_seconds?: number;
    max_views?: number;
}

export interface PasteResult {
    id: string;
    url: string;
}
