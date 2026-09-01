import { memo, useCallback, useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, Menu, Moon, Sun, User, LogOut, Check } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';

interface Notification {
  id: number;
  text: string;
  time: string;
  unread: boolean;
}

interface HeaderProps {
  onMenuToggle: () => void;
}

const Header = memo(function Header({ onMenuToggle }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const notificationsRef = useRef<HTMLDivElement>(null);

  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, text: 'Novo pedido #4892 recebido', time: 'Há 5 min', unread: true },
    { id: 2, text: 'Chamado de suporte urgente de Maria', time: 'Há 20 min', unread: true },
    { id: 3, text: 'Relatório mensal gerado com sucesso', time: 'Há 2 horas', unread: true },
  ]);

  useEffect(() => {
    function handleClickOutside(event: Event) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = useCallback(() => {
    toggleTheme();
    const meta = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement | null;
    if (meta) {
      meta.content = theme === 'dark' ? '#eef1f6' : '#0a0e1a';
    }
  }, [theme, toggleTheme]);

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
    toast.success('Todas as notificações marcadas como lidas');
    setIsNotificationsOpen(false);
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="header" role="banner">
      <div className="header-left">
        <button
          className="header-menu-btn"
          onClick={onMenuToggle}
          aria-label="Abrir menu de navegação"
          type="button"
        >
          <Menu size={22} aria-hidden="true" />
        </button>

        <div className="header-search" role="search">
          <Search className="header-search-icon" aria-hidden="true" />
          <input
            type="search"
            className="header-search-input"
            placeholder="Buscar qualquer coisa..."
            aria-label="Buscar no dashboard"
            autoComplete="off"
          />
        </div>
      </div>

      <div className="header-right">
        <button
          className="header-icon-btn"
          onClick={handleToggle}
          aria-label={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
          type="button"
        >
          {theme === 'dark' ? <Sun size={20} aria-hidden="true" /> : <Moon size={20} aria-hidden="true" />}
        </button>

        <div className="header-dropdown-wrapper" ref={notificationsRef}>
          <button
            className="header-icon-btn"
            aria-label={`Notificações — ${unreadCount} novas`}
            type="button"
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
          >
            <Bell size={20} aria-hidden="true" />
            {unreadCount > 0 && <span className="header-notification-dot" aria-hidden="true" />}
          </button>

          {isNotificationsOpen && (
            <div className="header-dropdown-menu notifications">
              <div className="header-dropdown-header flex-between">
                <div>
                  <h3 className="header-dropdown-title">Notificações</h3>
                  <p className="header-dropdown-subtitle">Você tem {unreadCount} mensagens não lidas.</p>
                </div>
                {unreadCount > 0 && (
                  <button onClick={markAllAsRead} className="header-dropdown-action">
                    <Check size={14} /> Marcar lidas
                  </button>
                )}
              </div>
              <div className="header-dropdown-body">
                {notifications.length === 0 ? (
                  <div className="header-dropdown-empty">
                    Nenhuma notificação no momento.
                  </div>
                ) : (
                  notifications.map(notif => (
                    <div 
                      key={notif.id} 
                      className={`notification-item ${notif.unread ? 'unread' : ''}`}
                      onClick={() => {
                        setNotifications(notifications.map(n => n.id === notif.id ? { ...n, unread: false } : n));
                        navigate(notif.text.includes('pedido') ? '/pedidos' : '/dashboard');
                        setIsNotificationsOpen(false);
                      }}
                    >
                      <span className="notification-text">{notif.text}</span>
                      <span className="notification-time">{notif.time}</span>
                    </div>
                  ))
                )}
              </div>
              <div className="header-dropdown-header" style={{ textAlign: 'center', borderTop: '1px solid var(--color-border)', borderBottom: 'none' }}>
                <button onClick={() => { setIsNotificationsOpen(false); navigate('/configuracoes'); }} style={{ fontSize: '13px', color: 'var(--color-text-primary)', fontWeight: 500, width: '100%', background: 'none', border: 'none', cursor: 'pointer' }}>
                  Ver todas as notificações
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="header-divider" role="separator" aria-orientation="vertical" />

        <div className="header-dropdown-wrapper" ref={profileRef}>
          <button
            className={`sidebar-avatar header-profile-btn ${isProfileOpen ? 'active' : ''}`}
            aria-label="Menu do perfil — João Marcelo"
            type="button"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
          >
            JM
          </button>

          {isProfileOpen && (
            <div className="header-dropdown-menu profile">
              <div className="header-dropdown-header">
                <p className="header-dropdown-title">João Marcelo</p>
                <p className="header-dropdown-subtitle">joao.marcelo@admin.com</p>
              </div>
              <div className="header-dropdown-body padding-sm">
                <button 
                  className="dropdown-menu-item"
                  onClick={() => { setIsProfileOpen(false); navigate('/configuracoes'); }}
                >
                  <User size={16} />
                  <span>Configurações</span>
                </button>
                <button 
                  className="dropdown-menu-item danger"
                  onClick={() => { setIsProfileOpen(false); logout(); }}
                >
                  <LogOut size={16} />
                  <span>Sair do sistema</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
});

export default Header;
