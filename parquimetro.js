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