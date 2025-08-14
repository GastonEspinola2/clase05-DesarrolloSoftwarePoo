import readline from "readline";

//CLASES DE DOMINIO

class Titular {
    constructor(nombre, dni) {
        this.nombre = nombre;
        this.dni = dni;
    }

    verDatos() {
        return `${this.nombre} (DNI: ${this.dni})`;
    }
}

class Cuenta {
    #saldo;

    constructor(numeroCuenta, titular, saldoInicial = 0) {
        this.numeroCuenta = numeroCuenta;
        this.titular = titular;
        this.#saldo = saldoInicial;
    }

    depositar(monto) {
        if (monto <= 0) throw new Error("El monto debe ser positivo.");
        this.#saldo += monto;
    }

    extraer(monto) {
        throw new Error("Este método debe ser implementado en subclases.");
    }

    verSaldo() {
        return this.#saldo;
    }

    _cambiarSaldo(nuevoSaldo) {
        this.#saldo = nuevoSaldo;
    }
}

class CajaDeAhorro extends Cuenta {
    constructor(numeroCuenta, titular, saldoInicial = 0, limiteExtraccion = 20000) {
        super(numeroCuenta, titular, saldoInicial);
        this.limiteExtraccion = limiteExtraccion;
    }

    extraer(monto) {
        if (monto <= 0) throw new Error("El monto debe ser positivo.");
        if (monto > this.limiteExtraccion) throw new Error(`El monto excede el límite por operación: ${this.limiteExtraccion}`);
        if (monto > this.verSaldo()) throw new Error("Saldo insuficiente.");
        this._cambiarSaldo(this.verSaldo() - monto);
    }
}

class CuentaCorriente extends Cuenta {
    constructor(numeroCuenta, titular, saldoInicial = 0, descubiertoPermitido = 5000) {
        super(numeroCuenta, titular, saldoInicial);
        this.descubiertoPermitido = descubiertoPermitido;
    }

    extraer(monto) {
        if (monto <= 0) throw new Error("El monto debe ser positivo.");
        if (monto > this.verSaldo() + this.descubiertoPermitido) {
            throw new Error("Saldo insuficiente, incluso con descubierto.");
        }
        this._cambiarSaldo(this.verSaldo() - monto);
    }
}

//SERVICIO DE ORQUESTACIÓN 

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

//CLI 

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const banco = new Banco("Banco POO");

const t1 = banco.agregarTitular("Juan Pérez", "12345678");
const t2 = banco.agregarTitular("María López", "87654321");
banco.agregarCuenta("caja", "CA001", t1, 10000);
banco.agregarCuenta("corriente", "CC001", t2, 2000);

function mostrarMenu() {
    console.log("\n--- BANCO SIMPLE ---");
    console.log("1. Crear titular");
    console.log("2. Crear cuenta");
    console.log("3. Ver saldo");
    console.log("4. Depositar");
    console.log("5. Extraer");
    console.log("6. Transferir");
    console.log("7. Salir");
    rl.question("Seleccione una opción: ", manejarOpcion);
}

function manejarOpcion(opcion) {
    switch (opcion) {
        case "1":
            rl.question("Nombre del titular: ", nombre => {
                rl.question("DNI del titular: ", dni => {
                    banco.agregarTitular(nombre, dni);
                    console.log("Titular creado correctamente.");
                    mostrarMenu();
                });
            });
            break;

        case "2": 
            rl.question("Tipo de cuenta (caja/corriente): ", tipo => {
                rl.question("Número de cuenta: ", numero => {
                    rl.question("DNI del titular: ", dni => {
                        const titular = banco.titulares.find(t => t.dni === dni);
                        if (!titular) {
                            console.log("Titular no encontrado. Cree un titular primero.");
                            return mostrarMenu();
                        }
                        rl.question("Saldo inicial: ", saldo => {
                            try {
                                banco.agregarCuenta(tipo, numero, titular, Number(saldo));
                                console.log("Cuenta creada correctamente.");
                            } catch (e) {
                                console.log(`Error: ${e.message}`);
                            }
                            mostrarMenu();
                        });
                    });
                });
            });
            break;

        case "3":
            rl.question("Número de cuenta: ", num => {
                const cuenta = banco.buscarCuenta(num);
                if (!cuenta) console.log("Cuenta no encontrada.");
                else console.log(`Saldo: $${cuenta.verSaldo()}`);
                mostrarMenu();
            });
            break;

        case "4": 
            rl.question("Número de cuenta: ", num => {
                rl.question("Monto a depositar: ", m => {
                    try {
                        const cuenta = banco.buscarCuenta(num);
                        if (!cuenta) throw new Error("Cuenta no encontrada.");
                        cuenta.depositar(Number(m));
                        console.log("Depósito realizado.");
                    } catch (e) {
                        console.log(`Error: ${e.message}`);
                    }
                    mostrarMenu();
                });
            });
            break;

        case "5":
            rl.question("Número de cuenta: ", num => {
                rl.question("Monto a extraer: ", m => {
                    try {
                        const cuenta = banco.buscarCuenta(num);
                        if (!cuenta) throw new Error("Cuenta no encontrada.");
                        cuenta.extraer(Number(m));
                        console.log("Extracción realizada.");
                    } catch (e) {
                        console.log(`Error: ${e.message}`);
                    }
                    mostrarMenu();
                });
            });
            break;

        case "6": 
            rl.question("Cuenta origen: ", origen => {
                rl.question("Cuenta destino: ", destino => {
                    rl.question("Monto a transferir: ", m => {
                        try {
                            banco.transferir(origen, destino, Number(m));
                            console.log("Transferencia realizada.");
                        } catch (e) {
                            console.log(`Error: ${e.message}`);
                        }
                        mostrarMenu();
                    });
                });
            });
            break;

        case "7":
            console.log("Saliendo...");
            rl.close();
            break;

        default:
            console.log("Opción inválida.");
            mostrarMenu();
            break;
    }
}

// Iniciar CLI
mostrarMenu();
