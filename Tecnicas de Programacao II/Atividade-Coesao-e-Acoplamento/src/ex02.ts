class CarrinhoDeCompras {
    private itens: string[] = [];

    adicionarItem(item: string): void {
        this.itens.push(item);
    }

    removerItem(item: string): void {
        this.itens = this.itens.filter(i => i !== item);
    }

    imprimir(): void {
        console.log("Itens do carrinho:");
        this.itens.forEach(i => console.log("- " + i));
    }
}

const carrinho = new CarrinhoDeCompras();
carrinho.adicionarItem("Camiseta");
carrinho.adicionarItem("Calça");
carrinho.adicionarItem("Meia");
carrinho.removerItem("Camiseta");
carrinho.imprimir();
