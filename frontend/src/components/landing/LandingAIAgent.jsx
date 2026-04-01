import React from 'react';
import { motion } from 'framer-motion';
import { Mic, MessageSquare, Bot, Sparkles, CheckCircle } from 'lucide-react';
import { Badge, Card } from '../ui';

export default function LandingAIAgent() {
  return (
    <section className="py-48 bg-white overflow-hidden relative">
      {/* Decorative OS Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#007aff]/5 blur-[120px] rounded-full -z-10"></div>
      
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            {/* Left: AI Visual Component */}
            <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
            >
                <Card className="p-10 bg-slate-50 border-slate-100 rounded-[56px] shadow-glass relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-1 bg-[#007aff] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-1000"></div>
                    
                    <div className="flex items-center gap-6 mb-12">
                        <div className="w-16 h-16 bg-[#007aff] rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-500/20 animate-pulse-slow">
                            <Bot className="text-white" size={32} />
                        </div>
                        <div>
                            <p className="text-2xl font-black text-[#1d1d1f]">Al Shifaa Agent</p>
                            <Badge className="bg-emerald-100 text-emerald-600 border-none text-[10px] font-black uppercase tracking-widest">Active & Learning</Badge>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="p-6 bg-white rounded-3xl shadow-sm border border-slate-100 max-w-[80%]">
                            <p className="text-[#1d1d1f] font-bold text-lg">"Hello, I'm your AI Medical Hub. How can I assist you with your booking today?"</p>
                        </div>
                        <div className="p-6 bg-[#007aff] text-white rounded-3xl shadow-xl ml-auto max-w-[80%] relative translate-y-4">
                            <div className="flex items-center gap-3 mb-2">
                                <Mic size={16} fill="white" />
                                <span className="text-xs font-black uppercase opacity-80">Urdu detected</span>
                            </div>
                            <p className="font-bold text-lg">"مجھے ڈاکٹر سارہ کے ساتھ شام 5 بجے کا وقت بک کرنا ہے۔"</p>
                        </div>
                    </div>

                    <div className="mt-16 flex gap-4">
                        <div className="flex -space-x-4">
                            {[1,2,3].map(i => <div key={i} className="w-10 h-10 rounded-full border-4 border-slate-50 bg-slate-200"></div>)}
                        </div>
                        <p className="text-sm font-bold text-[#86868b] self-center">Handling 2.5k conversations daily</p>
                    </div>
                </Card>

                {/* Floating Tags */}
                <motion.div 
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-8 -right-8 p-6 bg-white shadow-2xl rounded-3xl border border-slate-50"
                >
                    <Sparkles className="text-[#007aff] mb-2" size={24} />
                    <p className="text-xs font-black text-[#1d1d1f] uppercase tracking-widest">Atomic Conflict Check</p>
                </motion.div>
            </motion.div>

            {/* Right: Text & Value Prop */}
            <div className="space-y-12">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <Badge className="bg-blue-50 text-[#007aff] border-none mb-6 px-4 py-2 font-black uppercase tracking-widest text-xs">Conversational Health</Badge>
                    <h2 className="text-5xl md:text-7xl font-black text-[#1d1d1f] leading-none tracking-tighter mb-10">
                        Meet your <br/> Personal <span className="text-[#007aff]">AI Agent.</span>
                    </h2>
                    <p className="text-xl text-[#86868b] font-medium leading-relaxed max-w-xl">
                        Say goodbye to complex forms. Our AI agent handles the entire 
                        booking process through natural conversation. 
                        It finds your specialist, checks real-time availability using 
                        atomic scheduling, and confirms your slot instantly.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {[
                        { title: 'Zero Conflicts', desc: 'Atomic DB locking ensures no double bookings.' },
                        { title: 'Urdu & English', desc: 'Native support for conversational booking.' },
                        { title: 'Secure Identity', desc: 'Verified booking with encrypted records.' },
                        { title: 'Hands-Free', desc: 'Voice commands for simple accessibility.' }
                    ].map((item, idx) => (
                        <div key={idx} className="flex gap-4 group">
                            <CheckCircle className="text-emerald-500 flex-shrink-0 group-hover:scale-110 transition-transform" />
                            <div>
                                <h4 className="font-black text-[#1d1d1f] text-lg">{item.title}</h4>
                                <p className="text-[#86868b] font-medium text-sm">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}
