'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Paste } from '@/lib/types';

export default function ViewPastePage() {
    const { id } = useParams();
    const [paste, setPaste] = useState<Paste | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!id) return;

        fetch(`/api/pastes/${id}`)
            .then(async (res) => {
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || 'Paste not found');
                setPaste(data);
            })
            .catch((err: any) => setError(err.message))
            .finally(() => setIsLoading(false));
    }, [id]);

    if (isLoading) {
        return (
            <main className="p-8 h-[calc(100vh-64px)] flex items-center justify-center bg-slate-50/30">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-indigo-600/20 border-t-indigo-600 rounded-full animate-spin" />
                    <p className="text-sm font-medium text-slate-500 uppercase tracking-widest">Loading Paste...</p>
                </div>
            </main>
        );
    }

    if (error || !paste) {
        return (
            <main className="p-8 h-[calc(100vh-64px)] flex items-center justify-center bg-slate-50/30">
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    </div>
                    <h2 className="text-xl font-bold text-slate-800">Oops! Paste unavailable</h2>
                    <p className="text-slate-500 text-sm">{error || 'This paste might have expired or reached its view limit.'}</p>
                    <Link href="/" className="inline-block px-6 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors">Create New</Link>
                </div>
            </main>
        );
    }

    return (
        <main className="p-8 h-[calc(100vh-64px)] overflow-y-auto bg-slate-50/30">
            <div className="max-w-4xl mx-auto space-y-6">

                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                    <div className="flex justify-between items-center px-8 py-4 bg-slate-50/30 border-b border-slate-100">
                        <div>
                            <h1 className="text-xl font-bold text-slate-800">{paste.title || 'Untitled Paste'}</h1>
                            <div className="flex gap-4 mt-1">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4v4m-8 4v4m8-4v4m1-10V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m-3 3H5a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2V11a2 2 0 00-2-2h-3" /></svg>
                                    ID: {id}
                                </span>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    Viewed
                                </span>
                            </div>
                        </div>
                        <Link href="/" className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:text-indigo-600 hover:border-indigo-200 transition-all">
                            Create New
                        </Link>
                    </div>

                    <div className="p-8">
                        <div className="bg-slate-900/[0.03] rounded-lg p-6 font-mono text-sm leading-relaxed text-slate-800 whitespace-pre-wrap break-words border border-slate-100 shadow-inner min-h-[300px]">
                            {paste.content}
                        </div>

                        <div className="mt-8 pt-8 border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="space-y-1">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Expiration</span>
                                <p className="text-sm font-medium text-slate-700">
                                    {paste.expiresAt ? new Date(paste.expiresAt).toLocaleString() : 'Never expires'}
                                </p>
                            </div>
                            <div className="space-y-1">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Remaining Views</span>
                                <p className="text-sm font-medium text-slate-700">
                                    {paste.remainingViews !== null && paste.remainingViews !== undefined ? `${paste.remainingViews} views left` : 'Unlimited'}
                                </p>
                            </div>
                            <div className="flex items-end justify-end">
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(paste.content);
                                        alert('Copied to clipboard!');
                                    }}
                                    className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-bold uppercase tracking-wide hover:bg-indigo-100 transition-colors"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m-3 8h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
                                    Copy Raw
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
}
