import { memo } from 'react';
import { Book as BookOpen, QuestionCircle as HelpCircle, Chat as MessageCircle } from 'react-bootstrap-icons';
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
          <button 
            className="btn-primary inline-flex items-center gap-2 no-underline"
            onClick={() => toast.info('Iniciando atendimento com o suporte...')}
          >
            <MessageCircle size={18} />
            Falar com Suporte
          </button>
          <button 
            className="btn-secondary inline-flex items-center gap-2 no-underline"
            onClick={() => toast.info('Redirecionando para a documentação oficial...')}
          >
            <BookOpen size={18} />
            Ver Documentação
          </button>
        </nav>
      </section>
    </main>
  );
});
