// Matriz de efectividad que define las ventajas y desventajas de cada tipo
const efectividadTipos = {
    FUEGO: { FUEGO: 0.5, AGUA: 0.5, PLANTA: 2, ELECTRICO: 1, TIERRA: 1 },
    AGUA: { FUEGO: 2, AGUA: 0.5, PLANTA: 0.5, ELECTRICO: 1, TIERRA: 2 },
    PLANTA: { FUEGO: 0.5, AGUA: 2, PLANTA: 0.5, ELECTRICO: 1, TIERRA: 2 },
    ELECTRICO: { FUEGO: 1, AGUA: 2, PLANTA: 0.5, ELECTRICO: 0.5, TIERRA: 0 },
    TIERRA: { FUEGO: 2, AGUA: 1, PLANTA: 0.5, ELECTRICO: 2, TIERRA: 1 }
};

// Clase Pokémon, define la estructura y métodos de un Pokémon
class Pokemon {
    constructor(nombre, tipo, hpMax, ataque, defensa, moves) {
        // Inicializa las propiedades del Pokémon
        this.nombre = nombre;
        this.tipo = tipo;
        this.hpMax = hpMax;
        this.ataque = ataque;
        this.defensa = defensa;
        this.moves = moves;
        this.hpActual = hpMax; // Vida actual, empieza al máximo
        this.curado = false; // Indica si ya se curó en la batalla
    }

    // Método de ataque, calcula el daño y lo aplica al oponente
    atacar(movimiento, oponente) {
        const factorAleatorio = Math.random() * (1.0 - 0.85) + 0.85; // Genera un número aleatorio entre 0.85 y 1.0 para variar el daño
        const modificadorTipo = efectividadTipos[this.tipo][oponente.tipo] || 1; // Ajusta el daño según el tipo del oponente
        const danio = Math.max(1, (this.ataque / oponente.defensa) * movimiento.damege * modificadorTipo * factorAleatorio);
        oponente.hpActual = Math.max(0, oponente.hpActual - Math.floor(danio)); // Resta el daño a la vida del oponente

        console.log(`${this.nombre} usa ${movimiento.nombreMove} y le hace ${Math.floor(danio)} de daño a ${oponente.nombre}`);
        if (modificadorTipo > 1) {
            console.log("¡Es súper efectivo!");
        } else if (modificadorTipo < 1) {
            console.log("No es muy efectivo...");
        }
    }

    // Método de curación, solo puede curarse una vez por batalla
    heal() {
        if (!this.curado) {
            const curacion = Math.floor(this.hpMax * 0.5); // Cura el 50% de la vida máxima
            this.hpActual = Math.min(this.hpMax, this.hpActual + curacion); // No permite superar la vida máxima
            this.curado = true; // Marca como ya curado
            console.log(`${this.nombre} se ha curado y ahora tiene ${this.hpActual} de vida.`);
        } else {
            console.log(`${this.nombre} ya no puede curarse nuevamente.`);
        }
    }
}

// Exporta la clase Pokemon para que pueda ser utilizada en otros archivos
module.exports = Pokemon;
