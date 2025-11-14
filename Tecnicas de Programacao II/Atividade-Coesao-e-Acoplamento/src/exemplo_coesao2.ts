class Calculadora {
    somar(a: number, b: number): number {
        return a + b;
    }

    imprimirDataAtual(): void {
        console.log(`Data atual: ${new Date().toLocaleDateString()}`);
    }

    saudacao(nome: string): void {
        console.log(`Olá, ${nome}!`);
    }
}

const c = new Calculadora();
c.imprimirDataAtual();
c.saudacao("João");
