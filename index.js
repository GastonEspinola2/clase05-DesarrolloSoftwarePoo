import Banco from "./models/Banco.js";
import { mostrarMenu, crearInterface } from "./ui/menu.js";

const rl = crearInterface();
const banco = new Banco("Banco POO");

const t1 = banco.agregarTitular("Juan Pérez", "12345678", "1234");
const t2 = banco.agregarTitular("María López", "87654321", "4321");
banco.agregarCuenta("caja", "CA001", t1, 10000);
banco.agregarCuenta("corriente", "CC001", t2, 2000);

function pedirPIN(msg, cb) {
  rl.question(msg || "Ingrese su PIN: ", pin => cb(pin.trim()));
}

function validarPIN(cuenta, pin) {
  if (!cuenta || !cuenta.titular) return false;
  return cuenta.titular.pin === pin;
}

function mostrarInfoCuenta(cuenta) {
  if (!cuenta) return;
  if (typeof cuenta.maximoExtraible === "function") {
    if ("limiteExtraccion" in cuenta) {
      console.log(`> Límite por extracción: $${cuenta.limiteExtraccion}`);
      console.log(`> Máximo extraíble ahora: $${cuenta.maximoExtraible()}`);
    }
    if ("descubiertoPermitido" in cuenta) {
      console.log(`> Descubierto permitido: $${cuenta.descubiertoPermitido}`);
      console.log(`> Máximo extraíble ahora (saldo + descubierto): $${cuenta.maximoExtraible()}`);
    }
  }
}

function manejarOpcion(opcion) {
  switch (opcion) {
    case "1":
      rl.question("Nombre del titular: ", nombre => {
        rl.question("DNI del titular: ", dni => {
          rl.question("Defina un PIN (4-6 dígitos): ", pin => {
            try {
              banco.agregarTitular(nombre, dni.trim(), pin.trim());
              console.log("Titular creado correctamente.");
            } catch (e) {
              console.log(`Error: ${e.message}`);
            }
            iniciar();
          });
        });
      });
      break;

    case "2":
      rl.question("Tipo de cuenta (caja/corriente): ", tipo => {
        rl.question("Número de cuenta: ", numero => {
          rl.question("DNI del titular: ", dni => {
            const titular = banco.titulares.find(t => t.dni === dni.trim());
            if (!titular) {
              console.log("Titular no encontrado. Cree un titular primero.");
              return iniciar();
            }
            rl.question("Saldo inicial: ", saldo => {
              try {
                banco.agregarCuenta(tipo.trim(), numero.trim(), titular, Number(saldo));
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
        const cuenta = banco.buscarCuenta(num.trim());
        if (!cuenta) {
          console.log("Cuenta no encontrada.");
        } else {
          console.log(`Saldo: $${cuenta.saldo}`);
          mostrarInfoCuenta(cuenta);
        }
        iniciar();
      });
      break;

    case "4":
      rl.question("Número de cuenta: ", num => {
        const cuenta = banco.buscarCuenta(num.trim());
        if (!cuenta) {
          console.log("Cuenta no encontrada.");
          return iniciar();
        }
        pedirPIN("PIN del titular: ", pin => {
          if (!validarPIN(cuenta, pin)) {
            console.log("PIN incorrecto.");
            return iniciar();
          }
          rl.question("Monto a depositar: ", m => {
            try {
              cuenta.depositar(Number(m));
              console.log("Depósito realizado.");
              console.log(`Nuevo saldo: $${cuenta.saldo}`);
            } catch (e) {
              console.log(`Error: ${e.message}`);
            }
            iniciar();
          });
        });
      });
      break;

    case "5":
      rl.question("Número de cuenta: ", num => {
        const cuenta = banco.buscarCuenta(num.trim());
        if (!cuenta) {
          console.log("Cuenta no encontrada.");
          return iniciar();
        }
        mostrarInfoCuenta(cuenta);
        pedirPIN("PIN del titular: ", pin => {
          if (!validarPIN(cuenta, pin)) {
            console.log("PIN incorrecto.");
            return iniciar();
          }
          rl.question("Monto a extraer: ", m => {
            try {
              cuenta.extraer(Number(m));
              console.log("Extracción realizada.");
              console.log(`Nuevo saldo: $${cuenta.saldo}`);
            } catch (e) {
              console.log(`Error: ${e.message}`);
            }
            iniciar();
          });
        });
      });
      break;

    case "6":
      rl.question("Cuenta origen: ", origen => {
        const cuentaOrigen = banco.buscarCuenta(origen.trim());
        if (!cuentaOrigen) {
          console.log("Cuenta origen no encontrada.");
          return iniciar();
        }
        mostrarInfoCuenta(cuentaOrigen);
        rl.question("Cuenta destino: ", destino => {
          const cuentaDestino = banco.buscarCuenta(destino.trim());
          if (!cuentaDestino) {
            console.log("Cuenta destino no encontrada.");
            return iniciar();
          }
          pedirPIN("PIN del titular de la cuenta origen: ", pin => {
            if (!validarPIN(cuentaOrigen, pin)) {
              console.log("PIN incorrecto.");
              return iniciar();
            }
            rl.question("Monto a transferir: ", m => {
              try {
                banco.transferir(origen.trim(), destino.trim(), Number(m)); // valida > 0
                console.log("Transferencia realizada.");
                console.log(`Nuevo saldo ORIGEN: $${cuentaOrigen.saldo}`);
                console.log(`Nuevo saldo DESTINO: $${cuentaDestino.saldo}`);
              } catch (e) {
                console.log(`Error: ${e.message}`);
              }
              iniciar();
            });
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
