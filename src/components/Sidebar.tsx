import { memo, useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  ColumnsGap as LayoutDashboard,
  Cart as ShoppingCart,
  People as Users,
  BarChart as BarChart3,
  Gear as Settings,
  QuestionCircle as HelpCircle,
  BoxArrowRight as LogOut,
  Person as User,
  XLg as X,
} from 'react-bootstrap-icons';
import type { ComponentType } from 'react';

import logo from '../assets/new_admin_logo.webp';

interface NavItem {
  id: string;
  label: string;
  icon: ComponentType<any>;
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
  const { logout, lastAccess } = useAuth();
  const navigate = useNavigate();

  const formatLastAccess = (dateString: string | null) => {
    if (!dateString) return 'Acesso recente';
    const date = new Date(dateString);
    const now = new Date();
    const isToday = date.getDate() === now.getDate() && date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    const time = date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    return isToday ? `Hoje, ${time}` : `${date.toLocaleDateString('pt-BR')} às ${time}`;
  };

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
    <nav
      className={`sidebar ${isOpen ? 'open' : ''}`}
      aria-label="Menu principal"
    >
      <div className="sidebar-brand">
        <img src={logo} alt="AdminPanel Logo" width={32} height={32} className="sidebar-brand-icon w-8 h-8 rounded-md-custom object-cover" />
        <div className="sidebar-brand-text">
          <span className="sidebar-brand-name">AdminPanel</span>
          <span className="sidebar-brand-badge">Enterprise</span>
        </div>
        <button
          className="sidebar-close-btn"
          onClick={onClose}
          aria-label="Fechar menu"
          type="button"
        >
          <X size={20} aria-hidden="true" />
        </button>
      </div>

      <nav className="sidebar-nav" aria-label="Navegação lateral">
        <span className="sidebar-section-label" id="nav-main-label">Menu Principal</span>
        <ul role="list" aria-labelledby="nav-main-label" className="list-none p-0 m-0 contents-disp">
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
        <ul role="list" aria-labelledby="nav-system-label" className="list-none p-0 m-0 contents-disp">
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


        <div className="sidebar-footer" ref={profileRef}>
          <div
            className={`sidebar-user ${isProfileOpen ? 'active' : ''}`}
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            role="button"
            tabIndex={0}
            aria-expanded={isProfileOpen}
            aria-label="Menu do perfil — João Marcelo"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setIsProfileOpen(!isProfileOpen);
              }
            }}
          >
            <div className="sidebar-avatar" aria-hidden="true">JM</div>
            <div className="sidebar-user-info">
              <span className="sidebar-user-name">João Marcelo</span>
              <span className="sidebar-user-role">Administrador</span>
            </div>
          </div>

          {isProfileOpen && (
            <div className="sidebar-profile-menu">
              <div className="header-dropdown-header">
                <p className="header-dropdown-title">Dados do Perfil</p>
                <p className="header-dropdown-subtitle">joao.marcelo@admin.com</p>
                <p className="header-dropdown-subtitle">Último acesso: {formatLastAccess(lastAccess)}</p>
              </div>
              <div className="header-dropdown-body padding-sm">
                <button
                  className="dropdown-menu-item"
                  onClick={() => { setIsProfileOpen(false); navigate('/configuracoes'); }}
                >
                  <User size={16} />
                  <span>Meus Dados</span>
                </button>
                <button
                  className="dropdown-menu-item danger"
                  onClick={() => { setIsProfileOpen(false); logout(); }}
                >
                  <LogOut size={16} />
                  <span>Sair da Conta</span>
                </button>
              </div>
            </div>
          )}
        </div>
    </nav>
  );
});

export default Sidebar;
