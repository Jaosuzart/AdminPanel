import { useRef, useMemo, memo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';
import { useTheme } from '../contexts/ThemeContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Filler,
  Tooltip,
  Legend
);

const MONTHS = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago'];
const REVENUE_2026 = [3200, 4100, 3800, 5200, 4900, 6100, 5800, 7200];
const REVENUE_2025 = [2800, 3200, 3100, 4000, 3800, 4500, 4200, 5100];
const CLIENT_DISTRIBUTION = [340, 450, 131];
const CLIENT_LABELS = ['Novos', 'Recorrentes', 'Inativos'];

export const SalesChart = memo(function SalesChart() {
  const { theme } = useTheme();
  const chartRef = useRef(null);

  const textColor = theme === 'dark' ? '#e2e8f0' : '#4b5563';
  const gridColor = theme === 'dark' ? 'rgba(165,180,252,0.06)' : 'rgba(15,23,42,0.06)';

  const data = useMemo(() => ({
    labels: MONTHS,
    datasets: [
      {
        label: 'Receita 2026',
        data: REVENUE_2026,
        borderColor: '#818cf8',
        backgroundColor: (ctx: any) => {
          const chart = ctx.chart;
          const { ctx: context, chartArea } = chart;
          if (!chartArea) return 'rgba(129,140,248,0.1)';
          const gradient = context.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, 'rgba(129,140,248,0.28)');
          gradient.addColorStop(1, 'rgba(129,140,248,0.0)');
          return gradient;
        },
        borderWidth: 2.5,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#818cf8',
        pointHoverBorderColor: '#fff',
        pointHoverBorderWidth: 2,
      },
      {
        label: 'Receita 2025',
        data: REVENUE_2025,
        borderColor: '#c084fc',
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderDash: [6, 4],
        fill: false,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: '#c084fc',
      },
    ],
  }), []);

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
    animation: {
      duration: 800,
      easing: 'easeOutQuart' as const,
    },
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
        align: 'end' as const,
        labels: {
          color: textColor,
          font: { family: 'Inter', size: 12, weight: '500' },
          usePointStyle: true,
          pointStyle: 'circle',
          boxWidth: 6,
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: theme === 'dark' ? '#1e2433' : '#0f172a',
        titleColor: '#f1f5f9',
        bodyColor: '#cbd5e1',
        padding: 12,
        cornerRadius: 8,
        titleFont: { family: 'Inter', size: 13, weight: '600' },
        bodyFont: { family: 'Inter', size: 12 },
        callbacks: {
          label: (ctx: any) => ` R$ ${ctx.parsed.y.toLocaleString('pt-BR')}`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: textColor, font: { family: 'Inter', size: 12 } },
        border: { display: false },
      },
      y: {
        grid: { color: gridColor },
        ticks: {
          color: textColor,
          font: { family: 'Inter', size: 12 },
          callback: (v: any) => `R$ ${(v / 1000).toFixed(0)}k`,
        },
        border: { display: false },
      },
    },
  }), [theme, textColor, gridColor]);

  return (
    <section className="chart-card animate-in animate-delay-5" aria-label="Gráfico de receita mensal">
      <div className="chart-card-header">
        <div>
          <h2 className="chart-card-title">Receita Mensal</h2>
          <p className="chart-card-subtitle">Comparativo anual de faturamento</p>
        </div>
      </div>
      <div className="chart-wrapper">
        <Line ref={chartRef} data={data} options={options as any} />
      </div>
    </section>
  );
});

export const ClientsChart = memo(function ClientsChart() {
  const { theme } = useTheme();

  const textColor = theme === 'dark' ? '#e2e8f0' : '#64748b';

  const data = useMemo(() => ({
    labels: CLIENT_LABELS,
    datasets: [
      {
        data: CLIENT_DISTRIBUTION,
        backgroundColor: ['#818cf8', '#c084fc', theme === 'dark' ? '#64748b' : '#e2e8f0'],
        borderColor: theme === 'dark' ? '#112240' : '#ffffff',
        borderWidth: 3,
        hoverOffset: 8,
      },
    ],
  }), [theme]);

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    cutout: '72%',
    animation: {
      duration: 800,
      easing: 'easeOutQuart' as const,
    },
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: textColor,
          font: { family: 'Inter', size: 12, weight: '500' },
          usePointStyle: true,
          pointStyle: 'circle',
          boxWidth: 8,
          padding: 16,
        },
      },
      tooltip: {
        backgroundColor: theme === 'dark' ? '#1e2433' : '#0f172a',
        titleColor: '#f1f5f9',
        bodyColor: '#cbd5e1',
        padding: 12,
        cornerRadius: 8,
        titleFont: { family: 'Inter', size: 13, weight: '600' },
        bodyFont: { family: 'Inter', size: 12 },
      },
    },
  }), [theme, textColor]);

  return (
    <section className="chart-card animate-in animate-delay-6" aria-label="Gráfico de base de clientes">
      <div className="chart-card-header">
        <div>
          <h2 className="chart-card-title">Base de Clientes</h2>
          <p className="chart-card-subtitle">Distribuição por tipo</p>
        </div>
      </div>
      <div className="chart-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '260px', height: '260px', position: 'relative' }}>
          <Doughnut data={data} options={options as any} />
          <div
            className="doughnut-center-label"
            aria-hidden="true"  >
            <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-text-primary)', letterSpacing: '-0.03em' }}>921</div>
            <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', fontWeight: 500 }}>Total</div>
          </div>
        </div>
      </div>
    </section>
  );
});
