import Titular from "./Titular.js";
import CajaDeAhorro from "./CajaDeAhorro.js";
import CuentaCorriente from "./CuentaCorriente.js";

class Banco {
  constructor(nombre) {
    this.nombre = nombre;
    this.cuentas = [];
    this.titulares = [];
  }

  // ahora recibe pin
  agregarTitular(nombre, dni, pin) {
    if (this.titulares.some(t => t.dni === dni)) {
      throw new Error("Ya existe un titular con ese DNI.");
    }
    const titular = new Titular(nombre, dni, pin);
    this.titulares.push(titular);
    return titular;
  }

  agregarCuenta(tipo, numeroCuenta, titular, saldoInicial) {
    if (this.cuentas.some(c => c.numeroCuenta === numeroCuenta)) {
      throw new Error("Ya existe una cuenta con ese número.");
    }
    let cuenta;
    if (tipo === "caja") {
      cuenta = new CajaDeAhorro(numeroCuenta, titular, saldoInicial);
    } else if (tipo === "corriente") {
      cuenta = new CuentaCorriente(numeroCuenta, titular, saldoInicial);
    } else {
      throw new Error("Tipo de cuenta no válido.");
    }
    this.cuentas.push(cuenta);
    return cuenta;
  }

  buscarCuenta(numeroCuenta) {
    return this.cuentas.find(c => c.numeroCuenta === numeroCuenta);
  }

  transferir(origenNum, destinoNum, monto) {
    if (typeof monto !== "number" || isNaN(monto)) {
      throw new Error("El monto debe ser un número válido.");
    }
    if (monto <= 0) throw new Error("El monto a transferir debe ser positivo.");

    const origen = this.buscarCuenta(origenNum);
    const destino = this.buscarCuenta(destinoNum);
    if (!origen || !destino) throw new Error("Cuenta origen o destino no encontrada.");
    origen.extraer(monto);
    destino.depositar(monto);
  }
}

export default Banco;
