class Cuenta {
  #saldo;

  constructor(numeroCuenta, titular, saldoInicial = 0) {
    this.numeroCuenta = numeroCuenta;
    this.titular = titular;
    this.saldo = saldoInicial; // usa setter (valida no-negativo)
  }

  get numeroCuenta() { return this._numeroCuenta; }
  set numeroCuenta(valor) {
    if (!valor || valor.trim() === "") throw new Error("El número de cuenta no puede estar vacío.");
    this._numeroCuenta = valor;
  }

  get titular() { return this._titular; }
  set titular(valor) {
    // opcional: validar instancia si querés
    this._titular = valor;
  }

  get saldo() { return this.#saldo; }
  set saldo(valor) {
    if (typeof valor !== "number" || isNaN(valor)) {
      throw new Error("El saldo debe ser un número.");
    }
    if (valor < 0) {
      throw new Error("El saldo inicial no puede ser negativo.");
    }
    this.#saldo = valor;
  }

  depositar(monto) {
    if (typeof monto !== "number" || isNaN(monto)) {
      throw new Error("El monto debe ser un número válido.");
    }
    if (monto <= 0) throw new Error("El monto a depositar debe ser positivo.");
    this.saldo += monto;
  }

  extraer(_monto) {
    // Método abstracto en la práctica
    throw new Error("Este método debe ser implementado en subclases.");
  }
}

export default Cuenta;
