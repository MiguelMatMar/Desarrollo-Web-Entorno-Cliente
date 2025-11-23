// Constructor de Ordenador
function Ordenador(marca, modelo, ram = 4, discoDuro = 512, pulgadasPantalla = 17) {

    // Propiedades
    this.marca = marca;
    this.modelo = modelo;
    this.ram = ram;
    this.discoDuro = discoDuro;
    this.pulgadasPantalla = pulgadasPantalla;

    // Metodo toString()
    this.toString = function() {
        return `Ordenador: Marca: ${this.marca}, Modelo: ${this.modelo}, RAM: ${this.ram} GB, Disco Duro: ${this.discoDuro} GB, Pantalla: ${this.pulgadasPantalla}"`;
    }
}
// Constructor de Portatil
function Portatil(marca, modelo, ram = 4, discoDuro = 256, pulgadasPantalla = 13, autonomia = 4) {

    // La herencia del Ordenador, para que tenga sus propiedades y métodos
    this.__proto__ = new Ordenador(marca, modelo, ram, discoDuro, pulgadasPantalla);

    // Nueva propiedad, unica en portatil
    this.autonomia = autonomia;


    this.toString = function() {
        return `Portatil: Marca: ${this.marca}, Modelo: ${this.modelo}, RAM: ${this.ram} GB, Disco Duro: ${this.discoDuro} GB, Pantalla: ${this.pulgadasPantalla}, Autonomía: ${this.autonomia} horas`;
    }
}

let Ordenador1 = new Ordenador("Dell", "XPS 15");
let Portatil1 = new Portatil("Apple", "MacBook Air");

console.log(Ordenador1.toString());
console.log(Portatil1.toString());