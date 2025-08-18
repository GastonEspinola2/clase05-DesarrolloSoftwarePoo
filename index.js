import Banco from "./models/Banco.js";
import { mostrarMenu, crearInterface } from "./ui/menu.js";

const rl = crearInterface();
const banco = new Banco("Banco POO");

const t1 = banco.agregarTitular("Juan Pérez", "12345678");
const t2 = banco.agregarTitular("María López", "87654321");
banco.agregarCuenta("caja", "CA001", t1, 10000);
banco.agregarCuenta("corriente", "CC001", t2, 2000);

function manejarOpcion(opcion) {
    switch (opcion) {
        case "1":
            rl.question("Nombre del titular: ", nombre => {
                rl.question("DNI del titular: ", dni => {
                    try {
                        banco.agregarTitular(nombre, dni);
                        console.log("Titular creado correctamente.");
                    } catch (e) {
                        console.log(`Error: ${e.message}`);
                    }
                    iniciar();
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
                            return iniciar();
                        }
                        rl.question("Saldo inicial: ", saldo => {
                            try {
                                banco.agregarCuenta(tipo, numero, titular, Number(saldo));
                                console.log("Cuenta creada correctamente.");
                            } catch (e) {
                                console.log(`Error: ${e.message}`);
                            }
                            iniciar();
                        });
                    });
                });
            });
            break;

        case "3":
            rl.question("Número de cuenta: ", num => {
                const cuenta = banco.buscarCuenta(num);
                if (!cuenta) console.log("Cuenta no encontrada.");
                else console.log(`Saldo: $${cuenta.saldo}`);
                iniciar();
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
                    iniciar();
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
                    iniciar();
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
                        iniciar();
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
            iniciar();
            break;
    }
}

function iniciar() {
    mostrarMenu();
    rl.question("Seleccione una opción: ", manejarOpcion);
}

iniciar();
