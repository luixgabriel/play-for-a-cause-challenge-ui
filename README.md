# Desafio Play for a cause, Chat em Next.js!

O desafio constava em desenvolver uma aplicação de chat com next.js, com uma autenticação de usuário simples e envio de mensagens em tempo real.

## Visão Geral

O projeto foi construído com o framework Next.js, oferecendo uma arquitetura eficiente e facilitando o desenvolvimento de aplicações web. A estilização ficou por conta do Tailwind CSS, proporcionando um design moderno e responsivo.

## Tecnologias Utilizadas

- **Tailwind CSS:** Utilizado para a estilização da aplicação, o Tailwind CSS simplifica o processo de criação de interfaces bonitas e responsivas.

- **Cookies e Local Storage:** A integração de Cookies é empregada para armazenar o token JWT de forma segura, enquanto o Local Storage é utilizado para a persistência de dados do usuário, garantindo uma experiência contínua.

- **Context API:** A Context API do React é adotada para o gerenciamento eficiente de estados globais na aplicação, permitindo o compartilhamento de informações cruciais entre diferentes componentes.

- **Socket.IO:** A versão cliente do Socket.IO é incorporada para possibilitar ações em tempo real, melhorando a interatividade e responsividade do chat.

## Funcionalidades

- **Autenticação via Cookies:** Os usuários podem efetuar login de forma segura, com seus dados sendo mantidos através de cookies para uma experiência contínua.

- **Usuários onlines:** Os usuários podem ver quem está online na aplicação a qualquer momento, e iniciar um chat com a pessoa desejada.

- **Criação de chats e envio de mensagens em tempo real:** Utilizando o socket.io a aplicação te permite criar chats e enviar mensagens a qualquer usário online e ter a resposta imediata com os usos do webSocket.

## Pré-requisitos

Antes de começar, certifique-se de ter o Node.js e o npm instalados em sua máquina.

## Instalação

1. Clone este repositório: `git clone [https://github.com/seu-usuario/nome-do-projeto.git](https://github.com/luixgabriel/play-for-a-cause-challenge-ui.git)`
2. Navegue até o diretório do projeto: `cd play-for-a-cause-ui`
3. Instale as dependências: `npm install`

## Executando a Aplicação

1. Inicie o servidor de desenvolvimento: `npm run dev`
2. Abra seu navegador e acesse [http://localhost:3000](http://localhost:3000)

Agora você deve estar pronto para explorar a aplicação de chat!

## Novos conhecimentos e Dificuldades

Embora eu já tenha estudado sobre WebSockets e o framework Socket.IO, nunca havia desenvolvido efetivamente uma aplicação utilizando essa tecnologia. No início, enfrentei algumas dificuldades com a abertura e o fechamento de sockets, muitos clientes acessando, mas, ao me aprofundar na documentação, consegui superar esses desafios e desenvolver uma aplicação utilizando essa tecnologia de forma eficiente. Foi uma experiência enriquecedora para o meu conhecimento e curiosidade para estudar mais sobre essa tecnologia.

