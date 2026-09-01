# AdminPanel Enterprise 🚀

![Dashboard Preview](./screenshot.png)

Um Dashboard Administrativo completo, moderno e responsivo, desenvolvido com foco em performance, acessibilidade (WCAG AA) e design premium (UI/UX).

## 🌟 Principais Funcionalidades

- **Design Premium**: Interface moderna com suporte nativo a **Dark Mode** e **Light Mode**, micro-interações e transições suaves.
- **Acessibilidade (a11y)**: Estrutura HTML semântica, contraste de cores otimizado para leitores de tela e navegação por teclado (W3C/WCAG).
- **Gráficos Dinâmicos**: Integração com Chart.js para visualização de dados de Receita e Base de Clientes.
- **Autenticação Segura**: Sistema de Login com verificação em duas etapas (2FA).
- **Performance Extrema**: Otimizado para bater 95+ no Lighthouse/PageSpeed Insights (LCP, FCP e TBT baixíssimos).
- **Notificações**: Sistema de Toast Notifications (Sonner) para feedbacks visuais imediatos.

## 🛠 Tecnologias Utilizadas

### Frontend (Interface)
- **React 19** + **TypeScript**
- **Vite** (Build Tool super rápido)
- **React Router DOM** (Navegação SPA)
- **Chart.js** / `react-chartjs-2` (Gráficos)
- **Lucide React** (Ícones modernos)
- **Sonner** (Toast Notifications)
- CSS Vanilla com Variáveis Dinâmicas (Custom Properties)

### Backend (API e Dados)
- **Node.js** + **Express**
- **SQLite3** (Banco de dados leve e embutido)
- **Bcryptjs** (Criptografia de senhas)
- **Dotenv** (Gerenciamento de variáveis de ambiente)

## ⚙️ Como Executar o Projeto

1. **Clone o repositório:**
```bash
git clone https://github.com/Jaosuzart/AdminPanel.git
cd AdminPanel
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Inicie os servidores (Frontend + Backend) com um único comando:**
```bash
npm run dev
```

O Frontend estará disponível em `http://localhost:5173` e o Backend rodando na porta `3333`.

## 📈 Scripts Disponíveis
- `npm run dev` - Roda o servidor Node e o Vite ao mesmo tempo (via Concurrently).
- `npm run build` - Gera a build otimizada de produção.
- `npm run preview` - Visualiza a build de produção localmente.

---
*Desenvolvido com excelência.* 💻
