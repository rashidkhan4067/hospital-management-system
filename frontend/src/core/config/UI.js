/**
 * 🎨 Material 3 Global Design System (Google Standard)
 * Defines the unified design tokens for Shifaa HMS.
 * Transitioned from legacy 'Glow' project to M3 Clean Administrative Architecture.
 */

export const UI_TOKENS = {
    // 🧱 Base structural logic (M3 Card Container)
    SHARD_BASE: "bg-white border border-slate-100 rounded-[24px] p-6 md:p-8 shadow-sm shadow-slate-200/5 transition-all duration-300",

    // 📑 Header Logic (Horizontal Command Bar)
    HEADER: "flex items-center justify-between mb-8 pb-6 border-b border-slate-50",
    HEADER_LEFT: "flex items-center gap-4",
    ICON_BOX: "w-11 h-11 rounded-xl bg-blue-50/50 flex items-center justify-center text-[#1a73e8] shrink-0",
    STATUS_NODE: "px-3 py-1 rounded-full bg-slate-50 border border-slate-100 flex items-center gap-2",
    PULSE_DOT: "w-2 h-2 rounded-full bg-[#1a73e8] animate-pulse",

    // 📝 Typography Matrix (Google Sans Standards)
    TEXT_PRIMARY: "text-base font-bold text-slate-900 tracking-tight",
    TEXT_SECONDARY: "text-[11px] font-bold text-slate-400 uppercase tracking-widest leading-none",
    VALUE: "text-2xl font-bold text-slate-900",

    // 🛰️ Component Spacing (8px Grid)
    GAP_XL: "gap-10",
    GAP_L: "gap-8",
    GAP_MD: "gap-6",
    GAP_SM: "gap-4",

    // 💎 Colors
    ACCENT: "#1a73e8", // Google Blue
    SURFACE: "#F8F9FA",
    OUTLINE: "#DADCE0",
};

export const CTA_THEMES = {
    // 🛸 Google Standard Button Variants
    PRIMARY: "inline-flex items-center justify-center px-6 h-12 bg-[#1a73e8] text-white rounded-full text-sm font-bold tracking-tight hover:bg-[#174ea6] hover:shadow-lg shadow-blue-500/20 active:scale-95 transition-all cursor-pointer",
    
    SECONDARY: "inline-flex items-center justify-center px-6 h-12 bg-[#E8F0FE] text-[#1967D2] rounded-full text-sm font-bold tracking-tight hover:bg-[#D2E3FC] transition-all cursor-pointer",

    OUTLINED: "inline-flex items-center justify-center px-6 h-12 bg-transparent border border-slate-200 text-slate-700 rounded-full text-sm font-bold tracking-tight hover:bg-slate-50 transition-all cursor-pointer",

    // 👻 Icon-only Utility
    GHOST: "w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-[#1a73e8] hover:bg-blue-50 transition-all cursor-pointer p-0",

    // 🌌 Layout Matrix
    CTA_GRID: "flex flex-wrap items-center gap-4",
};

export const BREAKPOINTS = {
    MOBILE_PADDING: "px-4",
    DESKTOP_PADDING: "px-8 lg:px-12",
    ROUNDED_CARD: "rounded-[24px]",
    ROUNDED_DIALOG: "rounded-[28px]",
};
