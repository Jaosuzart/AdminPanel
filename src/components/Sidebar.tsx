import { memo, useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  HelpCircle,
  LogOut,
  User,
  type LucideIcon,
} from 'lucide-react';

import logo from '../assets/admin_panel_logo.jpg';

interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  badge?: number;
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'pedidos', label: 'Pedidos', icon: ShoppingCart, badge: 12 },
  { id: 'clientes', label: 'Clientes', icon: Users },
  { id: 'relatorios', label: 'Relatórios', icon: BarChart3 },
];

const bottomItems: NavItem[] = [
  { id: 'configuracoes', label: 'Configurações', icon: Settings },
  { id: 'ajuda', label: 'Ajuda', icon: HelpCircle },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentPath?: string;
}

const Sidebar = memo(function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event: Event) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  return (
    <aside
      className={`sidebar ${isOpen ? 'open' : ''}`}
      role="navigation"
      aria-label="Menu principal"
    >
      {/* Brand */}
      <div className="sidebar-brand">
        <img src={logo} alt="Admin Logo" className="sidebar-brand-icon" style={{ width: '32px', height: '32px', borderRadius: '8px', objectFit: 'cover' }} />
        <div className="sidebar-brand-text">
          <span className="sidebar-brand-name">AdminPanel</span>
          <span className="sidebar-brand-badge">Enterprise</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav" aria-label="Navegação lateral">
        <span className="sidebar-section-label" id="nav-main-label">Menu Principal</span>
        <ul role="list" aria-labelledby="nav-main-label" style={{ listStyle: 'none', padding: 0, margin: 0, display: 'contents' }}>
          {navItems.map(item => (
            <li key={item.id}>
              <NavLink
                to={`/${item.id}`}
                className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                onClick={onClose}
              >
                <item.icon className="sidebar-link-icon" aria-hidden="true" />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="sidebar-badge" aria-label={`${item.badge} novos`}>
                    {item.badge}
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <span className="sidebar-section-label" id="nav-system-label">Sistema</span>
        <ul role="list" aria-labelledby="nav-system-label" style={{ listStyle: 'none', padding: 0, margin: 0, display: 'contents' }}>
          {bottomItems.map(item => (
            <li key={item.id}>
              <NavLink
                to={`/${item.id}`}
                className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                onClick={onClose}
              >
                <item.icon className="sidebar-link-icon" aria-hidden="true" />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>


        <div className="sidebar-footer" ref={profileRef} style={{ position: 'relative' }}>
          <div
            className="sidebar-user"
            style={{ cursor: 'pointer', background: isProfileOpen ? 'rgba(129, 140, 248, 0.08)' : 'transparent' }}
            onClick={() => setIsProfileOpen(!isProfileOpen)}
          >
            <div className="sidebar-avatar" aria-hidden="true">JM</div>
            <div className="sidebar-user-info">
              <span className="sidebar-user-name">João Marcelo</span>
              <span className="sidebar-user-role">Administrador</span>
            </div>
          </div>

          {isProfileOpen && (
            <div style={{ position: 'absolute', bottom: 'calc(100% + 8px)', left: '12px', width: 'calc(100% - 24px)', background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-lg)', zIndex: 100, overflow: 'hidden' }}>
              <div style={{ padding: '16px', borderBottom: '1px solid var(--color-border)' }}>
                <p style={{ margin: 0, fontWeight: 600, fontSize: '14px', color: 'var(--color-text-primary)' }}>Dados do Perfil</p>
                <p style={{ margin: 0, fontSize: '12px', color: 'var(--color-text-muted)' }}>joao.marcelo@admin.com</p>
                <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: 'var(--color-text-muted)' }}>Último acesso: Hoje, 08:30</p>
              </div>
              <div style={{ padding: '8px' }}>
                <button
                  style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', borderRadius: 'var(--radius-sm)', color: 'var(--color-text-secondary)', transition: 'background 0.2s' }}
                  onClick={() => { setIsProfileOpen(false); navigate('/configuracoes'); }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-bg-primary)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <User size={16} />
                  <span style={{ fontSize: '14px', fontWeight: 500 }}>Meus Dados</span>
                </button>
                <button
                  style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', borderRadius: 'var(--radius-sm)', color: 'var(--color-danger)', transition: 'background 0.2s', marginTop: '4px' }}
                  onClick={() => { setIsProfileOpen(false); logout(); }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <LogOut size={16} />
                  <span style={{ fontSize: '14px', fontWeight: 500 }}>Sair da Conta</span>
                </button>
              </div>
            </div>
          )}
        </div>
    </aside>
  );
});

export default Sidebar;
