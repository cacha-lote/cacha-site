# Site da CACHA

Site de uma página com a tabela de preços, as promoções e o botão do WhatsApp
de um negócio de impressões e serviços simples de gráfica.

Feito só com **HTML, CSS e JavaScript puros**: não precisa instalar nada nem
"compilar". É abrir o `index.html` no navegador e pronto.

---

## O que cada arquivo faz

```
cacha-site/
├── index.html        → a estrutura da página (textos, seções, botões)
├── css/
│   └── estilos.css   → a aparência (cores, tamanhos, layout de celular e PC)
├── js/
│   ├── config.js     → nome da marca, WhatsApp, mensagem pronta, regra de desconto
│   ├── precos.js     → TODOS os preços e serviços
│   └── app.js        → o "motor": monta a tabela e a calculadora
├── img/
│   ├── logo.png      → logo da marca (topo do site)
│   ├── favicon.png   → ícone da aba do navegador
│   ├── apple-touch-icon.png → ícone do atalho no celular
│   └── og-imagem.png → imagem da prévia quando o link é compartilhado
├── referencia/       → PDF e imagens da tabela impressa (NÃO vai para o GitHub)
├── CLAUDE.md         → memória do projeto, lida pelo Claude Code
└── README.md         → este arquivo
```

Uma comparação que ajuda: o **HTML** é o esqueleto, o **CSS** é a roupa e o
**JavaScript** é o que se mexe.

---

## Como mudar um PREÇO

1. Abra `js/precos.js`.
2. Ache o item e troque o número depois de `preco:`.
3. Use **ponto** nos centavos: `1.25`, e não `1,25`. O site mostra "R$ 1,25" sozinho.
4. Para "a combinar", escreva `preco: null`.

Exemplo, mudando o preto e branco de R$ 1,00 para R$ 1,20:

```js
{ nome: "Preto e branco", detalhe: "texto ou imagem", preco: 1.20, calculadora: true },
```

### Adicionar um serviço novo

Copie uma linha parecida, cole dentro da lista `itens` da categoria certa e edite:

```js
{ nome: "Encadernação espiral", detalhe: "até 50 folhas", preco: 8.00 },
```

Não esqueça a **vírgula** no final da linha. Se a tabela sumir do site, quase
sempre é uma vírgula, aspa ou chave faltando. Aperte F12 no navegador e veja a
aba Console: o erro mostra a linha do problema.

`calculadora: true` faz o item aparecer também na calculadora rápida.

---

## Como mudar o NOME da marca

1. Em `js/config.js`, troque `nomeMarca: "CACHA"`.
2. No `index.html`, troque "CACHA" nas linhas do começo (`<title>` e as
   `<meta property="og:...">`). Use Ctrl+H no VS Code para trocar todas de uma vez.

Por que dois lugares? O WhatsApp e o Google leem o HTML **sem rodar o
JavaScript**. Então o que aparece na prévia do link tem que estar escrito
direto no HTML.

## Como trocar a LOGO

Substitua o arquivo `img/logo.png` por outro com o **mesmo nome** (de preferência
quadrado, com fundo transparente). Para o ícone da aba e a prévia do WhatsApp,
peça ao Claude Code: "gere de novo o favicon, o apple-touch-icon e a og-imagem
a partir da logo nova".

## Como mudar o TELEFONE

Em `js/config.js`:

- `whatsappNumero`: só dígitos, com 55 e DDD. Ex.: `"5562998356264"`.
- `whatsappExibicao`: do jeito que as pessoas leem. Ex.: `"(62) 99835-6264"`.
- `mensagemPadrao`: o texto que já vem escrito na conversa.

Os links no `index.html` já têm o número atual como reserva (caso o JavaScript
não carregue). Se mudar o número, troque também no `index.html` com Ctrl+H.

## Como mudar as CORES

Abra `css/estilos.css`. Logo no topo, dentro de `:root { ... }`, estão as
**variáveis CSS**, como `--cor-azul: #2f5bd9;`. Troque o código da cor e o site
inteiro muda. Para escolher cores, pesquise "color picker" no Google.

Cuidado com o contraste: texto claro em fundo claro fica difícil de ler. Teste
em [webaim.org/resources/contrastchecker](https://webaim.org/resources/contrastchecker/).

## Como mudar PROMOÇÕES e textos

- Os textos das promoções, "Como pedir", "O que imprimimos" e "Bom saber" ficam
  direto no `index.html`.
- A regra do desconto que a calculadora usa (10% acima de 20 páginas impressas) fica em
  `js/config.js`. Se mudar a promoção, mude nos dois lugares.

---

## Ver o site no computador

- Jeito simples: dois cliques no `index.html`.
- Jeito prático: extensão **Live Preview** (Microsoft) no VS Code. Clique
  direito no `index.html` → Show Preview. Atualiza sozinho.
- Ver como no celular: no navegador, F12 e depois Ctrl+Shift+M.

## Publicar (GitHub Pages)

1. Source Control (Ctrl+Shift+G) → **Publish Branch** → **public repository** → nome `cacha-site`.
2. No GitHub: repositório → **Settings** → **Pages** → Source: **Deploy from a branch**,
   branch **main**, pasta **/(root)** → **Save**.
3. Em 1 a 2 minutos o site fica em `https://cacha-lote.github.io/cacha-site/`.
4. Se um dia mudar o endereço (outro usuário ou domínio próprio), troque também as
   linhas `og:url` e `og:image` do `index.html`. Sem isso, a prévia do link no WhatsApp fica sem imagem.

Para atualizar depois: mude o arquivo, faça commit, clique em **Sync Changes**.
Em cerca de 1 minuto o site no ar muda.

> O repositório é **público**. Nunca coloque senhas ou dados de clientes nesta pasta.
