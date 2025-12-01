class parquimetro {
    constructor() {
        this.tabela = [
            {valor: 1.00, tempo: 30},
            {valor: 1.75, tempo: 60},
            {valor: 3.00, tempo: 120}
        ];
    }
    calcular(valorInserido) {
        if (valorInserido < 1.00) {
            return {
                valido: false,
                mensagem: "Valor insuficiente. Insira pelo menos R$ 1,00."
            };
        }

        const opcaco = this.tabela.reduce((prev, atual) => {
            return valorInserido >= atual.valor ? atual : prev;
        });

        const troco = valorInserido - opcaco.valor;

        return {
            valido: true,
            tempo: opcaco.tempo,
            troco: troco.toFixed(2)
        };
    }
}

class Interface {
    constructor() {
        this.parquimetro = new parquimetro();
        this.inputValor = document.getElementById('valor');
        this.resultado = document.getElementById('resultado');
        this.btn = document.getElementById('btncalcular');

        this.btn.addEventListener('click', () => this.processar());
    }

    processar() {
        const valor = parseFloat(this.inputValor.value);

        if (isNaN(valor)) {
            this.resultado.textContent = "Por favor, digite um valor válido.";
            return;
        }

        const resposta = this.parquimetro.calcular(valor);

        if(!resposta.valido) {
            this.resultado.textContent = resposta.mensagem;
        } else {
            this.resultado.innerHTML =
            `Tempo adquirido: <strong>${resposta.tempo} minutos</strong><br>` +
            `Troco: R$ <strong>${resposta.troco}</strong>`;
        }
    }

}

new Interface();