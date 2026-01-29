'use client';

import { useState } from 'react';
import { CreatePastePayload, PasteResult } from '@/lib/types';
import PasteEditor from '@/components/PasteEditor';
import PasteConfiguration from '@/components/PasteConfiguration';

export default function Home() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [ttl, setTtl] = useState('');
    const [maxViews, setMaxViews] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<PasteResult | null>(null);
    const [error, setError] = useState('');

    const handleSubmit = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!content.trim()) {
            setError('Content is required');
            return;
        }
        setIsLoading(true);
        setError('');
        setResult(null);

        try {
            const payload: CreatePastePayload = { content, title };
            if (ttl) payload.ttl_seconds = parseInt(ttl, 10);
            if (maxViews) payload.max_views = parseInt(maxViews, 10);

            const res = await fetch('/api/pastes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Failed to create paste');
            setResult(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const applyPreset = (presetTtl: string, presetViews: string) => {
        setTtl(presetTtl);
        setMaxViews(presetViews);
    };

    return (
        <main className="p-8 h-[calc(100vh-64px)] overflow-y-auto">
            <div className="max-w-6xl mx-auto flex gap-8">

                {/* Left Side: Editor */}
                <div className="flex-1 space-y-6">
                    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                        <div className="flex border-b border-slate-100 bg-slate-50/30">
                            <button className="px-6 py-3 border-b-2 border-indigo-600 text-sm font-semibold text-indigo-600">Editor</button>
                            <button className="px-6 py-3 text-sm font-medium text-slate-500 hover:text-slate-700">Settings</button>
                            <button className="px-6 py-3 text-sm font-medium text-slate-500 hover:text-slate-700">Preview</button>
                            <button className="px-6 py-3 text-sm font-medium text-slate-500 hover:text-slate-700">API</button>
                        </div>

                        {!result ? (
                            <PasteEditor
                                title={title}
                                setTitle={setTitle}
                                content={content}
                                setContent={setContent}
                                error={error}
                            />
                        ) : (
                            <div className="p-6 space-y-6">
                                <div className="py-12 flex flex-col items-center justify-center space-y-6">
                                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    </div>
                                    <div className="text-center">
                                        <h2 className="text-xl font-bold text-slate-800">Paste Created!</h2>
                                        <p className="text-slate-500 text-sm mt-1">Your content is now live and shareable.</p>
                                    </div>

                                    <div className="w-full max-w-sm space-y-2">
                                        <label className="block text-[10px] font-bold text-slate-400 uppercase text-center tracking-widest">Shareable URL</label>
                                        <div className="flex gap-2">
                                            <input readOnly value={result.url} className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-mono text-slate-600 outline-none" />
                                            <button onClick={() => navigator.clipboard.writeText(result.url)} className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                                                <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m-3 8h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <button onClick={() => setResult(null)} className="px-6 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors">Create Another</button>
                                        <a href={result.url} className="px-6 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-shadow shadow-md">View Paste</a>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Side: Configuration */}
                {!result && (
                    <PasteConfiguration
                        ttl={ttl}
                        setTtl={setTtl}
                        maxViews={maxViews}
                        setMaxViews={setMaxViews}
                        isLoading={isLoading}
                        onSubmit={() => handleSubmit()}
                        applyPreset={applyPreset}
                    />
                )}

            </div>
        </main>
    );
}
