import Cuenta from "./Cuenta.js";

class CajaDeAhorro extends Cuenta {
  constructor(numeroCuenta, titular, saldoInicial = 0, limiteExtraccion = 20000) {
    super(numeroCuenta, titular, saldoInicial);
    this.limiteExtraccion = limiteExtraccion;
  }

  get limiteExtraccion() { return this._limiteExtraccion; }
  set limiteExtraccion(valor) {
    if (typeof valor !== "number" || isNaN(valor) || valor <= 0) {
      throw new Error("El límite de extracción debe ser un número mayor a 0.");
    }
    this._limiteExtraccion = valor;
  }

  // Info útil para mostrar en CLI
  maximoExtraible() {
    return Math.min(this.saldo, this.limiteExtraccion);
  }

  extraer(monto) {
    if (typeof monto !== "number" || isNaN(monto)) {
      throw new Error("El monto debe ser un número válido.");
    }
    if (monto <= 0) throw new Error("El monto debe ser positivo.");
    if (monto > this.limiteExtraccion) {
      throw new Error(`El monto excede el límite por operación: ${this.limiteExtraccion}`);
    }
    if (monto > this.saldo) throw new Error("Saldo insuficiente.");
    this.saldo -= monto;
  }
}

export default CajaDeAhorro;
