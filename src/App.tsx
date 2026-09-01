import { useState, useCallback, lazy, Suspense, type ReactNode } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Login from './pages/Login';

const Dashboard = lazy(() => import('./components/Dashboard'));
const Pedidos = lazy(() => import('./pages/Pedidos'));
const Clientes = lazy(() => import('./pages/Clientes'));
const Relatorios = lazy(() => import('./pages/Relatorios'));
const Configuracoes = lazy(() => import('./pages/Configuracoes'));
const Ajuda = lazy(() => import('./pages/Ajuda'));

function DashboardSkeleton() {
  return (
    <div className="dashboard-skeleton" role="status" aria-label="Carregando dashboard">
      <div className="skeleton-greeting">
        <div className="skeleton-line" style={{ width: '45%', height: 28 }} />
        <div className="skeleton-line" style={{ width: '60%', height: 16, marginTop: 8 }} />
      </div>
      <div className="metrics-grid" style={{ marginTop: 32 }}>
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="skeleton-card" />
        ))}
      </div>
    </div>
  );
}

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <DashboardSkeleton />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
}

function MainLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname.substring(1) || 'dashboard';

  const toggleSidebar = useCallback(() => setSidebarOpen(prev => !prev), []);
  const closeSidebar = useCallback(() => setSidebarOpen(false), []);

  return (
    <div className="app-layout">
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={closeSidebar} 
        currentPath={currentPath} 
      />

      {sidebarOpen && (
        <div
          className="sidebar-overlay open"
          onClick={closeSidebar}
          role="presentation"
          aria-hidden="true"
        />
      )}

      <div className="main-wrapper">
        <Header onMenuToggle={toggleSidebar} />
        <main className="main-content" id="main-content" role="main">
          <Suspense fallback={<DashboardSkeleton />}>
            {children}
          </Suspense>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={
        <ProtectedRoute>
          <MainLayout>
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/pedidos" element={<Pedidos />} />
              <Route path="/clientes" element={<Clientes />} />
              <Route path="/relatorios" element={<Relatorios />} />
              <Route path="/configuracoes" element={<Configuracoes />} />
              <Route path="/ajuda" element={<Ajuda />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </MainLayout>
        </ProtectedRoute>
      } />
    </Routes>
  );
}
