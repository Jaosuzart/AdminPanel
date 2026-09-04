import { memo } from 'react';
import { BookOpen, HelpCircle, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';

export default memo(function Ajuda() {
  return (
    <main className="animate-in">
      <header className="dashboard-greeting">
        <h1>Central de Ajuda</h1>
        <p>Precisa de suporte? Estamos aqui para ajudar.</p>
      </header>
      
      <section className="empty-state">
        <div className="empty-state-icon-wrapper">
          <HelpCircle size={40} strokeWidth={1.5} />
        </div>
        <h2 className="empty-state-title">Como podemos ajudar?</h2>
        <p className="empty-state-description">
          Nossa equipe de suporte está disponível 24/7 para resolver qualquer problema. Consulte também a documentação oficial para guias rápidos.
        </p>
        
        <nav className="empty-state-actions">
          <a href="mailto:suporte@empresa.com" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
            <MessageCircle size={18} />
            Falar com Suporte
          </a>
          <a href="https://react.dev" target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
            <BookOpen size={18} />
            Ver Documentação
          </a>
        </nav>
      </section>
    </main>
  );
});
