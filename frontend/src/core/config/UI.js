/**
 * 🎨 Al Shifaa UI Design Tokens & Constants
 * Defines the monolithic style guide for Dashboard and Analytics.
 * Enforces strict consistency across the Clinical Hub.
 */

export const UI_TOKENS = {
    // 🧱 Base shard structural logic
    SHARD_BASE: "matrix-card p-10 border-none relative overflow-hidden group hover:scale-[1.01] transition-all duration-700",

    // 🎭 Background layering
    GLOW_ACCENT: "absolute top-0 right-0 w-80 h-80 bg-accent-primary/10 blur-[120px] rounded-full -mr-40 -mt-40 pointer-events-none group-hover:bg-accent-primary/20 hover:scale-150 transition-all duration-1000",
    GLOW_SANA: "absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 blur-[120px] rounded-full -mr-40 -mt-40 pointer-events-none group-hover:bg-indigo-500/20 hover:scale-150 transition-all duration-1000",

    // 📑 Header Logic (Standardized for all shards)
    HEADER: "flex items-center justify-between border-b border-slate-200/50 dark:border-white/5 pb-8 shrink-0 relative z-10",
    HEADER_LEFT: "flex items-center gap-5",
    ICON_BOX: "w-12 h-12 rounded-2xl bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center text-accent-primary shadow-inner group-hover:rotate-6 transition-transform shrink-0",
    ICON_BOX_SANA: "w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shadow-inner group-hover:rotate-6 transition-transform shrink-0",
    STATUS_NODE: "px-4 py-2 rounded-full bg-accent-primary/10 border border-accent-primary/20 flex items-center gap-2",
    PULSE_DOT: "w-1.5 h-1.5 rounded-full bg-accent-primary shadow-[0_0_10px_#14b8a6] animate-pulse",

    // 📝 Typography Matrix
    TEXT_PRIMARY: "text-[14px] font-black uppercase italic tracking-tighter text-slate-800 dark:text-white leading-none",
    TEXT_SECONDARY: "text-[8px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-white/30 mt-1",
    VALUE: "text-2xl font-black italic text-slate-900 dark:text-white tracking-tighter",

    // 🛰️ Component Spacing
    GAP_XL: "gap-10",
    GAP_L: "gap-8",
    GAP_MD: "gap-6",

    // 💎 Colors
    ACCENT: "#14B8A6",
    PRIMARY_DARK: "#0F172A",
    PRIMARY_LIGHT: "#FFFFFF",
    GRADIENT_HERO: "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900",
};

export const CTA_THEMES = {
    // 🛸 Master Command Action Buttons
    PRIMARY: "flex items-center gap-2 px-6 py-3 bg-accent-primary text-white rounded-xl text-[10px] sm:text-[11px] font-black uppercase tracking-widest hover:bg-accent-primary/90 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-accent-primary/25 border-none cursor-pointer",
    
    SECONDARY: "group/btn relative flex items-center gap-4 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest hover:border-accent-primary/50 transition-all duration-500 overflow-hidden cursor-pointer",

    // 🌠 Intelligence & Sana Nodes
    SANA: "group/btn relative flex items-center gap-4 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest hover:border-indigo-500/50 transition-all duration-500 overflow-hidden cursor-pointer",

    // 🚨 Critical / Abort Matrix
    DANGER: "flex items-center gap-3 px-6 py-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-[10px] font-black uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all shadow-xl shadow-rose-500/10 active:scale-95 cursor-pointer",

    // 👻 Sub-Navigation / Minimalist
    GHOST: "w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-500 hover:text-accent-primary hover:border-accent-primary/30 transition-all active:scale-90 cursor-pointer p-0",

    // 🌌 Layout Matrix
    CTA_GRID: "grid grid-cols-1 sm:grid-cols-2 gap-4 shrink-0",
    CTA_WRAPPER: "flex items-center gap-4 shrink-0",
};

export const BREAKPOINTS = {
    MOBILE_PADDING: "px-6",
    DESKTOP_PADDING: "px-8 lg:px-12",
    ROUNDED_MOBILE: "rounded-3xl",
    ROUNDED_DESKTOP: "rounded-[2.5rem]",
};
