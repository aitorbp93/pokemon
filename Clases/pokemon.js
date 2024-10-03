
const Movimiento = require('./move');
const Tipo = require('./type');




class pokemon {
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

    //metodo para atacar
    atacar(movimiento, maquina) {
        const factorAleatorio = Math.random() * (1.0 - 0.85) + 0.85;
        const danio = Math.max(1, (this.ataque / maquina.defensa) * factorAleatorio);
        maquina.hpActual = Math.max(0, maquina.hpActual - danio);

        console.log(`${this.nombre} usa ${movimiento} y le hace ${danio} a ${maquina.nombre}`);

    }

    //metodo de curar

    heal() {
        if (!this.curado) {
            this.hpActual = Math.min(this.hpMax, this.hpActual + this.hpmax * 0.5);
            this.curado = true;
            console.log(`${this.nombre} se ha curado y ahora tiene ${this.hpActual} de vida`);
        }
        else {
            console.log(`${this.nombre} ya estaba curado`);

        }



    }





}
module.exports = pokemon;