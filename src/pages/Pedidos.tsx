import { memo } from 'react';
import RecentSales from '../components/RecentSales';

export default memo(function Pedidos() {
  return (
    <main className="animate-in">
      <header className="dashboard-greeting">
        <h1>Pedidos</h1>
        <p>Gerenciamento de todas as vendas e transações.</p>
      </header>
      <RecentSales />
    </main>
  );
});
