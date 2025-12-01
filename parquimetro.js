class parquimetro {
  constructor() {
    this.tabela = [
      { valor: 1.0, tempo: 30 },
      { valor: 1.75, tempo: 60 },
      { valor: 3.0, tempo: 120 },
    ];
  }
  
  calcular(valorInserido) {
    if (valorInserido < 1.0) {
      return {
        valido: false,
        mensagem: "Valor insuficiente. Insira pelo menos R$ 1,00.",
      };
    }

    const opcaco = this.tabela.reduce((prev, atual) => {
      return valorInserido >= atual.valor ? atual : prev;
    });

    const troco = valorInserido - opcaco.valor;

    return {
      valido: true,
      tempo: opcaco.tempo,
      troco: troco.toFixed(2),
    };
  }
}

class Interface {
  constructor() {
    this.parquimetro = new parquimetro();
    this.inputValor = document.getElementById("valor");
    this.resultado = document.getElementById("resultado");
    this.btn = document.getElementById("btnCalcular");

    this.btn.addEventListener("click", () => this.processar());

    this.inputValor.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        this.processar();
      }
    });

    this.inputValor.focus();
  }

  processar() {
    let valor = this.inputValor.value.replace(",", ".");
    valor = parseFloat(valor);

    if (valor < 0) {
      this.resultado.textContent = "Valor não pode ser negativo.";
      this.inputValor.value = "";
      this.inputValor.focus();
      return;
    }

    if (isNaN(valor)) {
      this.resultado.textContent = "Por favor, digite um valor válido.";
      return;
    }

    const resposta = this.parquimetro.calcular(valor);

    if (!resposta.valido) {
      this.resultado.textContent = resposta.mensagem;
    } else {
      this.resultado.innerHTML =
        `Tempo adquirido: <strong>${resposta.tempo} minutos</strong><br>` +
        `Troco: R$ <strong>${resposta.troco}</strong>`;
    }

    this.inputValor.value = "";
    this.inputValor.focus();
  }
}

new Interface();