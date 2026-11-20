/*
  =====================================================================
  PRECOS.JS — TODOS OS PREÇOS E SERVIÇOS DO SITE
  =====================================================================
  A página monta a tabela de preços sozinha a partir desta lista.
  Para mudar um preço, troque só o número depois de "preco:".

  REGRAS PARA EDITAR (leia antes!):
  - Use PONTO como separador decimal: 1.25 (e não 1,25).
    O site mostra "R$ 1,25" automaticamente.
  - "preco: null" significa "a combinar".
  - Cada item fica entre { } e termina com vírgula.
  - "detalhe" é o texto pequeno embaixo do nome. Pode ficar "".
  - "calculadora: true" faz o item aparecer na calculadora rápida.

  Exemplo de item novo (copie, cole dentro de "itens" e edite):
    { nome: "Encadernação espiral", detalhe: "até 50 folhas", preco: 8.00 },

  Cada CATEGORIA tem:
  - id: um nome curto, sem espaço nem acento (usado internamente).
  - titulo: o nome que aparece no site.
  - nota: um aviso pequeno ao lado do título (pode ficar "").
  - cor: a cor da barrinha do título (azul, verde, rosa, laranja,
    roxo, amarelo). As cores ficam definidas no css/estilos.css.
  - formato: "cartoes" (caixas grandes) ou "lista" (linhas com
    pontinhos até o preço).
  - aviso (opcional): texto que aparece embaixo, com a etiqueta
    amarela "Frente e verso".
  =====================================================================
*/

// Os colchetes [ ] criam uma "lista" (em programação: array).
// Aqui é uma lista de categorias, e cada categoria tem uma lista de itens.
const PRECOS = [
  {
    id: "impressoes",
    titulo: "Impressões A4",
    nota: "preço por lado impresso",
    cor: "azul",
    formato: "cartoes",
    aviso: "Cobramos cada lado: 1 folha frente e verso = 2 impressões.",
    itens: [
      { nome: "Preto e branco", detalhe: "texto ou imagem", preco: 1.00, calculadora: true },
      { nome: "Colorida", detalhe: "texto com cor", preco: 1.25, calculadora: true },
      { nome: "Colorida", detalhe: "página cheia", preco: 1.50, calculadora: true },
      { nome: "Papel diploma", detalhe: "180 g, mais firme", preco: 2.50, calculadora: true },
    ],
  },
  {
    id: "plastificacao",
    titulo: "Plastificação",
    nota: "",
    cor: "verde",
    formato: "lista",
    itens: [
      { nome: "Folha A4", detalhe: "", preco: 5.00 },
      { nome: "Documento", detalhe: "RG, CPF…", preco: 3.00 },
      { nome: "Impressão + plastificação A4", detalhe: "", preco: 6.00 },
      { nome: "Impressão fotográfica + plastificação", detalhe: "", preco: 7.00 },
    ],
  },
  {
    id: "fotos",
    titulo: "Fotos e adesivos",
    nota: "",
    cor: "rosa",
    formato: "lista",
    itens: [
      { nome: "Papel fotográfico A4", detalhe: "", preco: 3.00 },
      { nome: "Adesivo fotográfico A4", detalhe: "", preco: 3.50 },
    ],
  },
  {
    id: "servicos",
    titulo: "Serviços",
    nota: "",
    cor: "laranja",
    formato: "lista",
    itens: [
      { nome: "Currículo pronto + 1 via", detalhe: "em imagem e PDF", preco: 15.00 },
      { nome: "Atualizar currículo existente", detalhe: "", preco: 5.00 },
      { nome: "Digitação", detalhe: "por página", preco: 5.00 },
      { nome: "Digitalização", detalhe: "por página", preco: 1.00 },
      { nome: "Juntar arquivos em PDF", detalhe: "ou foto → PDF", preco: 5.00 },
      { nome: "Montagem", detalhe: "fotos 3×4 e 10×15, placas, pranchas, cardápios", preco: null },
    ],
  },
];
