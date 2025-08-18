import readline from "readline";

function mostrarMenu() {
    console.log("\n--- BANCO SIMPLE ---");
    console.log("1. Crear titular");
    console.log("2. Crear cuenta");
    console.log("3. Ver saldo");
    console.log("4. Depositar");
    console.log("5. Extraer");
    console.log("6. Transferir");
    console.log("7. Salir");
}

function crearInterface() {
    return readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
}

export { mostrarMenu, crearInterface };
