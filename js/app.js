/*
  =====================================================================
  APP.JS — O "MOTOR" DA PÁGINA
  =====================================================================
  Este arquivo lê o config.js e o precos.js e monta as partes
  dinâmicas do site:
    1. Coloca o nome da marca e os links do WhatsApp.
    2. Monta a tabela de preços a partir da lista PRECOS.
    3. Faz a calculadora rápida funcionar.

  Você normalmente NÃO precisa mexer aqui para mudar preços ou nome.
  Esses ficam no precos.js e no config.js.
  =====================================================================
*/

// ---------------------------------------------------------------------
// FUNÇÕES AJUDANTES
// Uma "função" é um bloco de código com nome, que pode ser usado várias
// vezes. Ela recebe valores (parâmetros) e pode devolver um resultado.
// ---------------------------------------------------------------------

// Transforma um número (ex.: 1.5) em dinheiro brasileiro (ex.: "1,50").
// Intl.NumberFormat é uma ferramenta do próprio navegador para formatar
// números de acordo com o país ("pt-BR" = português do Brasil).
const formatadorNumero = new Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function formatarValor(valor) {
  return formatadorNumero.format(valor); // 1.5 -> "1,50"
}

function formatarReais(valor) {
  return "R$ " + formatarValor(valor); // 1.5 -> "R$ 1,50"
}

// Monta o link do WhatsApp com uma mensagem pronta.
// encodeURIComponent troca espaços e acentos por códigos que podem ir
// dentro de um endereço da internet (ex.: espaço vira %20).
function linkWhatsApp(mensagem) {
  return "https://wa.me/" + CONFIG.whatsappNumero + "?text=" + encodeURIComponent(mensagem);
}

// Cria um elemento HTML (ex.: <p class="x">texto</p>) pelo JavaScript.
// Usamos textContent em vez de innerHTML: assim o texto é sempre tratado
// como texto, nunca como código. É um hábito mais seguro.
function criar(tag, classe, texto) {
  const elemento = document.createElement(tag);
  if (classe) elemento.className = classe;
  if (texto) elemento.textContent = texto;
  return elemento;
}

// Cria o preço no formato "R$ 1,00", com o "R$" pequeno (igual à tabela
// impressa). Se o preço for null, escreve "a combinar".
function criarPreco(valor, classe) {
  const span = criar("span", classe);
  if (valor === null) {
    span.classList.add("preco--combinar");
    span.textContent = "a combinar";
  } else {
    span.append(criar("small", "preco__moeda", "R$"), formatarValor(valor));
  }
  return span;
}

// ---------------------------------------------------------------------
// 1. NOME DA MARCA E LINKS DO WHATSAPP
// No HTML, marcamos elementos com atributos "data-..." para o JavaScript
// achá-los. querySelectorAll pega TODOS os elementos com aquela marca.
// ---------------------------------------------------------------------
function preencherMarca() {
  document.querySelectorAll("[data-marca]").forEach((el) => {
    el.textContent = CONFIG.nomeMarca;
  });

  document.querySelectorAll("[data-whatsapp-numero]").forEach((el) => {
    el.textContent = CONFIG.whatsappExibicao;
  });

  // Todo link com data-whatsapp recebe o endereço com a mensagem padrão.
  document.querySelectorAll("a[data-whatsapp]").forEach((link) => {
    link.href = linkWhatsApp(CONFIG.mensagemPadrao);
  });

  // Ano atual no rodapé, para não precisar trocar todo ano.
  document.querySelectorAll("[data-ano]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
}

// ---------------------------------------------------------------------
// 2. TABELA DE PREÇOS
// Para cada categoria da lista PRECOS, criamos uma seção com título e
// itens. Os itens viram "cartões" (caixas grandes) ou "lista" (linhas).
// ---------------------------------------------------------------------
function montarTabela() {
  const destino = document.getElementById("tabela-precos");
  if (!destino) return;

  PRECOS.forEach((categoria) => {
    const bloco = criar("section", "categoria categoria--" + categoria.formato);
    bloco.id = "precos-" + categoria.id;

    // Título com a barrinha colorida
    const cabecalho = criar("div", "categoria__cabecalho");
    const titulo = criar("h3", "titulo-secao titulo-secao--pequeno", categoria.titulo);
    titulo.dataset.cor = categoria.cor; // vira data-cor="azul" no HTML
    cabecalho.append(titulo);
    if (categoria.nota) cabecalho.append(criar("p", "categoria__nota", categoria.nota));
    bloco.append(cabecalho);

    // Lista de itens (<ul> = lista sem números; <li> = item da lista)
    const lista = criar("ul", "itens");
    categoria.itens.forEach((item) => {
      const li = criar("li", "item");
      const textos = criar("div", "item__textos");
      textos.append(criar("span", "item__nome", item.nome));
      if (item.detalhe) textos.append(criar("span", "item__detalhe", item.detalhe));
      li.append(textos);
      // Na lista, os pontinhos entre o nome e o preço
      if (categoria.formato === "lista") li.append(criar("span", "item__pontos"));
      li.append(criarPreco(item.preco, "item__preco"));
      lista.append(li);
    });
    bloco.append(lista);

    if (categoria.aviso) {
      const aviso = criar("p", "aviso");
      aviso.append(criar("strong", "aviso__etiqueta", "Frente e verso"), " ");
      aviso.append(categoria.aviso);
      bloco.append(aviso);
    }

    destino.append(bloco);
  });
}

// ---------------------------------------------------------------------
// 3. CALCULADORA RÁPIDA
// O cliente escolhe o tipo, a quantidade de folhas e se é frente e verso.
// Conta: impressões = folhas (x2 se frente e verso) x preço por lado.
// Se passar de 20 folhas, aplica 10% de desconto (valores do config.js).
// ---------------------------------------------------------------------
function montarCalculadora() {
  const form = document.getElementById("calculadora");
  if (!form) return;

  const campoTipo = form.querySelector("#calc-tipo");
  const campoFolhas = form.querySelector("#calc-folhas");
  const campoFrenteVerso = form.querySelector("#calc-frente-verso");
  const saidaTotal = form.querySelector("#calc-total");
  const saidaDetalhe = form.querySelector("#calc-detalhe");
  const botaoPedir = form.querySelector("#calc-pedir");

  // Junta todos os itens marcados com calculadora: true
  const opcoes = [];
  PRECOS.forEach((categoria) => {
    categoria.itens.forEach((item) => {
      if (item.calculadora && item.preco !== null) opcoes.push(item);
    });
  });

  // Cria as opções do menu de escolha (<select>)
  opcoes.forEach((item, indice) => {
    const texto = item.nome + (item.detalhe ? " (" + item.detalhe + ")" : "") + " — " + formatarReais(item.preco);
    const opcao = criar("option", "", texto);
    opcao.value = indice;
    campoTipo.append(opcao);
  });

  function calcular() {
    const item = opcoes[Number(campoTipo.value)];
    // Math.floor tira as casas decimais; Math.max garante no mínimo 0.
    const folhas = Math.max(0, Math.floor(Number(campoFolhas.value) || 0));
    const frenteVerso = campoFrenteVerso.checked;
    const impressoes = frenteVerso ? folhas * 2 : folhas;

    const subtotal = impressoes * item.preco;
    const temDesconto = folhas > CONFIG.descontoAcimaDeFolhas;
    const desconto = temDesconto ? subtotal * (CONFIG.descontoPercentual / 100) : 0;
    // Arredonda para centavos (evita coisas como 22,499999)
    const total = Math.round((subtotal - desconto) * 100) / 100;

    saidaTotal.textContent = formatarReais(total);

    let detalhe = impressoes + (impressoes === 1 ? " impressão" : " impressões") + " × " + formatarReais(item.preco);
    if (temDesconto) {
      detalhe += " = " + formatarReais(subtotal) + ", com " + CONFIG.descontoPercentual + "% de desconto";
    } else if (folhas > 0) {
      const faltam = CONFIG.descontoAcimaDeFolhas + 1 - folhas;
      detalhe += ". Com mais " + faltam + (faltam === 1 ? " folha" : " folhas") + " você ganha " + CONFIG.descontoPercentual + "% de desconto.";
    }
    saidaDetalhe.textContent = detalhe;

    // Mensagem que vai pronta para o WhatsApp
    const tipo = item.nome + (item.detalhe ? " (" + item.detalhe + ")" : "");
    const mensagem =
      "Olá! Vim pelo site e quero fazer um pedido:\n" +
      "- " + folhas + (folhas === 1 ? " folha" : " folhas") + " " + tipo + ", " + (frenteVerso ? "frente e verso" : "só frente") + "\n" +
      "- Valor estimado: " + formatarReais(total) + (temDesconto ? " (com " + CONFIG.descontoPercentual + "% de desconto)" : "");
    botaoPedir.href = linkWhatsApp(mensagem);
  }

  // "input" e "change" são eventos: avisos que o navegador dá quando o
  // cliente digita ou muda algo. A cada aviso, recalculamos.
  form.addEventListener("input", calcular);
  form.addEventListener("change", calcular);
  // Impede que apertar Enter recarregue a página
  form.addEventListener("submit", (evento) => evento.preventDefault());

  calcular(); // calcula uma vez ao abrir a página
}

// ---------------------------------------------------------------------
// INÍCIO: roda tudo quando a página termina de carregar o HTML.
// ---------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  preencherMarca();
  montarTabela();
  montarCalculadora();
});
