class Motor {
    ligar() { console.log("Motor ligado."); }
}

class Carro {
    constructor(private motor: Motor) {}

    ligarMotor() {
        this.motor.ligar();
    }
}

const carro = new Carro(new Motor());
carro.ligarMotor();
