import { memo } from 'react';
import { toast } from 'sonner';

const clients = [
  {
    id: '#001',
    name: 'Ana Silva',
    email: 'ana.silva@email.com',
    initials: 'AS',
    color: '#6366f1',
    lastPurchase: '05/08/2026',
    total: 'R$ 12.340',
    status: 'Ativo',
    statusType: 'success',
  },
  {
    id: '#002',
    name: 'Carlos Oliveira',
    email: 'carlos.o@email.com',
    initials: 'CO',
    color: '#a855f7',
    lastPurchase: '02/08/2026',
    total: 'R$ 8.920',
    status: 'Ativo',
    statusType: 'success',
  },
  {
    id: '#003',
    name: 'Mariana Costa',
    email: 'mari.costa@email.com',
    initials: 'MC',
    color: '#f43f5e',
    lastPurchase: '28/07/2026',
    total: 'R$ 5.410',
    status: 'Inativo',
    statusType: 'warning',
  },
  {
    id: '#004',
    name: 'Pedro Santos',
    email: 'pedro.s@email.com',
    initials: 'PS',
    color: '#10b981',
    lastPurchase: '15/07/2026',
    total: 'R$ 3.200',
    status: 'Ativo',
    statusType: 'success',
  },
  {
    id: '#005',
    name: 'Juliana Mendes',
    email: 'ju.mendes@email.com',
    initials: 'JM',
    color: '#f59e0b',
    lastPurchase: '10/07/2026',
    total: 'R$ 15.700',
    status: 'Ativo',
    statusType: 'success',
  },
];

const ClientsTable = memo(function ClientsTable() {
  const handleRowClick = (clientId: string, clientName: string) => {
    toast.info(`Visualizando perfil do cliente: ${clientName} (${clientId})`);
  };
  return (
    <section className="table-card animate-in animate-delay-6" aria-label="Lista de clientes">
      <div className="table-card-header">
        <div>
          <h2 className="table-card-title">Lista de Clientes</h2>
          <span className="table-card-count">{clients.length} clientes</span>
        </div>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table className="data-table">
          <caption className="sr-only">Lista completa de clientes com ID, última compra, total gasto e status</caption>
          <thead>
            <tr>
              <th scope="col">Cliente</th>
              <th scope="col">ID</th>
              <th scope="col">Última Compra</th>
              <th scope="col">Total Gasto</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {clients.map(client => (
              <tr 
                key={client.id}
                onClick={() => handleRowClick(client.id, client.name)}
                className="clickable-row"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleRowClick(client.id, client.name);
                  }
                }}
                aria-label={`Ver perfil de ${client.name}`}
              >
                <td>
                  <div className="table-customer">
                    <div className="table-customer-avatar" style={{ background: client.color }} aria-hidden="true">
                      {client.initials}
                    </div>
                    <div className="table-customer-info">
                      <span className="table-customer-name">{client.name}</span>
                      <span className="table-customer-email">{client.email}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <code style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>{client.id}</code>
                </td>
                <td style={{ color: 'var(--color-text-secondary)', fontSize: '13px' }}>
                  <time>{client.lastPurchase}</time>
                </td>
                <td>
                  <span className="table-amount positive">{client.total}</span>
                </td>
                <td>
                  <span className={`table-status ${client.statusType}`}>{client.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
});

export default ClientsTable;
