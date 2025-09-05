//Coesão

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
    if (b === 0) {
      throw new Error("Divisão por zero não é permitida.");
    }
    return a / b;
  }
}

//class Calculadora {
// somar(a: number, b: number): number {
// return a + b;
//}
//subtrair(a: number, b: number): number {
//return a - b;
//}
// multiplicar(a: number, b: number): number {
// return a * b;
// }
// dividir(a: number, b: number): number {
// if (b === 0) {
// throw new Error("Divisão por zero não é permitida.");
// }
// return a / b;
// }
// Adicionando responsabilidades não relacionadas à classe
//Calculadora
// imprimirDataAtual(): void {
// const data = new Date();
// console.log(`Data atual: ${data.toLocaleDateString()}`);
// }
// saudacao(nome: string): void {
// console.log(`Olá, ${nome}!`);
// }
// }
