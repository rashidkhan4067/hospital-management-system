import React from 'react';
import { Heart, Activity, Globe, Shield, Zap, ShieldCheck, MessageCircle, Share2, ExternalLink } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ROLES } from '../../constants';
import { motion } from 'framer-motion';

/**
 *  Ultra Premium Apple-Style Footer
 * Focus: Clean Grid, Elegant Typography, Minimalist Sophistication.
 */
export default function Footer() {
  const { role } = useAuth();
  const location = useLocation();
  const isPublic = ['/', '/doctors', '/specialists', '/clinical-tech', '/safety-protocol', '/reviews'].includes(location.pathname);

  return (
    <footer className="w-full bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 pt-20 pb-12 transition-all duration-700">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-20">
          
          {/* Brand Pillar */}
          <div className="lg:col-span-2 space-y-8">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
                 <Heart size={20} fill="white" className="text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-slate-900 dark:text-white font-bold text-xl tracking-tight leading-none">Al Shifaa</span>
                <span className="text-[10px] font-bold text-blue-600 tracking-[0.2em] uppercase opacity-70 mt-1">Clinical Excellence</span>
              </div>
            </Link>
            <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed max-w-sm">
              Providing unified, high-fidelity healthcare management systems for the next generation of clinical practitioners in Pakistan.
            </p>
            <div className="flex items-center gap-5">
              {[MessageCircle, Share2, ExternalLink, Globe].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-600/30 transition-all duration-300 shadow-sm">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav Pillars */}
          <FooterColumn title="Platform" links={[
            { label: 'Specialists', to: '/specialists' },
            { label: 'Technology', to: '/clinical-tech' },
            { label: 'Safety Protocol', to: '/safety-protocol' },
            { label: 'Reviews', to: '/reviews' }
          ]} />

          <FooterColumn title="Resources" links={[
            { label: 'Help Center', to: '#' },
            { label: 'Practice Guide', to: '#' },
            { label: 'Privacy Policy', to: '#' },
            { label: 'Terms of Service', to: '#' }
          ]} />

          <FooterColumn title="Security" links={[
            { label: 'Data Encryption', to: '#' },
            { label: 'HIPAA Compliance', to: '#' },
            { label: 'Neural Protection', to: '#' },
            { label: 'Verified Node', to: '#' }
          ]} />
        </div>

        {/* Bottom Legal Shard */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6 text-sm text-slate-400 font-medium">
            <p>© 2026 Al Shifaa Medical Group.</p>
            <div className="hidden md:block w-1 h-1 bg-slate-300 dark:bg-slate-700 rounded-full" />
            <p>Made for Pakistan.</p>
          </div>
          <div className="flex items-center gap-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-5 py-2 rounded-full shadow-sm">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-widest">System Status: Active</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }) {
  return (
    <div className="space-y-6">
      <h4 className="text-slate-900 dark:text-white font-bold text-sm tracking-tight">{title}</h4>
      <ul className="space-y-4">
        {links.map((link, i) => (
          <li key={i}>
            <Link to={link.to} className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm font-medium">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

