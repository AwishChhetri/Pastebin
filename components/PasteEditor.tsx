'use client';

import { Dispatch, SetStateAction } from 'react';

interface PasteEditorProps {
    title: string;
    setTitle: Dispatch<SetStateAction<string>>;
    content: string;
    setContent: Dispatch<SetStateAction<string>>;
    error: string;
}

export default function PasteEditor({ title, setTitle, content, setContent, error }: PasteEditorProps) {
    return (
        <div className="p-6 space-y-6">
            <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Paste Title (optional)</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Untitled Paste"
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-slate-800 placeholder-slate-300"
                />
            </div>

            <div>
                <div className="flex justify-between items-center mb-2">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Content *</label>
                    <div className="flex gap-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        <span className="flex items-center gap-1"><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg> Syntax</span>
                        <span className="flex items-center gap-1"><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h7" /></svg> Word Wrap</span>
                    </div>
                </div>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Paste your content here..."
                    className="w-full h-[400px] px-4 py-4 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-slate-800 font-mono text-sm leading-relaxed placeholder-slate-300"
                />
            </div>

            {error && (
                <div className="p-3 bg-red-50 border border-red-100 rounded-lg text-red-600 text-xs font-medium">
                    {error}
                </div>
            )}

            <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-4 flex gap-3">
                <div className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div>
                    <h4 className="text-xs font-bold text-blue-700 uppercase tracking-tight">API Endpoint Information</h4>
                    <p className="text-[11px] text-blue-600 mt-1">
                        POST to <code className="bg-blue-100 px-1 rounded">/api/pastes</code> with JSON body containing content, ttl_seconds, and max_views.
                    </p>
                </div>
            </div>
        </div>
    );
}
