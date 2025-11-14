class Calculadora {
    somar(a: number, b: number): number {
        return a + b;
    }

    subtrair(a: number, b: number): number {
        return a - b;
    }

    multiplicar(a: number, b: number): number {
        return a * b;
    }

    dividir(a: number, b: number): number {
        if (b === 0) throw new Error("Divisão por zero não é permitida.");
        return a / b;
    }
}

const calc = new Calculadora();
console.log(calc.somar(10, 20));
