class Titular {
    constructor(nombre, dni) {
        this.nombre = nombre;
        this.dni = dni;
    }

    get nombre() {
        return this._nombre;
    }

    set nombre(valor) {
        if (!valor || valor.trim() === "") throw new Error("El nombre no puede estar vacío.");
        this._nombre = valor;
    }

    get dni() {
        return this._dni;
    }

    set dni(valor) {
        if (!/^\d+$/.test(valor)) throw new Error("El DNI debe contener solo números.");
        this._dni = valor;
    }

    verDatos() {
        return `${this.nombre} (DNI: ${this.dni})`;
    }
}

export default Titular;
