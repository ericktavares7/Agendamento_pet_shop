🐾 Mundo Pet — Agendamento de Pet Shop
<p align="center">
  <img src="./src/assets/icons/Dog-Duotone--Streamline-Phosphor.svg" width="80" alt="Mundo Pet Logo"/>
</p>
<p align="center">
  <strong>Aplicação web responsiva para gerenciamento de agendamentos em pet shops.</strong><br/>
  Desenvolvida com foco em usabilidade, design system consistente e boas práticas de desenvolvimento front-end.
</p>
<p align="center">
  <a href="https://ericktavares7.github.io/Agendamento_pet_shop/">🔗 Ver demonstração ao vivo</a>
</p>
<p align="center">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"/>
  <img src="https://img.shields.io/badge/Webpack-8DD6F9?style=for-the-badge&logo=webpack&logoColor=black"/>
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white"/>
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white"/>
</p>

📋 Sobre o Projeto
O Mundo Pet é uma aplicação de agendamento desenvolvida para pet shops, permitindo que tutores visualizem, cadastrem e removam atendimentos de forma simples e intuitiva.
O projeto nasceu como desafio técnico e foi desenvolvido com atenção a detalhes que fazem a diferença no mundo real: design system, acessibilidade, responsividade mobile-first e persistência de dados.

✨ Funcionalidades

📅 Visualização por data — troca a data e a agenda atualiza automaticamente
🕐 Agendamentos organizados por período — Manhã, Tarde e Noite
➕ Cadastro de novos agendamentos via modal com validação completa
🗑️ Remoção de agendamentos com atualização imediata
⚠️ Prevenção de conflitos — impede dois agendamentos no mesmo horário
💾 Persistência de dados com localStorage — os dados não somem ao recarregar
📱 100% responsivo — funciona bem no celular e no desktop


🎨 Design System
O projeto segue um design system próprio com:

Tipografia: Inter Tight (títulos) + Inter (corpo)
Tema: Dark mode com paleta de cores consistente
Componentes: Botões, inputs, cards e modais padronizados
Acessibilidade: Labels semânticos, aria-labels e navegação por teclado (ESC fecha o modal)


🛠️ Tecnologias Utilizadas
TecnologiaUsoHTML5 semânticoEstrutura e acessibilidadeCSS3 + VariablesDesign system e responsividade mobile-firstJavaScript ES6+Lógica, DOM, eventos e localStorageWebpack 5Bundler, build e dev server com hot reloadBabelTranspilação para compatibilidade entre browsersDay.jsManipulação e formatação de dataslocalStoragePersistência de dados no browser

🚀 Como Rodar o Projeto
Pré-requisitos

Node.js versão 16 ou superior
Git

Instalação
bash# Clone o repositório
git clone https://ericktavares7.github.io/Agendamento_pet_shop/

# Entre na pasta
cd nome-do-repo

# Instale as dependências
npm install

# Rode o servidor de desenvolvimento
npm run dev
O browser abrirá automaticamente em http://localhost:3000 🎉
Build para produção
bashnpm run build
Os arquivos otimizados serão gerados na pasta docs/.

📁 Estrutura do Projeto
src/
├── assets/
│   └── icons/          # Ícones SVG
├── js/
│   └── index.js        # Lógica principal da aplicação
├── styles/
│   ├── main.css        # Estilos globais e variáveis
│   ├── schedule.css    # Estilos da agenda
│   └── form.css        # Estilos do modal e formulário
└── index.html          # HTML principal

💡 Decisões Técnicas
Por que Webpack?
Escolhido para simular o ambiente de trabalho real — bundling, hot reload e otimização de assets são ferramentas usadas no mercado.
Por que localStorage?
Permite persistência de dados sem necessidade de backend, mantendo o projeto simples e funcional para demonstração.
Por que mobile-first?
A maioria dos usuários de pet shop acessa pelo celular. Partir do mobile garante uma base sólida antes de expandir para desktop.
Por que delegação de eventos?
Os cards de agendamento são criados dinamicamente pelo JavaScript. A delegação de eventos garante que o botão "Remover" funcione em cards novos sem precisar registrar novos listeners.

📚 Aprendizados
Este projeto foi desenvolvido do zero como parte da minha transição de carreira para o desenvolvimento de software. Durante o processo, pratiquei:

Configuração de ambiente profissional com Webpack e Babel
Arquitetura de CSS com design system e variáveis
Manipulação avançada do DOM com JavaScript puro
Padrões como BEM, delegação de eventos e mobile-first
Fluxo completo de CRUD com persistência no browser
Deploy via GitHub Pages


👨‍💻 Autor
Erick Tavares
Supervisor com 4 anos de experiência em liderança e operações no varejo, em transição de carreira para o desenvolvimento de software. Combinando visão de negócio com habilidades técnicas em construção.
<p>
  <a href="https://linkedin.com/in/erick-tavares-5a0063224">
    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white"/>
  </a>
  <a href="https://github.com/ericktavares7">
    <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white"/>
  </a>
</p>

<p align="center">
  Feito com 💜 e muito café
</p>
