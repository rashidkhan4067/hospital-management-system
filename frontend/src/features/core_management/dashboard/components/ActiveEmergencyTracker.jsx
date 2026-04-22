import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Clock, Users, ArrowRight, Ambulance } from 'lucide-react';

const EmergencyCase = ({ id, status, time, patient, triage }) => {
    const color = triage === 'Red' ? 'var(--m3-error)' : (triage === 'Yellow' ? 'var(--m3-warning)' : 'var(--m3-success)');
    return (
        <div style={{ 
            display: 'flex', alignItems: 'center', gap: 12, padding: '12px', 
            borderRadius: 12, background: 'var(--m3-surface-variant)',
            border: '1px solid var(--m3-outline-variant)'
        }}>
            <div style={{ 
                width: 32, height: 32, borderRadius: '50%', background: color,
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff'
            }}>
                <Activity size={16} />
            </div>
            <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--m3-text-main)' }}>{patient}</div>
                <div style={{ fontSize: 11, color: 'var(--m3-text-sub)', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Clock size={10} /> {time} ago · <span style={{ color }}>Triage: {triage}</span>
                </div>
            </div>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--m3-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 2 }}>
                Open <ArrowRight size={12} />
            </div>
        </div>
    );
};

const ActiveEmergencyTracker = () => {
    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="widget" 
            style={{ 
                borderColor: 'var(--m3-error)', 
                background: 'rgba(179, 38, 30, 0.05)'
            }}
        >
            <div className="widget-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ 
                        width: 40, height: 40, borderRadius: 12, background: 'var(--m3-error)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff'
                    }}>
                        <Ambulance size={22} />
                    </div>
                    <div>
                        <div className="eyebrow" style={{ color: 'var(--m3-error)' }}>Contextual Intelligence</div>
                        <div className="widget-title">Active Emergency Hub</div>
                    </div>
                </div>
                <div style={{ 
                    padding: '4px 10px', borderRadius: 20, background: 'var(--m3-error)', 
                    color: '#fff', fontSize: 10, fontWeight: 900 
                }}>
                    3 CRITICAL
                </div>
            </div>

            <div className="widget-body" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <EmergencyCase patient="Arshad Mehmood" time="4m" triage="Red" />
                <EmergencyCase patient="Fatima Begum" time="12m" triage="Red" />
                <EmergencyCase patient="Zeeshan Ali" time="22m" triage="Yellow" />
                
                <div style={{ 
                    marginTop: 8, padding: '12px', borderRadius: 12, 
                    border: '1px dashed var(--m3-error)', textAlign: 'center',
                    fontSize: 12, fontWeight: 700, color: 'var(--m3-error)'
                }}>
                    Reviewing Resuscitation Protocols...
                </div>
            </div>
        </motion.div>
    );
};

export default ActiveEmergencyTracker;
