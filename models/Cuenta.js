class Cuenta {
    #saldo;

    constructor(numeroCuenta, titular, saldoInicial = 0) {
        this.numeroCuenta = numeroCuenta;
        this.titular = titular;
        this.saldo = saldoInicial;
    }

    get numeroCuenta() {
        return this._numeroCuenta;
    }

    set numeroCuenta(valor) {
        if (!valor || valor.trim() === "") throw new Error("El número de cuenta no puede estar vacío.");
        this._numeroCuenta = valor;
    }

    get titular() {
        return this._titular;
    }

    set titular(valor) {
        this._titular = valor;
    }

    get saldo() {
        return this.#saldo;
    }

    set saldo(valor) {
        if (typeof valor !== "number" || isNaN(valor)) throw new Error("El saldo debe ser un número.");
        this.#saldo = valor;
    }

    depositar(monto) {
        if (monto <= 0) throw new Error("El monto debe ser positivo.");
        this.saldo += monto;
    }

    extraer(monto) {
        throw new Error("Este método debe ser implementado en subclases.");
    }
}

export default Cuenta;
