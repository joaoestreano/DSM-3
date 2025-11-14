class Motor {
    ligar() { console.log("Motor ligado."); }
    desligar() { console.log("Motor desligado."); }
}

class Carro {
    private motor: Motor;

    constructor() {
        this.motor = new Motor(); // forte acoplamento
    }

    ligarMotor() { this.motor.ligar(); }
    desligarMotor() { this.motor.desligar(); }
}

const c3 = new Carro();
c3.ligarMotor();
