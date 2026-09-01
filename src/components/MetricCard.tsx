import { memo, type CSSProperties } from 'react';
import { TrendingUp, TrendingDown, type LucideIcon } from 'lucide-react';

interface MetricCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  trend: string;
  trendDirection?: 'up' | 'down';
  color: string;
  delay?: number;
}

const colorMap: Record<string, { bg: string; fg: string }> = {
  indigo: { bg: 'rgba(129, 140, 248, 0.12)', fg: '#818cf8' },
  emerald: { bg: 'rgba(52, 211, 153, 0.12)', fg: '#34d399' },
  amber: { bg: 'rgba(251, 191, 36, 0.12)', fg: '#fbbf24' },
  rose: { bg: 'rgba(251, 113, 133, 0.12)', fg: '#fb7185' },
};

const MetricCard = memo(function MetricCard({ icon: Icon, label, value, trend, trendDirection = 'up', color, delay = 0 }: MetricCardProps) {
  const c = colorMap[color] || colorMap.indigo;

  return (
    <article
      className={`metric-card animate-in animate-delay-${delay}`}
      style={{ '--metric-bg': c.bg, '--metric-color': c.fg } as CSSProperties}
      aria-label={`${label}: ${value}`}
    >
      <div className="metric-card-header">
        <div className="metric-card-icon" aria-hidden="true">
          <Icon size={22} />
        </div>
        <span
          className={`metric-card-trend ${trendDirection}`}
          aria-label={`Tendência ${trendDirection === 'up' ? 'positiva' : 'negativa'} ${trend}`}
        >
          {trendDirection === 'up' ? <TrendingUp size={14} aria-hidden="true" /> : <TrendingDown size={14} aria-hidden="true" />}
          {trend}
        </span>
      </div>
      <div className="metric-card-body">
        <span className="metric-card-value">{value}</span>
        <span className="metric-card-label">{label}</span>
      </div>
    </article>
  );
});

export default MetricCard;

