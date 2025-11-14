class Contato {
    constructor(
        public nome: string,
        public telefone: string,
        public email: string
    ) {}
}

class Agenda {
    private contatos: Contato[] = [];

    adicionarContato(contato: Contato): void {
        this.contatos.push(contato);
    }

    removerContato(nome: string): void {
        this.contatos = this.contatos.filter(c => c.nome !== nome);
    }

    imprimir(): void {
        console.log("Agenda:");
        this.contatos.forEach(c =>
            console.log(`${c.nome} - ${c.telefone} - ${c.email}`)
        );
    }
}

const agenda = new Agenda();
agenda.adicionarContato(new Contato("João", "1111-1111", "joao@email"));
agenda.adicionarContato(new Contato("Maria", "2222-2222", "maria@email"));
agenda.removerContato("João");
agenda.imprimir();
