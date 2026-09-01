import { memo } from 'react';
import { SalesChart, ClientsChart } from '../components/Charts';

export default memo(function Relatorios() {
  return (
    <main className="animate-in">
      <header className="dashboard-greeting">
        <h1>Relatórios Detalhados</h1>
        <p>Análise profunda das métricas de desempenho.</p>
      </header>
      <section className="charts-grid" style={{ contentVisibility: 'visible' }}>
        <SalesChart />
        <ClientsChart />
      </section>
    </main>
  );
});
