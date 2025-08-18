import Cuenta from "./Cuenta.js";

class CajaDeAhorro extends Cuenta {
    constructor(numeroCuenta, titular, saldoInicial = 0, limiteExtraccion = 20000) {
        super(numeroCuenta, titular, saldoInicial);
        this.limiteExtraccion = limiteExtraccion;
    }

    get limiteExtraccion() {
        return this._limiteExtraccion;
    }

    set limiteExtraccion(valor) {
        if (valor <= 0) throw new Error("El límite de extracción debe ser mayor a 0.");
        this._limiteExtraccion = valor;
    }

    extraer(monto) {
        if (monto <= 0) throw new Error("El monto debe ser positivo.");
        if (monto > this.limiteExtraccion) throw new Error(`El monto excede el límite por operación: ${this.limiteExtraccion}`);
        if (monto > this.saldo) throw new Error("Saldo insuficiente.");
        this.saldo -= monto;
    }
}

export default CajaDeAhorro;
