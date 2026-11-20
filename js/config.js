/*
  =====================================================================
  CONFIG.JS — CONFIGURAÇÕES DA MARCA
  =====================================================================
  Este arquivo guarda as informações que aparecem em vários lugares do
  site. Mudou aqui, muda no site inteiro.

  - nomeMarca: o nome que aparece no topo e no rodapé.
  - whatsappNumero: SÓ DÍGITOS, no formato 55 + DDD + número.
      Exemplo: (62) 99835-6264  ->  "5562998356264"
  - whatsappExibicao: o número do jeito que as pessoas leem.
  - mensagemPadrao: o texto que já vem escrito quando o cliente
      clica num botão do WhatsApp.
  - desconto: regra da promoção usada pela calculadora.

  ATENÇÃO: o nome também aparece no <title> e nas tags de
  compartilhamento lá no começo do index.html. Essas partes precisam
  ser trocadas lá também, porque o WhatsApp e o Google leem o HTML
  sem rodar o JavaScript. (O README explica isso.)
  =====================================================================
*/

// "const" cria uma constante: um nome que guarda um valor.
// As chaves { } criam um "objeto", que é um conjunto de pares nome: valor.
const CONFIG = {
  nomeMarca: "CACHA",
  slogan: "Impressões, fotos, plastificação e serviços",

  whatsappNumero: "5562998356264",
  whatsappExibicao: "(62) 99835-6264",
  mensagemPadrao: "Olá! Vim pelo site e quero fazer um pedido.",

  // Promoção: 10% de desconto acima de 20 páginas impressas no mesmo pedido.
  // (cada lado impresso conta: 1 folha frente e verso = 2 páginas)
  descontoPercentual: 10,
  descontoAcimaDePaginas: 20,
};
