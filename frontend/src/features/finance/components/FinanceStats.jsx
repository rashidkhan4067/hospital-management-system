import React from 'react';
import { TrendingUp, CreditCard, Receipt, AlertCircle } from 'lucide-react';
import { StatsCard } from '@/shared/components/ui';

export default function FinanceStats({ metrics, loading }) {
    const stats = [
        { 
            title: "Network Revenue", 
            value: loading ? "..." : `Rs. ${(metrics?.net_revenue || 0).toLocaleString()}`, 
            icon: TrendingUp, 
            trend: "Real-time",
            color: "var(--accent-primary)"
        },
        { 
            title: "Pending Assets", 
            value: loading ? "..." : metrics?.pending_invoices ?? 0, 
            icon: CreditCard, 
            trend: "In-Transit",
            color: "#8b5cf6"
        },
        { 
            title: "Flux Propagations", 
            value: loading ? "..." : metrics?.total_transactions ?? 0, 
            icon: Receipt, 
            trend: "Synced",
            color: "#10b981"
        },
        { 
            title: "Alert Shards", 
            value: "0", 
            icon: AlertCircle, 
            trend: "Status: OK",
            color: "#f43f5e"
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {stats.map((stat, i) => <StatsCard key={i} {...stat} />)}
        </div>
    );
}
