import { memo } from 'react';
import { toast } from 'sonner';

const sales = [
  {
    id: '#VD-2841',
    name: 'Ana Silva',
    email: 'ana.silva@email.com',
    initials: 'AS',
    color: '#6366f1',
    amount: 'R$ 4.280',
    status: 'Concluído',
    statusType: 'success',
    date: '05/08/2026',
  },
  {
    id: '#VD-2840',
    name: 'Carlos Oliveira',
    email: 'carlos.o@email.com',
    initials: 'CO',
    color: '#a855f7',
    amount: 'R$ 3.920',
    status: 'Concluído',
    statusType: 'success',
    date: '02/08/2026',
  },
  {
    id: '#VD-2839',
    name: 'Mariana Costa',
    email: 'mari.costa@email.com',
    initials: 'MC',
    color: '#f43f5e',
    amount: 'R$ 3.410',
    status: 'Revisão',
    statusType: 'warning',
    date: '28/07/2026',
  },
  {
    id: '#VD-2838',
    name: 'Pedro Santos',
    email: 'pedro.s@email.com',
    initials: 'PS',
    color: '#10b981',
    amount: 'R$ 2.750',
    status: 'Pendente',
    statusType: 'pending',
    date: '25/07/2026',
  },
  {
    id: '#VD-2837',
    name: 'Juliana Mendes',
    email: 'ju.mendes@email.com',
    initials: 'JM',
    color: '#f59e0b',
    amount: 'R$ 5.100',
    status: 'Concluído',
    statusType: 'success',
    date: '20/07/2026',
  },
];

const RecentSales = memo(function RecentSales() {
  const handleRowClick = (saleId: string) => {
    toast.success(`Visualizando detalhes do pedido: ${saleId}`);
  };
  return (
    <section className="table-card animate-in animate-delay-5" aria-label="Vendas recentes">
      <div className="table-card-header">
        <div>
          <h2 className="table-card-title">Vendas Recentes</h2>
          <span className="table-card-count">{sales.length} transações</span>
        </div>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table className="data-table">
          <caption className="sr-only">Lista das vendas mais recentes com cliente, pedido, data, valor e status</caption>
          <thead>
            <tr>
              <th scope="col">Cliente</th>
              <th scope="col">Pedido</th>
              <th scope="col">Data</th>
              <th scope="col">Valor</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {sales.map(sale => (
              <tr 
                key={sale.id}
                onClick={() => handleRowClick(sale.id)}
                className="clickable-row"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleRowClick(sale.id);
                  }
                }}
                aria-label={`Ver pedido ${sale.id} de ${sale.name}`}
              >
                <td>
                  <div className="table-customer">
                    <div className="table-customer-avatar" style={{ background: sale.color }} aria-hidden="true">
                      {sale.initials}
                    </div>
                    <div className="table-customer-info">
                      <span className="table-customer-name">{sale.name}</span>
                      <span className="table-customer-email">{sale.email}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <code style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>{sale.id}</code>
                </td>
                <td style={{ color: 'var(--color-text-secondary)', fontSize: '13px' }}>
                  <time>{sale.date}</time>
                </td>
                <td>
                  <span className="table-amount positive">{sale.amount}</span>
                </td>
                <td>
                  <span className={`table-status ${sale.statusType}`}>{sale.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
});

export default RecentSales;
