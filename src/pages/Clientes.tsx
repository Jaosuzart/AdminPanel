import { memo } from 'react';
import ClientsTable from '../components/ClientsTable';

export default memo(function Clientes() {
  return (
    <main className="animate-in">
      <header className="dashboard-greeting">
        <h1>Clientes</h1>
        <p>Gestão da sua base de clientes e histórico.</p>
      </header>
      <ClientsTable />
    </main>
  );
});
