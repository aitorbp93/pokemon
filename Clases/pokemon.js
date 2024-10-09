class Pokemon {
    constructor(nombre, tipo, hpMax, ataque, defensa, moves) {
        this.nombre = nombre;
        this.tipo = tipo;
        this.hpMax = hpMax;
        this.ataque = ataque;
        this.defensa = defensa;
        this.moves = moves;
        this.hpActual = hpMax;
        this.curado = false;
    }

    // Método para atacar
    atacar(movimiento, oponente) {
        const factorAleatorio = Math.random() * (1.0 - 0.85) + 0.85;
        const danio = Math.max(1, (this.ataque / oponente.defensa) * movimiento.damege * factorAleatorio);
        oponente.hpActual = Math.max(0, oponente.hpActual - Math.floor(danio));

        console.log(`${this.nombre} usa ${movimiento.nombreMove} y le hace ${Math.floor(danio)} de daño a ${oponente.nombre}`);
    }

    // Método de curar
    heal() {
        if (!this.curado) {
            const curacion = Math.floor(this.hpMax * 0.5);
            this.hpActual = Math.min(this.hpMax, this.hpActual + curacion);
            this.curado = true;
            console.log(`${this.nombre} se ha curado y ahora tiene ${this.hpActual} de vida.`);
        } else {
            console.log(`${this.nombre} ya no puede curarse nuevamente.`);
        }
    }
}

module.exports = Pokemon;
