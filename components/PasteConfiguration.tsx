'use client';

import { Dispatch, SetStateAction } from 'react';

interface PasteConfigurationProps {
    ttl: string;
    setTtl: Dispatch<SetStateAction<string>>;
    maxViews: string;
    setMaxViews: Dispatch<SetStateAction<string>>;
    isLoading: boolean;
    onSubmit: () => void;
    applyPreset: (ttl: string, maxViews: string) => void;
}

export default function PasteConfiguration({
    ttl,
    setTtl,
    maxViews,
    setMaxViews,
    isLoading,
    onSubmit,
    applyPreset
}: PasteConfigurationProps) {
    return (
        <div className="w-80 space-y-6">
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm sticky top-24">
                <h3 className="text-sm font-bold text-slate-800 mb-6 flex items-center gap-2 underline underline-offset-4 decoration-indigo-200">
                    Paste Configuration
                </h3>

                <div className="space-y-6">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 mb-2">Time to Live (TTL)</label>
                        <div className="relative">
                            <input
                                type="number"
                                value={ttl}
                                onChange={(e) => setTtl(e.target.value)}
                                placeholder="None"
                                className="w-full pl-4 pr-16 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">seconds</span>
                        </div>
                        <p className="text-[10px] text-slate-400 mt-2 leading-relaxed">Paste will expire after this duration. Leave empty for no expiration.</p>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-500 mb-2">Maximum Views</label>
                        <input
                            type="number"
                            value={maxViews}
                            onChange={(e) => setMaxViews(e.target.value)}
                            placeholder="Unlimited"
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                        />
                        <p className="text-[10px] text-slate-400 mt-2 leading-relaxed">Paste will be deleted after this many views. Leave empty for unlimited.</p>
                    </div>

                    <div className="space-y-3 pt-4 border-t border-slate-100">
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Quick Presets</h4>
                        <button onClick={() => applyPreset('3600', '10')} className="w-full flex items-center justify-between p-3 bg-white border border-slate-100 rounded-lg text-[11px] font-medium text-slate-600 hover:border-indigo-200 hover:bg-slate-50 transition-all text-left group">
                            <span className="flex items-center gap-2"><svg className="w-3.5 h-3.5 text-amber-500 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20"><path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.477.859h4z" /></svg> 1 hour, 10 views</span>
                        </button>
                        <button onClick={() => applyPreset('86400', '')} className="w-full flex items-center justify-between p-3 bg-white border border-slate-100 rounded-lg text-[11px] font-medium text-slate-600 hover:border-indigo-200 hover:bg-slate-50 transition-all text-left group">
                            <span className="flex items-center gap-2"><svg className="w-3.5 h-3.5 text-blue-500 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20"><path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" /></svg> 24 hours, unlimited</span>
                        </button>
                        <button onClick={() => applyPreset('', '1')} className="w-full flex items-center justify-between p-3 bg-white border border-slate-100 rounded-lg text-[11px] font-medium text-slate-600 hover:border-indigo-200 hover:bg-slate-50 transition-all text-left group">
                            <span className="flex items-center gap-2"><svg className="w-3.5 h-3.5 text-green-500 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg> No expiry, 1 view only</span>
                        </button>
                    </div>

                    <button
                        onClick={onSubmit}
                        disabled={isLoading}
                        className="w-full mt-8 bg-indigo-600 text-white font-bold py-3 rounded-lg shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-indigo-300 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {isLoading ? 'Processing...' : (
                            <>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                                Create Paste
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
