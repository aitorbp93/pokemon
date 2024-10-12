// Importa los módulos necesarios
const readlineSync = require('readline-sync');
const Pokemon = require('./pokemon');
const Move = require('./move');
const Type = require('./type');

// Define los movimientos que pueden usar los Pokémon
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

// Define los Pokémon que participarán en la batalla
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

// Selecciona un Pokémon aleatorio de la lista
function seleccionarPokemon() {
    return pokemons[Math.floor(Math.random() * pokemons.length)];
}

// Controla la lógica de la batalla entre el jugador y la máquina
function batalla(jugador, maquina) {
    console.log(`Empieza la batalla: ${jugador.nombre} contra ${maquina.nombre}`);

    // Bucle que sigue hasta que uno de los Pokémon pierda toda su vida
    while (jugador.hpActual > 0 && maquina.hpActual > 0) {
        // Muestra la vida actual de ambos Pokémon
        console.log(`\n${jugador.nombre} tiene ${jugador.hpActual} de vida.`);
        console.log(`${maquina.nombre} tiene ${maquina.hpActual} de vida.`);

        // Opciones del jugador: atacar o curar
        console.log('¿Qué quieres hacer?');
        console.log('1. Atacar');
        console.log('2. Curar');

        // Lee la opción del jugador y ejecuta la acción correspondiente
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

        // Verifica si el Pokémon de la máquina ha sido derrotado
        if (maquina.hpActual <= 0) {
            console.log(`${maquina.nombre} ha sido derrotado. ¡${jugador.nombre} gana!`);
            break;
        }

        // Turno de la máquina: decide entre atacar o curarse
        const decisionMaquina = Math.floor(Math.random() * 2); // 0 para curar, 1 para atacar
        if (decisionMaquina === 0) {
            maquina.heal();
        } else {
            const moveMaquina = Math.floor(Math.random() * maquina.moves.length);
            maquina.atacar(maquina.moves[moveMaquina], jugador);
        }

        // Verifica si el Pokémon del jugador ha sido derrotado
        if (jugador.hpActual <= 0) {
            console.log(`${jugador.nombre} ha sido derrotado. ¡${maquina.nombre} gana!`);
        }
    }
}

// Selecciona un Pokémon aleatorio para el jugador y otro para la máquina
const jugador = seleccionarPokemon();
const maquina = seleccionarPokemon();

// Inicia la batalla entre el Pokémon del jugador y el de la máquina
batalla(jugador, maquina);
