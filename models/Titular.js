class Titular {
  constructor(nombre, dni, pin) {
    this.nombre = nombre;
    this.dni = dni;
    this.pin = pin;
  }

  get nombre() { return this._nombre; }
  set nombre(valor) {
    if (!valor || valor.trim() === "") throw new Error("El nombre no puede estar vacío.");
    this._nombre = valor;
  }

  get dni() { return this._dni; }
  set dni(valor) {
    if (!/^\d+$/.test(valor)) throw new Error("El DNI debe contener solo números.");
    this._dni = valor;
  }

  get pin() { return this._pin; }
  set pin(valor) {
    if (!/^\d{4,6}$/.test(valor)) throw new Error("El PIN debe tener 4 a 6 dígitos numéricos.");
    this._pin = valor;
  }

  verDatos() {
    return `${this.nombre} (DNI: ${this.dni})`;
  }
}

export default Titular;
