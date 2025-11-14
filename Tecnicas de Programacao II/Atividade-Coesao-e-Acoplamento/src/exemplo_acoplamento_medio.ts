class Motor {
    ligar() { console.log("Motor ligado."); }
    desligar() { console.log("Motor desligado."); }
}

class Carro {
    constructor(private motor: Motor) {}

    ligarMotor() {
        this.motor.ligar();
    }
}

const carro2 = new Carro(new Motor());
carro2.ligarMotor();
