class Pessoa {
    nome: string;
    email: string;
    nasc: string;

    constructor(nome: string, email: string, nasc: string) {
        this.nome = nome;
        this.email = email;
        this.nasc = nasc;
    }

    imprimir(): void {
        console.log("Nome: " + this.nome);
        console.log("e-Mail: " + this.email);
        console.log("Data Nasc: " + this.nasc);
        console.log("Idade: " + this.idade(this.nasc) + " anos");
        console.log("Anos bissextos vividos: " + this.numBissextos());
    }

    public idade(nasc: string): number {
        const hoje = new Date();
        const ano: number = parseInt(nasc.substring(6, 10));
        const mes: number = parseInt(nasc.substring(3, 5)) - 1;
        const dia: number = parseInt(nasc.substring(0, 2));
        const dataNascimento = new Date(ano, mes, dia);

        let idade: number = hoje.getFullYear() - dataNascimento.getFullYear();
        const mesAtual = hoje.getMonth();
        const diaAtual = hoje.getDate();

        if (
            mesAtual < dataNascimento.getMonth() ||
            (mesAtual === dataNascimento.getMonth() && diaAtual < dataNascimento.getDate())
        ) {
            idade--;
        }

        return idade;
    }

    public numBissextos(): number {
        const ano: number = parseInt(this.nasc.substring(6, 10));
        const hoje = new Date();
        const anoAtual = hoje.getFullYear();
        let quant: number = 0;

        for (let x = ano; x <= anoAtual; x++) {
            if (DataUtil.isBissexto(x)) {
                console.log("Ano bissexto: " + x);
                quant++;
            }
        }
        return quant;
    }
}

class DataUtil {
    static isBissexto(ano: number): boolean {
        if (ano % 400 === 0) {
            return true;
        } else if (ano % 4 === 0 && ano % 100 !== 0) {
            return true;
        }
        return false;
    }
}

const cliente = new Pessoa("João Victor", "joaovictor@gmail.com", "24/10/2003");

cliente.imprimir();
