// Importamos las clases y módulos
const readlineSync = require('readline-sync');
const Pokemon = require('./pokemon');
const Move = require('./move');
const Type = require('./type');

// Creamos los movimientos
const movimientos = [
    new Move('Trueno', 50),
    new Move('Tornado', 40),
    new Move('Golpe Roca', 35),
    new Move('Látigo Cepa', 30),
    new Move('Lanzallamas', 45),
    new Move('Surf', 50),
    new Move('Golpe Karate', 35),
    new Move('Cuerpo Afilado', 30),
    new Move('Bola Sombra', 40),
    new Move('Puño Fuego', 45),
    new Move('Puño Hielo', 45),
    new Move('Colmillo Rayo', 50),
    new Move('Terremoto', 60),
    new Move('Onda Trueno', 25),
    new Move('Ventisca', 55),
    new Move('Puño Trueno', 45),
    new Move('Garra Dragón', 60),
];

// Creamos los Pokémon
const pokemons = [
    new Pokemon('Charizard', Type.FUEGO, 150, 80, 60, [movimientos[4], movimientos[9]]),
    new Pokemon('Blastoise', Type.AGUA, 160, 75, 70, [movimientos[1], movimientos[9]]),
    new Pokemon('Venusaur', Type.PLANTA, 155, 78, 65, [movimientos[2], movimientos[7]]),
    new Pokemon('Pikachu', Type.ELECTRICO, 120, 70, 50, [movimientos[0], movimientos[4]]),
    new Pokemon('Gyarados', Type.AGUA, 180, 85, 65, [movimientos[9], movimientos[5]]),
    new Pokemon('Onix', Type.TIERRA, 170, 60, 80, [movimientos[6], movimientos[3]]),
    new Pokemon('Arcanine', Type.FUEGO, 170, 90, 60, [movimientos[8], movimientos[0]]),
    new Pokemon('Zapdos', Type.ELECTRICO, 140, 85, 70, [movimientos[4], movimientos[5]]),
];

// Función para seleccionar un Pokémon al azar
function seleccionarPokemon() {
    return pokemons[Math.floor(Math.random() * pokemons.length)];
}

// Función para iniciar la batalla
function batalla(jugador, maquina) {
    console.log(`Empieza ${jugador.nombre} contra ${maquina.nombre}`);

    while (jugador.hpActual > 0 && maquina.hpActual > 0) {
        console.log(`\n${jugador.nombre} tiene ${jugador.hpActual} de vida.`);
        console.log(`${maquina.nombre} tiene ${maquina.hpActual} de vida.`);

        // Turno del jugador
        console.log('¿Qué quieres hacer?');
        console.log('1. Atacar');
        console.log('2. Curar');

        const opcion = readlineSync.questionInt();
        switch (opcion) {
            case 1:
                console.log('¿Qué ataque quieres hacer?');
                jugador.moves.forEach((mov, index) => console.log(`${index}: ${mov.nombreMove}`));
                const opcionAtaque = readlineSync.questionInt();
                if (opcionAtaque >= 0 && opcionAtaque < jugador.moves.length) {
                    jugador.atacar(jugador.moves[opcionAtaque], maquina);
                } else {
                    console.log('Opción no válida.');
                }
                break;
            case 2:
                jugador.heal();
                break;
            default:
                console.log('Opción no válida.');
                break;
        }

        if (maquina.hpActual <= 0) {
            console.log(`${maquina.nombre} ha sido derrotado. ¡${jugador.nombre} gana!`);
            break;
        }

        // Turno de la máquina
        const decisionMaquina = Math.floor(Math.random() * 2);
        if (decisionMaquina === 0) {
            maquina.heal();
        } else {
            const moveMaquina = Math.floor(Math.random() * maquina.moves.length);
            maquina.atacar(maquina.moves[moveMaquina], jugador);
        }

        if (jugador.hpActual <= 0) {
            console.log(`${jugador.nombre} ha sido derrotado. ¡${maquina.nombre} gana!`);
        }
    }
}

// Seleccionamos los Pokémon y empezamos la batalla
const jugador = seleccionarPokemon();
const maquina = seleccionarPokemon();
batalla(jugador, maquina);
