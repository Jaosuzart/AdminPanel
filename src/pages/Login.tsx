import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ShieldCheck, Mail, Lock, Key } from 'lucide-react';
import logo from '../assets/admin_panel_logo.jpg';
import { apiLogin, apiVerify2FA } from '../services/api';
import '../styles.css';

export default function Login() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('admin@admin.com');
  const [password, setPassword] = useState('SenhaSegura123!');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [tempToken, setTempToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const data = await apiLogin(email, password);
      setTempToken(data.tempToken);
      setStep(2);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handle2FASubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await apiVerify2FA(code, tempToken);
      
      login();
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="login-page">
      <div className="login-container">
        <div className="login-header">
          <img src={logo} alt="AdminPanel" className="login-logo" fetchPriority="high" />
          <h1>AdminPanel Enterprise</h1>
          <p>{step === 1 ? 'Faça login para continuar' : 'Verificação em Duas Etapas'}</p>
        </div>

        {error && <div className="login-error-msg">{error}</div>}

        {step === 1 ? (
          <form onSubmit={handleLoginSubmit} className="login-form">
            <div className="login-form-group">
              <label htmlFor="email">Email</label>
              <div className="login-input-with-icon">
                <Mail size={18} className="login-input-icon" />
                <input 
                  id="email"
                  type="email" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  placeholder="admin@admin.com" 
                  required 
                />
              </div>
            </div>
            <div className="login-form-group">
              <label htmlFor="password">Senha</label>
              <div className="login-input-with-icon">
                <Lock size={18} className="login-input-icon" />
                <input 
                  id="password"
                  type="password" 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                  placeholder="SenhaSegura123!" 
                  required 
                />
              </div>
            </div>
            <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '24px' }} disabled={isLoading}>
              {isLoading ? 'Autenticando...' : 'Entrar'}
            </button>
          </form>
        ) : (
          <form onSubmit={handle2FASubmit} className="login-form">
            <div className="login-form-group">
              <label htmlFor="code">Código de Autenticação (2FA)</label>
              <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '12px' }}>
                Digite o código de 6 dígitos gerado no seu app de autenticação.
              </p>
              <div className="login-input-with-icon">
                <Key size={18} className="login-input-icon" />
                <input 
                  id="code"
                  type="text" 
                  maxLength={6}
                  value={code} 
                  onChange={e => setCode(e.target.value.replace(/\D/g, ''))} 
                  placeholder="000000" 
                  required 
                  style={{ textAlign: 'center', letterSpacing: '4px', fontWeight: 'bold' }}
                />
              </div>
            </div>
            <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '24px' }} disabled={isLoading}>
              <ShieldCheck size={18} /> {isLoading ? 'Validando...' : 'Validar Código'}
            </button>
            <button type="button" className="btn-secondary" style={{ width: '100%', marginTop: '12px' }} onClick={() => setStep(1)} disabled={isLoading}>
              Voltar
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
