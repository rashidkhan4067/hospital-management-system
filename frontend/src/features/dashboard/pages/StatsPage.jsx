import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAdminAnalytics } from '@/features/analytics/hooks/useAnalytics';
import { UI_TOKENS } from '@/core/config/UI';
import { useTheme } from '@/core/theme/ThemeContext';

// ── Layout & Shared UI
import AdminPage from '@/layouts/AdminPage';
import { PageHeader, Card, Button, FilterBar } from '@/components/primitives';
import UnifiedHeroCTA from '@/components/composed/UnifiedHeroCTA';
import UnifiedKpiGrid from '@/components/composed/UnifiedKpiGrid';

// 📉 Chart Shards (Internal Imports for better flow)
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import {
  BarChart as BarChartIcon, Activity, Clock, Globe, TrendingUp, TrendingDown,
  Calendar, Users, Zap, Star, Download, FileText, ChevronRight, ClipboardCheck, BarChart3,
  Mic
} from 'lucide-react';


// 📈 Chart Mock Utilities
const mockSparkline = (base, range) =>
  Array.from({ length: 12 }, () => ({ val: base + Math.floor(Math.random() * range) }));

const mockTrend = (days) =>
  Array.from({ length: days }, (_, i) => ({
    name: `D${i + 1}`,
    web: 200 + Math.floor(Math.random() * 400),
    voice: 150 + Math.floor(Math.random() * 300)
  }));

/**
 * 📊 Al Shifaa Advanced Analytics Hub — Unified Matrix Implementation
 * High-fidelity restoration to eliminate all vertical blank spaces.
 */
export default function StatsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentDept = searchParams.get('dept') || 'All';
  
  const { pulse, clinicalTrends, financialTrends, loading } = useAdminAnalytics();
  const { accentColor } = useTheme();
  const [range, setRange] = useState('7d');

  // 🧪 Dynamic Theme Color Matrix
  const COLORS = useMemo(() => [
    accentColor, 
    '#3b82f6', // accent-secondary
    '#6366f1', // indigo
    '#f43f5e', // rose
    '#f59e0b'  // amber
  ], [accentColor]);

  // 🧩 Data Matrices
  const statsMatrix = useMemo(() => [
    { title: 'Total Appointments', value: '4,842', percent: '+12.4', trend: 'up', color: accentColor, icon: Calendar, data: mockSparkline(4000, 800) },
    { title: 'Confirmation Rate', value: '94.2%', percent: '+2.1', trend: 'up', color: '#3b82f6', icon: TrendingUp, data: mockSparkline(90, 10) },
    { title: 'Voice Booking Share', value: '24.8%', percent: '+8.4', trend: 'up', color: '#6366f1', icon: Activity, data: mockSparkline(20, 15) },
    { title: 'Cancellation Rate', value: '1.2%', percent: '-0.4', trend: 'down', color: '#f43f5e', icon: TrendingDown, data: mockSparkline(1, 2) },
  ], [accentColor]);

  const trendData = useMemo(() => mockTrend(12), []);

  const doctorVolume = useMemo(() => [
    { name: 'Dr. Sarah Ahmed', spec: 'Cardiologist', volume: 842, confirm: '98%', rating: 4.9 },
    { name: 'Dr. Ali Raza', spec: 'Neurologist', volume: 642, confirm: '94%', rating: 4.7 },
    { name: 'Dr. Fatima Khan', spec: 'ENT Specialist', volume: 542, confirm: '96%', rating: 4.8 },
    { name: 'Dr. Zain Malik', spec: 'General Physician', volume: 442, confirm: '91%', rating: 4.5 },
    { name: 'Dr. Hina Pervez', spec: 'Dermatologist', volume: 342, confirm: '99%', rating: 5.0 },
  ], []);
  return (
    <AdminPage>
      <div className={`flex flex-col gap-4 w-full min-h-screen bg-slate-50/50 dark:bg-transparent px-4 lg:px-8 -mt-2 pb-20`}>

        {/* ─── ROW 1: Page Command Header ─── */}
        <PageHeader 
          title="Clinical Intelligence"
          subtitle="Real-time Analytical Shards & Data Visualization"
          status="Master Protocol"
          actions={
            <div className="flex items-center gap-4">
              <select 
                value={currentDept}
                onChange={(e) => setSearchParams({ dept: e.target.value })}
                className="bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 rounded-xl px-4 py-2.5 text-[10px] font-black uppercase tracking-widest outline-none focus:ring-2 ring-accent-primary/20 transition-all cursor-pointer text-slate-800 dark:text-white"
              >
                <option value="All">All Nodes</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Neurology">Neurology</option>
                <option value="Gastro">Gastroenterology</option>
              </select>
              <Button className="bg-accent-primary text-white px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-accent-primary/25 flex items-center gap-2 border-none">
                <Download size={16} strokeWidth={3} /> Export Hub
              </Button>
            </div>
          }
        />

        {/* ─── ROW 2: Analytical Context Hero ─── */}
        <UnifiedHeroCTA 
          compact
          title={<>Clinical <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/30">Intelligence Hub.</span></>}
          subtitle="Your clinical operations are 94.2% optimized. Global telemetry synchronized across 14 active hospital nodes."
          pillPrefix="Clinical Analytics Active"
          pillIcon={BarChart3}
          actions={[
            { title: 'Global Export', subtitle: 'Archive Metrics', icon: Download, onClick: () => {} },
            { title: 'Neural Dialog', subtitle: 'Sana AI Support', icon: Mic, onClick: () => {} }
          ]}
        />

        {/* ─── ROW 3: KPI Telemetry Grid ─── */}
        <UnifiedKpiGrid 
          loading={loading}
          stats={[
            { title: 'Total Visits', value: '4,842', icon: Calendar, trend: '+12.4% Up' },
            { title: 'Confirm Rate', value: '94.2%', icon: TrendingUp, trend: 'Stable' },
            { title: 'Voice Share', value: '24.8%', icon: Mic, trend: '+8.4% Up' },
            { title: 'System Health', value: 'Nominal', icon: Activity, trend: 'Live' }
          ]}
        />

        {/* ─── 🛰 ANALYTIC MASTER CONTROL ─── */}
        <div className="w-full">
          <FilterBar 
            searchTerm={range} 
            setSearchTerm={setRange}
            activeTab={range}
            setActiveTab={setRange}
            placeholder="Search Metrics, Performance or Node ID..."
            tabs={[
              { id: 'Today', label: 'Today' },
              { id: '7d',    label: 'Last 7 Days' },
              { id: '30d',   label: 'Monthly Hub' },
              { id: 'Year',  label: 'Annual Matrix' }
            ]}
          />
        </div>

        {/* ─── ROW 4: Analytical Shards ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start w-full">

          {/* 🏥 MAIN CONTENT COLUMN (Left) */}
          <div className="lg:col-span-8 flex flex-col gap-6">

            {/* 1. Appointments Trend */}
            <Card className={`${UI_TOKENS.SHARD_BASE} p-6 flex flex-col gap-6`}>
              <div className={UI_TOKENS.GLOW_ACCENT} />
              <div className="flex items-center justify-between relative z-10 shrink-0">
                <div className="space-y-0.5">
                  <h3 className={`${UI_TOKENS.TEXT_PRIMARY} text-lg flex items-center gap-3`}>
                    <BarChartIcon className="text-accent-primary" size={20} /> Appointments Trend
                  </h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest opacity-60 italic">Web vs Voice booking distribution</p>
                </div>
              </div>
              <div className="h-[220px] w-full mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b', fontWeight: 'black' }} />
                    <YAxis hide />
                    <Tooltip
                      cursor={{ fill: '#ffffff05' }}
                      contentStyle={{ backgroundColor: '#0f172a', borderRadius: '16px', border: '1px solid #ffffff10', color: '#fff', fontSize: '10px', textTransform: 'uppercase', fontWeight: 'black' }}
                    />
                    <Bar dataKey="web" stackId="a" fill={accentColor} radius={[0, 0, 0, 0]} opacity={0.8} />
                    <Bar dataKey="voice" stackId="a" fill="#6366f1" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* 2. Hourly Heatmap */}
            <Card className={`${UI_TOKENS.SHARD_BASE} p-5 flex flex-col gap-4`}>
              <div className="flex items-center gap-3 mb-0 relative z-10">
                <Clock className="text-accent-primary" size={18} />
                <div>
                  <h3 className={`${UI_TOKENS.TEXT_PRIMARY} text-base`}>Hourly Intelligence Heatmap</h3>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest opacity-60">Peak booking density (8AM - 8PM)</p>
                </div>
              </div>
              <div className="grid grid-cols-7 gap-1.5 h-[120px]">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                  <div key={day} className="flex flex-col gap-1">
                    <div className="h-4 flex items-center justify-center mb-1">
                      <span className="text-[8px] font-black uppercase text-slate-500">{day}</span>
                    </div>
                    {[0, 1, 2].map((i) => (
                      <div key={i} className={`flex-1 rounded-lg border border-white/5 opacity-50 transition-all cursor-crosshair group relative ${i === 1 ? 'bg-accent-primary/60 hover:opacity-100' : 'bg-accent-primary/10 hover:opacity-30'}`} />
                    ))}
                  </div>
                ))}
              </div>
            </Card>

            {/* 3. Throughput Intelligence */}
            <Card className={`${UI_TOKENS.SHARD_BASE} p-5 flex flex-col gap-4 bg-slate-900 shadow-2xl border-accent-primary/20`}>
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center text-accent-primary border border-accent-primary/20">
                    <TrendingUp size={20} />
                  </div>
                  <div>
                    <h3 className="text-white text-base font-black italic uppercase leading-none">Throughput Intelligence</h3>
                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">Real-time Clinical Velocity</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  {[
                    { l: 'Admissions', v: '142', c: 'text-accent-primary' },
                    { l: 'Discharges', v: '128', c: 'text-indigo-400' }
                  ].map((stat) => (
                    <div key={stat.l} className="text-right">
                      <p className="text-[8px] font-black uppercase text-slate-500">{stat.l}</p>
                      <p className={`text-lg font-black italic tabular-nums ${stat.c}`}>{stat.v}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4 mt-2">
                {[
                  { label: 'OPD Flow', value: '94%', color: accentColor },
                  { label: 'Surgery', value: '88%', color: '#3b82f6' },
                  { label: 'ER Intake', value: '72%', color: '#6366f1' },
                  { label: 'Lab Sync', value: '98%', color: '#f59e0b' }
                ].map((item) => (
                  <div key={item.label} className="p-3 rounded-xl bg-white/5 border border-white/5 flex flex-col items-center gap-2">
                    <span className="text-[8px] font-black uppercase text-slate-500 tracking-tighter">{item.label}</span>
                    <div className="text-sm font-black text-white italic">{item.value}</div>
                    <div className="w-full h-0.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full rounded-full opacity-60" style={{ width: item.value, background: item.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* 4. Practitioner Matrix — NOW INLINE TO REMOVE BLANK SPACE */}
            <Card className="p-5 lg:p-7 rounded-[2rem] bg-white/70 dark:bg-slate-900/10 backdrop-blur-3xl border border-slate-200 dark:border-white/5 shadow-2als relative overflow-hidden flex flex-col gap-6">
              <div className="flex items-center justify-between relative z-10 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center text-accent-primary border border-accent-primary/20">
                    <Users size={20} />
                  </div>
                  <div className="flex flex-col">
                    <h2 className="text-lg lg:text-xl font-black text-slate-900 dark:text-white italic uppercase tracking-tighter leading-none">Practitioner Matrix</h2>
                    <p className="text-[8px] font-bold text-slate-400 uppercase mt-0.5">Personnel Benchmarks</p>
                  </div>
                </div>
              </div>
              <div className="w-full relative z-10">
                <table className="w-full text-left border-collapse table-fixed">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-white/5">
                      <th className="w-[40%] px-1 py-3 text-[8px] font-black uppercase text-slate-400 tracking-widest whitespace-nowrap">Medical Personnel</th>
                      <th className="w-[20%] px-1 py-3 text-[8px] font-black uppercase text-slate-400 tracking-widest text-center whitespace-nowrap">Volume</th>
                      <th className="w-[20%] px-1 py-3 text-[8px] font-black uppercase text-slate-400 tracking-widest text-center whitespace-nowrap">Status Hub</th>
                      <th className="w-[20%] px-1 py-3 text-[8px] font-black uppercase text-slate-400 tracking-widest text-right whitespace-nowrap">Merit Rating</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 dark:divide-white/5">
                    {doctorVolume.map((doc, idx) => (
                      <tr key={idx} className="group/row hover:bg-slate-50 dark:hover:bg-white/5 transition-all cursor-pointer">
                        <td className="px-1 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-accent-primary/20 to-accent-primary/5 flex items-center justify-center text-accent-primary font-black text-[9px] italic shrink-0">{doc.name[0]}</div>
                            <div className="flex flex-col min-w-0">
                              <p className="text-[11px] font-black text-slate-900 dark:text-white italic uppercase truncate leading-none">{doc.name}</p>
                              <p className="text-[7px] font-bold text-slate-400 uppercase mt-0.5 truncate">{doc.spec}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-1 py-3 text-center">
                          <p className="text-lg font-black text-slate-900 dark:text-white italic tracking-tighter tabular-nums leading-none">{doc.volume}</p>
                        </td>
                        <td className="px-1 py-3 text-center">
                          <div className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-500 text-[7px] font-black uppercase border border-emerald-500/20 leading-none">
                            <ClipboardCheck size={8} /> {doc.confirm}
                          </div>
                        </td>
                        <td className="px-1 py-3 text-right">
                          <div className="flex items-center justify-end gap-1 text-amber-500">
                            <span className="text-sm font-black text-slate-900 dark:text-white tabular-nums leading-none">{doc.rating.toFixed(1)}</span>
                            <Star size={10} className="fill-current" />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

          </div>

          <div className="lg:col-span-4 flex flex-col gap-6">
            <Card className="p-6 rounded-[2.5rem] bg-indigo-600 text-white flex flex-col gap-4 relative overflow-hidden shadow-xl shadow-indigo-500/20 border-none">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[80px] rounded-full pointer-events-none" />
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center border border-white/20">
                    <Activity size={20} className="text-white" />
                 </div>
                 <h4 className="text-[12px] font-black uppercase italic tracking-[0.2em] leading-none">Neural Insights</h4>
              </div>
              <p className="text-[10px] font-black italic text-white/90 leading-relaxed uppercase tracking-wide opacity-80">
                 Peak booking density detected between 10 AM and 2 PM. Recommend increasing nurse staff rotation by 15%.
              </p>
            </Card>


            {/* Status Matrix */}
            <Card className={`${UI_TOKENS.SHARD_BASE} p-6 min-h-[380px] flex flex-col gap-6 relative overflow-hidden group`}>
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent-primary/10 blur-[60px] rounded-full group-hover:scale-150 transition-transform duration-1000" />
              <div className="space-y-0.5 relative z-10">
                <h3 className={`${UI_TOKENS.TEXT_PRIMARY} text-lg flex items-center gap-3`}>
                  <div className="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center text-accent-primary border border-accent-primary/20">
                    <Globe size={20} />
                  </div>
                  <span className="text-slate-900 dark:text-white italic uppercase font-black tracking-tighter">Status Matrix</span>
                </h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest opacity-60 mt-1">Global Efficiency Breakdown</p>
              </div>

              <div className="relative w-full h-[200px] z-10">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Confirmed', value: 450 },
                        { name: 'Pending', value: 300 },
                        { name: 'In-Transfer', value: 150 }
                      ]}
                      cx="50%" cy="50%"
                      innerRadius={70}
                      outerRadius={90}
                      paddingAngle={10}
                      dataKey="value"
                      stroke="none"
                      cornerRadius={12}
                    >
                      <Cell fill="url(#colorAccent)" />
                      <Cell fill="url(#colorSky)" />
                      <Cell fill="url(#colorIndigo)" />
                    </Pie>
                    <defs>
                      <linearGradient id="colorAccent" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={accentColor} stopOpacity={0.8} />
                        <stop offset="95%" stopColor={accentColor} stopOpacity={1} />
                      </linearGradient>
                      <linearGradient id="colorSky" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={1} />
                      </linearGradient>
                      <linearGradient id="colorIndigo" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={1} />
                      </linearGradient>
                    </defs>
                  </PieChart>
                </ResponsiveContainer>

                {/* Elite Centered Telemetry */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none translate-y-1">
                  <span className="text-[9px] font-black uppercase text-slate-400/60 tracking-[0.3em] leading-none mb-1">Efficiency</span>
                  <div className="flex items-baseline gap-0.5">
                    <span className="text-3xl font-black text-slate-900 dark:text-white tabular-nums italic tracking-tighter">94.2</span>
                    <span className="text-sm font-black text-accent-primary italic">%</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-auto relative z-10 border-t border-slate-100 dark:border-white/5 pt-6">
                {[
                  { label: 'Confirm', value: '450', percent: '65%', color: '#2dd4bf' },
                  { label: 'Pending', value: '300', percent: '22%', color: '#0ea5e9' }
                ].map((stat) => (
                  <div key={stat.label} className="group/stat flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full shadow-[0_0_8px_rgba(45,212,191,0.5)]" style={{ background: stat.color }} />
                      <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider font-bold">{stat.label}</span>
                    </div>
                    <div className="flex items-baseline justify-between mt-1">
                      <span className="text-base font-black text-slate-900 dark:text-white italic tracking-tight">{stat.value}</span>
                      <span className="text-[9px] font-black text-slate-500 uppercase italic opacity-60 tracking-widest">{stat.percent}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Channel Velocity */}
            <Card className={`${UI_TOKENS.SHARD_BASE} p-6 min-h-[220px] flex flex-col gap-6`}>
              <div className="flex items-center gap-3">
                <Activity className="text-accent-primary" size={20} />
                <h3 className="text-slate-900 dark:text-white text-lg font-black italic uppercase">Channel Velocity</h3>
              </div>
              <div className="h-20 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData}>
                    <Line type="monotone" dataKey="voice" stroke="#6366f1" strokeWidth={3} dot={false} strokeDasharray="3 3" />
                    <Line type="monotone" dataKey="web" stroke={accentColor} strokeWidth={2} dot={false} opacity={0.3} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Conversion Hub */}
            <Card className="p-6 rounded-[2rem] bg-white/70 dark:bg-slate-900/10 backdrop-blur-3xl border border-slate-200 dark:border-white/5 shadow-2xals flex flex-col gap-8">
              <div className="flex items-center gap-3">
                <Zap className="text-indigo-500" size={20} />
                <h3 className="text-slate-900 dark:text-white text-lg font-black italic uppercase">Conversion Hub</h3>
              </div>
              <div className="space-y-6">
                {[
                  { l: 'Registered', v: '2,482', p: '100%', c: accentColor },
                  { l: 'Booked', v: '1,842', p: '74%', c: '#3b82f6' },
                  { l: 'Completed', v: '1,242', p: '50%', c: '#6366f1' }
                ].map(s => (
                  <div key={s.l} className="flex flex-col gap-1.5">
                    <div className="flex justify-between text-[11px] font-black text-slate-900 dark:text-white italic">
                      <span className="uppercase opacity-60 tracking-wider font-bold">{s.l}</span>
                      <span className="tabular-nums">{s.v}</span>
                    </div>
                    <div className="h-1 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full rounded-full shadow-lg" style={{ width: s.p, background: s.c }} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Asset Hub */}
            <Card className="p-6 rounded-[2rem] bg-slate-950 border border-indigo-500/20 shadow-2als flex flex-col gap-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-3xl pointer-events-none" />
              <div className="flex items-center gap-3 relative z-10 font-black italic uppercase">
                <Download size={20} className="text-indigo-400" />
                <h3 className="text-indigo-100 text-lg">Asset Hub</h3>
              </div>
              <div className="grid grid-cols-1 gap-3 relative z-10">
                {[
                  { l: 'Audit Archive', i: FileText, b: 'bg-indigo-500/10' },
                  { l: 'Neural Performance', i: BarChart3, b: 'bg-emerald-500/10' }
                ].map(item => (
                  <button key={item.l} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/20 transition-all text-left group/asset">
                    <div className="flex items-center gap-3">
                      <item.i className="text-white" size={18} />
                      <span className="text-white text-[11px] font-black uppercase tracking-wider">{item.l}</span>
                    </div>
                    <ChevronRight size={16} className="text-slate-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            </Card>

          </div>

        </div>

      </div>
    </AdminPage>
  );
}
