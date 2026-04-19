import React, { useState, useEffect } from 'react';
import { useAuthStore } from '@/core/store/useAuthStore';
import { Clock, Activity, Users } from 'lucide-react';

/**
 * GreetingHeader — Compact Google-style
 * Clean identity block + live clock + 2 stat chips
 */
const GreetingHeader = () => {
    const user = useAuthStore(s => s.user);
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const id = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(id);
    }, []);

    const hour     = time.getHours();
    const name     = user?.full_name?.split(' ')[0] || 'Administrator';
    const initials = user?.full_name
        ? user.full_name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
        : 'AD';

    const greeting =
        hour < 5  ? 'Good night'     :
        hour < 12 ? 'Good morning'   :
        hour < 17 ? 'Good afternoon' :
        hour < 21 ? 'Good evening'   : 'Good night';

    const timeLabel = time.toLocaleTimeString('en-US', {
        hour: '2-digit', minute: '2-digit', second: '2-digit',
    });
    const dateLabel = time.toLocaleDateString('en-US', {
        weekday: 'short', month: 'short', day: 'numeric',
    });

    const stats = [
        { Icon: Users,    value: '142',   label: 'Staff on duty' },
        { Icon: Activity, value: '98.6%', label: 'System health' },
    ];

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            flexWrap: 'wrap',
        }}>
            {/* Left: avatar + greeting */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                {/* Avatar */}
                <div
                    style={{
                        width: 42, height: 42, borderRadius: 12,
                        background: 'var(--m3-primary)', color: '#fff',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 15, fontWeight: 900, flexShrink: 0,
                        boxShadow: 'var(--m3-elev-2)',
                    }}
                    aria-hidden="true"
                >
                    {initials}
                </div>

                <div>
                    {/* Live indicator */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 2 }}>
                        <span style={{
                            width: 6, height: 6, borderRadius: '50%',
                            background: 'var(--m3-success)', display: 'inline-block',
                            animation: 'pulse 2s ease-in-out infinite',
                        }} aria-hidden="true" />
                        <span style={{
                            fontSize: 10, fontWeight: 800, color: 'var(--m3-success)',
                            textTransform: 'uppercase', letterSpacing: '0.12em',
                        }}>
                            {dateLabel}
                        </span>
                    </div>

                    {/* Headline */}
                    <h1 style={{
                        fontSize: 'clamp(20px, 3vw, 26px)',
                        fontWeight: 900,
                        color: 'var(--m3-text-main)',
                        letterSpacing: '-0.03em',
                        lineHeight: 1,
                        margin: 0,
                    }}>
                        {greeting},{' '}
                        <span style={{ color: 'var(--m3-primary)' }}>{name}</span>
                    </h1>

                    <p style={{
                        fontSize: 12, color: 'var(--m3-text-sub)', margin: '3px 0 0',
                        fontWeight: 500,
                    }}>
                        Morning Rotation Active · Next Huddle <strong>2:00 PM</strong>
                    </p>
                </div>
            </div>

            {/* Right: clock + stat chips */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                {/* Live clock */}
                <div
                    style={{
                        display: 'flex', alignItems: 'center', gap: 7,
                        padding: '7px 12px',
                        background: 'var(--m3-surface-bright)',
                        border: '1px solid var(--m3-outline-variant)',
                        borderRadius: 10,
                        boxShadow: 'var(--m3-elev-1)',
                    }}
                    aria-label={`Current time: ${timeLabel}`}
                >
                    <Clock size={14} style={{ color: 'var(--m3-primary)' }} aria-hidden="true" />
                    <div>
                        <time style={{ fontSize: 14, fontWeight: 900, color: 'var(--m3-text-main)', fontVariantNumeric: 'tabular-nums', fontFamily: 'ui-monospace, monospace', display: 'block', letterSpacing: '-0.01em' }}>
                            {timeLabel}
                        </time>
                        <span style={{ fontSize: 9, fontWeight: 700, color: 'var(--m3-text-sub)', textTransform: 'uppercase', letterSpacing: '0.12em', opacity: 0.6 }}>
                            PKT Local
                        </span>
                    </div>
                </div>

                {/* Stat chips */}
                {stats.map(({ Icon, value, label }) => (
                    <div
                        key={label}
                        style={{
                            display: 'flex', alignItems: 'center', gap: 7,
                            padding: '7px 12px',
                            background: 'var(--m3-surface-bright)',
                            border: '1px solid var(--m3-outline-variant)',
                            borderRadius: 10,
                            boxShadow: 'var(--m3-elev-1)',
                        }}
                    >
                        <div style={{
                            width: 26, height: 26, borderRadius: 8,
                            background: 'var(--m3-primary-container)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: 'var(--m3-primary)', flexShrink: 0,
                        }} aria-hidden="true">
                            <Icon size={14} />
                        </div>
                        <div>
                            <div style={{ fontSize: 14, fontWeight: 900, color: 'var(--m3-text-main)', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>
                                {value}
                            </div>
                            <div style={{ fontSize: 9, fontWeight: 700, color: 'var(--m3-text-sub)', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.6, marginTop: 2 }}>
                                {label}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GreetingHeader;
