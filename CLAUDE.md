# Site da CACHA

Site de uma página (catálogo e tabela de preços) de um negócio de impressões em casa.
Pedidos só pelo WhatsApp. Não é loja: sem carrinho, pagamento ou login.

## Como trabalhar neste projeto

- Sempre explique em português o que está fazendo, porque estou aprendendo.
- Comentários no código em português.
- Só HTML, CSS e JavaScript puros. Sem frameworks, sem build, sem npm.
- Mobile first: a maioria dos clientes abre pelo celular.
- Mensagens de commit em português, claras e curtas.

## Onde fica cada coisa

- Preços e serviços: `js/precos.js` (a tabela é montada a partir dele).
- Nome da marca, WhatsApp, mensagem e regra de desconto: `js/config.js`.
- Cores e fonte: variáveis no topo de `css/estilos.css`.
- Nome também aparece no `<head>` do `index.html` (title e Open Graph).
- Fonte oficial dos preços: `referencia/` (fica fora do Git).

## Publicação

GitHub Pages, a partir da branch `main`, pasta raiz. O repositório é público:
nunca coloque senhas ou dados de clientes aqui.
