import { memo, type CSSProperties } from 'react';
import { GraphUp as TrendingUp, GraphDown as TrendingDown } from 'react-bootstrap-icons';
import type { ComponentType } from 'react';

interface MetricCardProps {
  icon: ComponentType<any>;
  label: string;
  value: string;
  trend: string;
  trendDirection?: 'up' | 'down';
  color: string;
  delay?: number;
}

const colorMap: Record<string, { bg: string; fg: string }> = {
  indigo: { bg: 'var(--metric-indigo-bg)', fg: 'var(--metric-indigo-fg)' },
  emerald: { bg: 'var(--metric-emerald-bg)', fg: 'var(--metric-emerald-fg)' },
  amber: { bg: 'var(--metric-amber-bg)', fg: 'var(--metric-amber-fg)' },
  rose: { bg: 'var(--metric-rose-bg)', fg: 'var(--metric-rose-fg)' },
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

