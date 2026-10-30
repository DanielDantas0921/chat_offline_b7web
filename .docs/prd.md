# PRD — Chat offline

## Visão geral

Implementar uma interface de chat de página única na qual a pessoa usuária pode adicionar mensagens em nome próprio ou do robô. O projeto é local e não se conecta a serviços externos: as mensagens existem apenas no estado da aplicação e desaparecem ao recarregar a página.

O projeto já utiliza Vite, React, TypeScript e Tailwind CSS. A configuração existente deve ser aproveitada, sem refazer o setup.

## Objetivo

Entregar uma experiência simples e responsiva para compor mensagens, alternar entre os dois remetentes e visualizar o histórico com distinção clara entre as mensagens de usuário e robô.

## Usuários e histórias

- Como pessoa usuária, quero escrever e enviar uma mensagem em meu nome para vê-la no lado direito do histórico.
- Como pessoa usuária, quero alternar para o modo robô e enviar uma mensagem em nome dele para vê-la no lado esquerdo do histórico.
- Como pessoa usuária, quero que o modo de remetente selecionado continue ativo após o envio, para poder enviar mensagens consecutivas pelo mesmo remetente.
- Como pessoa usuária, quero enviar com Enter e inserir uma quebra de linha com Shift+Enter.
- Como pessoa usuária, quero ver o campo de composição crescer conforme o texto, sem deixar de ter acesso ao botão de envio.

## Requisitos funcionais

1. A tela contém um histórico de mensagens e um campo de composição fixado na parte inferior da janela.
2. O histórico é armazenado somente em estado React, sem persistência em armazenamento local, banco de dados ou servidor.
3. Cada mensagem identifica seu remetente (`user` ou `robot`) e seu conteúdo.
4. Mensagens do usuário ficam alinhadas à direita; mensagens do robô, à esquerda.
5. O controle de remetente alterna entre usuário e robô. No modo robô, o card de composição recebe uma borda roxa como indicação visual.
6. O remetente ativo não é redefinido após o envio.
7. O botão de envio fica desabilitado quando o campo está vazio ou contém apenas espaços em branco.
8. Enviar adiciona a mensagem ao histórico, limpa o campo de composição e mantém o remetente ativo.
9. Enter envia a mensagem; Shift+Enter insere uma quebra de linha. O comportamento do botão de envio é equivalente ao de Enter.
10. Ao adicionar uma mensagem, o histórico acompanha a mensagem mais recente.

## Requisitos visuais e de interação

- Usar fundo marrom claro.
- Em telas maiores, centralizar o conteúdo e limitar a largura do histórico e do campo de composição a `max-width: 2xl`.
- Manter o campo de composição no canto inferior da janela, com o histórico ocupando o espaço disponível e podendo rolar sem ficar encoberto pelo campo.
- Usar um card branco para a composição. Sua altura deve se ajustar ao conteúdo digitado.
- Posicionar o controle de remetente à esquerda do card e o botão de envio à direita.
- Tornar visualmente distinguíveis os balões dos dois remetentes, preservando o alinhamento definido nos requisitos funcionais.
- Em telas estreitas, manter o campo utilizável, os controles acessíveis e o conteúdo dentro da largura da viewport.
- O controle de remetente e o botão devem ser operáveis por teclado e possuir nomes acessíveis. O estado desabilitado do botão deve ser perceptível e semânticamente correto.

## Fora de escopo

- Integração com IA, backend, APIs ou envio real de mensagens.
- Persistência do histórico entre recargas ou sessões.
- Autenticação, múltiplas conversas, anexos, edição ou exclusão de mensagens.
- Indicadores de digitação, horários, status de entrega ou notificações.

## Critérios de aceite

- [ ] A aplicação inicia com o histórico vazio e sem mensagens recuperadas de sessões anteriores.
- [ ] É possível enviar uma mensagem como usuário; ela aparece à direita e o campo é limpo.
- [ ] É possível ativar o modo robô; a borda do card fica roxa e as novas mensagens aparecem à esquerda.
- [ ] Depois de enviar uma mensagem como robô, o modo robô continua ativo.
- [ ] O botão permanece desabilitado para conteúdo vazio ou composto apenas por espaços.
- [ ] Enter envia e Shift+Enter adiciona uma quebra de linha.
- [ ] Mensagens longas e várias mensagens podem ser consultadas sem que o campo fixo cubra o histórico.
- [ ] A interface permanece utilizável em telas estreitas e em telas maiores, respeitando a largura máxima `2xl`.
- [ ] A implementação passa pelos comandos existentes de lint e build.

## Plano de implementação

As tarefas abaixo estão em ordem progressiva; cada etapa deve ser concluída antes da seguinte.

- [x] **1. Definir os tipos de mensagem**
  - [x] Criar em `src/types` o tipo da mensagem usando `type`, com identificador, conteúdo e remetente (`user` ou `robot`).
  - [x] Não introduzir tipos para comportamentos que não fazem parte do escopo atual.

- [x] **2. Montar a estrutura principal da tela**
  - [x] Implementar o layout da página em `src/App.tsx`.
  - [x] Criar a área de histórico e o espaço de composição inferior em uma estrutura que ocupe a altura da janela.
  - [x] Aplicar o fundo marrom claro e o container centralizado com largura máxima `2xl`.

- [ ] **3. Criar os componentes do histórico**
  - [ ] Implementar em `src/components` a lista de mensagens e o componente visual de uma mensagem.
  - [ ] Renderizar o remetente correto, alinhar usuário à direita e robô à esquerda.
  - [ ] Garantir rolagem do histórico e acompanhamento automático da mensagem mais recente.

- [ ] **4. Criar o campo de composição**
  - [ ] Implementar em `src/components` o card branco com área de texto expansível, controle de remetente e botão de envio.
  - [ ] Posicionar o controle à esquerda e o envio à direita.
  - [ ] Refletir o modo robô com a borda roxa e implementar o estado desabilitado do botão.

- [ ] **5. Conectar o estado e os fluxos de envio**
  - [ ] Manter o histórico e o remetente ativo em estado React, sem persistência.
  - [ ] Implementar alternância de remetente, inclusão de mensagens, limpeza do campo e manutenção do remetente escolhido depois do envio.
  - [ ] Impedir envios vazios ou compostos apenas por espaços.
  - [ ] Implementar Enter para enviar e Shift+Enter para inserir quebra de linha.

- [ ] **6. Ajustar responsividade e acessibilidade**
  - [ ] Validar o layout em viewport estreita e larga, incluindo mensagens extensas e histórico comprido.
  - [ ] Conferir foco por teclado, nomes acessíveis dos controles e sinalização do estado desabilitado.
  - [ ] Ajustar espaçamentos para que a composição fixa não cubra o histórico.

- [ ] **7. Validar os critérios de aceite**
  - [ ] Executar `npm run lint` e `npm run build`.
  - [ ] Verificar manualmente os dois remetentes, o comportamento do teclado, o estado vazio, a rolagem e a responsividade.
