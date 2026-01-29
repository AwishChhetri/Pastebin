import { z } from 'zod';

export const createPasteSchema = z.object({
    title: z.string().optional(),
    content: z.string().min(1, 'Content is required'),
    ttl_seconds: z.number().int().min(1).optional(),
    max_views: z.number().int().min(1).optional(),
});

export type CreatePasteInput = z.infer<typeof createPasteSchema>;
