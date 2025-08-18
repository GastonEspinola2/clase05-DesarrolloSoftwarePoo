import Cuenta from "./Cuenta.js";

class CuentaCorriente extends Cuenta {
    constructor(numeroCuenta, titular, saldoInicial = 0, descubiertoPermitido = 5000) {
        super(numeroCuenta, titular, saldoInicial);
        this.descubiertoPermitido = descubiertoPermitido;
    }

    get descubiertoPermitido() {
        return this._descubiertoPermitido;
    }

    set descubiertoPermitido(valor) {
        if (valor < 0) throw new Error("El descubierto permitido no puede ser negativo.");
        this._descubiertoPermitido = valor;
    }

    extraer(monto) {
        if (monto <= 0) throw new Error("El monto debe ser positivo.");
        if (monto > this.saldo + this.descubiertoPermitido) {
            throw new Error("Saldo insuficiente, incluso con descubierto.");
        }
        this.saldo -= monto;
    }
}

export default CuentaCorriente;
