"use strict";
var Pessoa = /** @class */ (function () {
    function Pessoa(nome, email, nasc) {
        this.nome = nome;
        this.email = email;
        this.nasc = nasc;
    }
    Pessoa.prototype.imprimir = function () {
        console.log("Nome: " + this.nome);
        console.log("e-Mail: " + this.email);
        console.log("Data Nasc: " + this.nasc);
        console.log("Idade: " + this.idade(this.nasc) + " anos");
        console.log("Anos bissextos vividos: " + this.numBissextos());
    };
    Pessoa.prototype.idade = function (nasc) {
        var hoje = new Date();
        var ano = parseInt(nasc.substring(6, 10));
        var mes = parseInt(nasc.substring(3, 5)) - 1;
        var dia = parseInt(nasc.substring(0, 2));
        var dataNascimento = new Date(ano, mes, dia);
        var idade = hoje.getFullYear() - dataNascimento.getFullYear();
        var mesAtual = hoje.getMonth();
        var diaAtual = hoje.getDate();
        if (mesAtual < dataNascimento.getMonth() ||
            (mesAtual === dataNascimento.getMonth() && diaAtual < dataNascimento.getDate())) {
            idade--;
        }
        return idade;
    };
    Pessoa.prototype.numBissextos = function () {
        var ano = parseInt(this.nasc.substring(6, 10));
        var hoje = new Date();
        var anoAtual = hoje.getFullYear();
        var quant = 0;
        for (var x = ano; x <= anoAtual; x++) {
            if (DataUtil.isBissexto(x)) {
                console.log("Ano bissexto: " + x);
                quant++;
            }
        }
        return quant;
    };
    return Pessoa;
}());
var DataUtil = /** @class */ (function () {
    function DataUtil() {
    }
    DataUtil.isBissexto = function (ano) {
        if (ano % 400 === 0) {
            return true;
        }
        else if (ano % 4 === 0 && ano % 100 !== 0) {
            return true;
        }
        return false;
    };
    return DataUtil;
}());
var cliente = new Pessoa("João Victor", "joao@email.com", "24/10/2003");
cliente.imprimir();
//# sourceMappingURL=index.js.map