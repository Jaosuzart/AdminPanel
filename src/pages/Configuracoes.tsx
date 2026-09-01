import { memo, useState } from 'react';
import { User, Shield, Bell, Palette, ShieldCheck, Check, Camera } from 'lucide-react';
import { toast } from 'sonner';
import { useTheme } from '../contexts/ThemeContext';

export default memo(function Configuracoes() {
  const [activeTab, setActiveTab] = useState('perfil');
  const { theme, toggleTheme } = useTheme();

  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: false
  });

  const handleSave = () => {
    toast.success('Configurações salvas com sucesso!');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'perfil':
        return (
          <div className="animate-in">
            <div className="settings-card-header">
              <h2>Meus Dados</h2>
              <p>Gerencie as informações do seu perfil público e privado.</p>
            </div>
            
            <div className="settings-avatar-section">
              <div className="settings-avatar-preview">JM</div>
              <div>
                <button className="btn-secondary" style={{ marginBottom: '8px' }}>
                  <Camera size={16} style={{ marginRight: '8px' }} />
                  Alterar Foto
                </button>
                <p style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>JPG, GIF ou PNG. Máximo de 2MB.</p>
              </div>
            </div>

            <div className="settings-form">
              <div className="settings-form-row">
                <div className="settings-form-group">
                  <label>Nome Completo</label>
                  <input type="text" className="settings-input" defaultValue="João Marcelo" />
                </div>
                <div className="settings-form-group">
                  <label>Cargo</label>
                  <input type="text" className="settings-input" defaultValue="Engenheiro de Software Sênior" />
                </div>
              </div>
              <div className="settings-form-group">
                <label>E-mail corporativo</label>
                <input type="email" className="settings-input" defaultValue="joao.marcelo@admin.com" disabled />
                <span style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '6px', display: 'block' }}>Para alterar o e-mail corporativo, entre em contato com o TI.</span>
              </div>
              
              <div className="settings-form-actions">
                <button className="btn-primary" onClick={handleSave}>Salvar Alterações</button>
              </div>
            </div>
          </div>
        );

      case 'seguranca':
        return (
          <div className="animate-in">
            <div className="settings-card-header">
              <h2>Segurança da Conta</h2>
              <p>Gerencie sua senha e proteja sua conta com autenticação de dois fatores.</p>
            </div>

            <div className="settings-form">
              <div className="settings-form-group">
                <label>Senha Atual</label>
                <input type="password" className="settings-input" placeholder="••••••••" />
              </div>
              <div className="settings-form-row">
                <div className="settings-form-group">
                  <label>Nova Senha</label>
                  <input type="password" className="settings-input" placeholder="Nova senha segura" />
                </div>
                <div className="settings-form-group">
                  <label>Confirmar Nova Senha</label>
                  <input type="password" className="settings-input" placeholder="Repita a nova senha" />
                </div>
              </div>
              
              <div className="settings-form-actions">
                <button className="btn-primary" onClick={handleSave}>Atualizar Senha</button>
              </div>
            </div>

            <div style={{ marginTop: '40px', paddingTop: '32px', borderTop: '1px solid var(--color-border)' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>Autenticação de Dois Fatores (2FA)</h3>
              <div className="settings-switch-row">
                <div className="settings-switch-info">
                  <span className="settings-switch-title">Aplicativo Autenticador</span>
                  <span className="settings-switch-desc">Use um app como Google Authenticator para gerar códigos.</span>
                </div>
                <div className="toggle-switch" onClick={() => toast.info('Configuração de 2FA em breve!')} />
              </div>
            </div>
          </div>
        );

      case 'notificacoes':
        return (
          <div className="animate-in">
            <div className="settings-card-header">
              <h2>Preferências de Notificação</h2>
              <p>Escolha como você deseja ser alertado sobre atualizações no sistema.</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="settings-switch-row">
                <div className="settings-switch-info">
                  <span className="settings-switch-title">Notificações por E-mail</span>
                  <span className="settings-switch-desc">Receba resumos diários e alertas críticos no seu e-mail.</span>
                </div>
                <div 
                  className={`toggle-switch ${notifications.email ? 'active' : ''}`}
                  onClick={() => setNotifications(prev => ({ ...prev, email: !prev.email }))}
                />
              </div>
              <div className="settings-switch-row">
                <div className="settings-switch-info">
                  <span className="settings-switch-title">Notificações Push (Navegador)</span>
                  <span className="settings-switch-desc">Receba notificações em tempo real enquanto o painel estiver aberto.</span>
                </div>
                <div 
                  className={`toggle-switch ${notifications.push ? 'active' : ''}`}
                  onClick={() => setNotifications(prev => ({ ...prev, push: !prev.push }))}
                />
              </div>
              <div className="settings-switch-row">
                <div className="settings-switch-info">
                  <span className="settings-switch-title">Alertas via SMS</span>
                  <span className="settings-switch-desc">Apenas para alertas de segurança extremos.</span>
                </div>
                <div 
                  className={`toggle-switch ${notifications.sms ? 'active' : ''}`}
                  onClick={() => setNotifications(prev => ({ ...prev, sms: !prev.sms }))}
                />
              </div>
            </div>
            <div style={{ marginTop: '32px' }}>
              <button className="btn-primary" onClick={handleSave}>Salvar Preferências</button>
            </div>
          </div>
        );

      case 'aparencia':
        return (
          <div className="animate-in">
            <div className="settings-card-header">
              <h2>Aparência do Painel</h2>
              <p>Personalize a interface do sistema para o seu conforto visual.</p>
            </div>
            
            <div className="settings-switch-row">
              <div className="settings-switch-info">
                <span className="settings-switch-title">Modo Escuro (Dark Mode)</span>
                <span className="settings-switch-desc">Alterna entre as paletas de cores claras e escuras.</span>
              </div>
              <div 
                className={`toggle-switch ${theme === 'dark' ? 'active' : ''}`}
                onClick={() => {
                  toggleTheme();
                  const meta = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement | null;
                  if (meta) meta.content = theme === 'dark' ? '#eef1f6' : '#0a0e1a';
                }}
              />
            </div>
          </div>
        );

      case 'privacidade':
        return (
          <div className="animate-in">
            <div className="settings-card-header">
              <h2>Política de Privacidade</h2>
              <p>Nossos compromissos com a segurança e a privacidade dos seus dados corporativos.</p>
            </div>

            <div className="privacy-doc">
              <h3>1. Coleta e Uso de Dados</h3>
              <p>
                O AdminPanel Enterprise coleta informações essenciais de perfil (nome, cargo, e-mail) 
                exclusivamente para autenticação, controle de acessos baseados em função (RBAC) e auditoria de segurança.
                Todos os dados gerados através do uso da plataforma pertencem à organização contratante.
              </p>

              <h3>2. Conformidade (LGPD/GDPR)</h3>
              <p>
                Este sistema foi construído visando total aderência às legislações de proteção de dados (como LGPD no Brasil e GDPR na Europa). 
                Isso significa que:
              </p>
              <ul>
                <li>Seus dados são criptografados em repouso e em trânsito (AES-256 e TLS 1.3).</li>
                <li>Nenhum dado pessoal é compartilhado com terceiros sem consentimento explícito, exceto por obrigações legais.</li>
                <li>O rastreamento de uso é anonimizado e usado unicamente para melhorias de performance do dashboard.</li>
              </ul>

              <h3>3. Retenção e Exclusão</h3>
              <p>
                Os logs de auditoria e atividades da sua conta são retidos por 12 meses por padrão de compliance empresarial.
                Caso deseje exercer o seu direito ao esquecimento, ou solicitar a exportação de todos os seus dados em formato legível por máquina (JSON/CSV), 
                por favor, acione o departamento de TI (Data Protection Officer) da sua empresa.
              </p>
            </div>
            
            <div style={{ marginTop: '32px', padding: '16px', background: 'rgba(52, 211, 153, 0.1)', border: '1px solid rgba(52, 211, 153, 0.2)', borderRadius: 'var(--radius-md)', display: 'flex', gap: '12px', alignItems: 'center' }}>
              <Check size={20} color="var(--color-success)" />
              <span style={{ fontSize: '14px', color: 'var(--color-text-primary)' }}>Seu perfil está totalmente protegido pelos nossos termos atualizados em Agosto de 2026.</span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <main className="animate-in">
      <header className="dashboard-greeting" style={{ marginBottom: '24px' }}>
        <h1>Configurações do Sistema</h1>
        <p>Ajuste as preferências da sua conta e do painel.</p>
      </header>
      
      <div className="settings-container">
        <aside className="settings-sidebar">
          <button 
            className={`settings-tab ${activeTab === 'perfil' ? 'active' : ''}`}
            onClick={() => setActiveTab('perfil')}
          >
            <User className="settings-tab-icon" />
            Perfil / Meus Dados
          </button>
          <button 
            className={`settings-tab ${activeTab === 'seguranca' ? 'active' : ''}`}
            onClick={() => setActiveTab('seguranca')}
          >
            <Shield className="settings-tab-icon" />
            Segurança
          </button>
          <button 
            className={`settings-tab ${activeTab === 'notificacoes' ? 'active' : ''}`}
            onClick={() => setActiveTab('notificacoes')}
          >
            <Bell className="settings-tab-icon" />
            Notificações
          </button>
          <button 
            className={`settings-tab ${activeTab === 'aparencia' ? 'active' : ''}`}
            onClick={() => setActiveTab('aparencia')}
          >
            <Palette className="settings-tab-icon" />
            Aparência
          </button>
          <button 
            className={`settings-tab ${activeTab === 'privacidade' ? 'active' : ''}`}
            onClick={() => setActiveTab('privacidade')}
          >
            <ShieldCheck className="settings-tab-icon" />
            Privacidade
          </button>
        </aside>

        <section className="settings-content-card">
          {renderTabContent()}
        </section>
      </div>
    </main>
  );
});
