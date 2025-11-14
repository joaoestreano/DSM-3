class Item {
    constructor(
        public nome: string,
        public preco: number,
        public quantidade: number
    ) {}
}

class Carrinho {
    private itens: Item[] = [];

    adicionarItem(item: Item): void {
        this.itens.push(item);
    }

    calcularTotal(): number {
        return this.itens.reduce(
            (total, item) => total + item.preco * item.quantidade,
            0
        );
    }
}

class Pagamento {
    processarPagamento(total: number, forma: string): void {
        console.log(`Pagamento de R$ ${total} em ${forma}, processado com sucesso!`);
    }
}

const carrinhoc = new Carrinho();
let item = new Item("Camiseta", 50, 2);
carrinhoc.adicionarItem(item);

item = new Item("Calça", 130, 1);
carrinhoc.adicionarItem(item);

item = new Item("Meia", 20, 3);
carrinhoc.adicionarItem(item);

const total = carrinhoc.calcularTotal();
console.log(total);

const pagamento = new Pagamento();
pagamento.processarPagamento(total, "dinheiro");
