//Acoplamento

class Motor {
    ligar(): void {
    console.log("Motor ligado.");
    }
    desligar(): void {
    console.log("Motor desligado.");
    }
   }
   class Carro {
    private motor: Motor;
    constructor() {
    this.motor = new Motor();
    }
    ligarMotor(): void {
    this.motor.ligar();
    }
    desligarMotor(): void {
    this.motor.desligar();
    }
   }
   