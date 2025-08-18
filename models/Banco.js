import Titular from "./Titular.js";
import CajaDeAhorro from "./CajaDeAhorro.js";
import CuentaCorriente from "./CuentaCorriente.js";

class Banco {
    constructor(nombre) {
        this.nombre = nombre;
        this.cuentas = [];
        this.titulares = [];
    }

    agregarTitular(nombre, dni) {
        const titular = new Titular(nombre, dni);
        this.titulares.push(titular);
        return titular;
    }

    agregarCuenta(tipo, numeroCuenta, titular, saldoInicial) {
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
        const origen = this.buscarCuenta(origenNum);
        const destino = this.buscarCuenta(destinoNum);
        if (!origen || !destino) throw new Error("Cuenta origen o destino no encontrada.");
        origen.extraer(monto);
        destino.depositar(monto);
    }
}

export default Banco;
