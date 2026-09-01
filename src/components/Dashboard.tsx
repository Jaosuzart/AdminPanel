import { DollarSign, ShoppingCart, Users, TrendingUp } from 'lucide-react';
import MetricCard from './MetricCard';
import { SalesChart, ClientsChart } from './Charts';
import RecentSales from './RecentSales';
import ClientsTable from './ClientsTable';

const metrics = [
  {
    icon: DollarSign,
    label: 'Receita Total',
    value: 'R$ 12.840',
    trend: '+12,4%',
    trendDirection: 'up' as const,
    color: 'indigo',
  },
  {
    icon: ShoppingCart,
    label: 'Pedidos',
    value: '384',
    trend: '+8,2%',
    trendDirection: 'up' as const,
    color: 'emerald',
  },
  {
    icon: Users,
    label: 'Clientes Ativos',
    value: '921',
    trend: '+5,1%',
    trendDirection: 'up' as const,
    color: 'amber',
  },
  {
    icon: TrendingUp,
    label: 'Taxa de Conversão',
    value: '6,8%',
    trend: '+1,7%',
    trendDirection: 'up' as const,
    color: 'rose',
  },
];
export default function Dashboard() {
  return (
    <main className="animate-in">

      <header className="dashboard-greeting">
        <h1>Bom dia, João 👋</h1>
        <p>Aqui está um resumo do desempenho do seu negócio hoje.</p>
      </header>
      <section className="metrics-grid" role="region" aria-label="Métricas principais">
        {metrics.map((m, i) => (
          <MetricCard key={m.label} {...m} delay={i + 1} />
        ))}
      </section>
      <section className="charts-grid" role="region" aria-label="Gráficos de desempenho">
        <SalesChart />
        <ClientsChart />
      </section>
      <section className="bottom-grid" role="region" aria-label="Tabelas de dados">
        <RecentSales />
        <ClientsTable />
      </section>
    </main>
  );
}
