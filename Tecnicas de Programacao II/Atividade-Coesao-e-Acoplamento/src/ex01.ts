class ContaBancaria {
    private saldo: number = 0;

    depositar(valor: number): void {
        this.saldo += valor;
        console.log(`Depósito de R$ ${valor.toFixed(2)} realizado.`);
    }

    sacar(valor: number): void {
        if (this.saldo - valor < 0) {
            console.log("Saldo insuficiente!");
            return;
        }
        this.saldo -= valor;
        console.log(`Saque de R$ ${valor.toFixed(2)} realizado.`);
    }
}

class Cliente {
    constructor(
        public nome: string,
        public cpf: string,
        public nasc: string,
        public nomemae: string,
        public conta: ContaBancaria
    ) {}
}

const conta = new ContaBancaria();

const cliente = new Cliente(
    "Seu Nome",
    "000.000.000-00",
    "01/01/2000",
    "Maria",
    conta
);

cliente.conta.depositar(100);
cliente.conta.sacar(50);
cliente.conta.sacar(60);
