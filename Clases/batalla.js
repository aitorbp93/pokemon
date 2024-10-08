// Importamos las clases
const readlineSync = require('readline-sync');
const pokemon = require('./pokemon');
const move = require('./move');
const type = require('./type');

// Creamos los movimientos
const movimiento1 = new move('Trueno', 50);
const movimiento2 = new move('Tornado', 40);
const movimiento3 = new move('Golpe Roca', 35);
const movimiento4 = new move('Látigo Cepa', 30);
const movimiento5 = new move('Lanzallamas', 45);
const movimiento6 = new move('Surf', 50);
const movimiento7 = new move('Golpe Karate', 35);
const movimiento8 = new move('Cuerpo Afilado', 30);
const movimiento9 = new move('Bola Sombra', 40);
const movimiento10 = new move('Puño Fuego', 45);
const movimiento11 = new move('Puño Hielo', 45);
const movimiento12 = new move('Colmillo Rayo', 50);
const movimiento13 = new move('Terremoto', 60);
const movimiento14 = new move('Onda Trueno', 25);
const movimiento15 = new move('Ventisca', 55);
const movimiento16 = new move('Puño Trueno', 45);
const movimiento17 = new move('Garra Dragón', 60);

// Creamos los Pokémon
const pokemons = [
    new pokemon('Charizard', type.FUEGO, 150, 80, 60, [movimiento5, movimiento10]),
    new pokemon('Blastoise', type.AGUA, 160, 75, 70, [movimiento2, movimiento10]),
    new pokemon('Venusaur', type.PLANTA, 155, 78, 65, [movimiento3, movimiento8]),
    new pokemon('Pikachu', type.ELECTRICO, 120, 70, 50, [movimiento4, movimiento5]),
    new pokemon('Gyarados', type.AGUA, 180, 85, 65, [movimiento10, movimiento6]),
    new pokemon('Onix', type.TIERRA, 170, 60, 80, [movimiento7, movimiento4]),
    new pokemon('Arcanine', type.FUEGO, 170, 90, 60, [movimiento9, movimiento1]),
    new pokemon('Zapdos', type.ELECTRICO, 140, 85, 70, [movimiento5, movimiento6]),
];

// Función para seleccionar un Pokémon al azar
function seleccionarPokemon() {
    const pokemonAzar = pokemons[Math.floor(Math.random() * pokemons.length)];
    return pokemonAzar;
}

// Función para empezar la partida
function batalla(jugador, maquina) {
    console.log(`Empieza ${jugador.nombre} contra ${maquina.nombre}`);

    do  {
        console.log(`${jugador.nombre} tiene ${jugador.hpActual} de vida`);
        console.log(`${maquina.nombre} tiene ${maquina.hpActual} de vida`);

        // Turno del jugador
        console.log('¿Qué quieres hacer?');
        console.log('1. Atacar');
        console.log('2. Curar');

        const opcion = readlineSync.questionInt();
        switch (opcion) {
            case 1:  console.log('¿Qué ataque quieres hacer?');
            console.log('Movimientos disponibles:');
            console.log('0:', jugador.moves[0]);
            console.log('1:', jugador.moves[1]);
            const opcionAtaque = readlineSync.questionInt();

            if (opcionAtaque === 0 || opcionAtaque === 1) {
                jugador.atacar(jugador.moves[opcionAtaque], maquina);
            } else {
                console.log('Opción no válida.');
            }
            case 2: console.log('Curando ');
            jugador.heal();
            break;
            default: console.log('Opción no válida.');
            break;
        }
       

        // Verificamos si la máquina ha sido derrotada
        if (maquina.hpActual <= 0) {
            console.log(`${maquina.nombre} ha sido derrotado. ¡${jugador.nombre} gana!`);
            break;
        }

        // Turno de la máquina
        console.log(`Turno de ${maquina.nombre}`);

        // Cambios: Decisión aleatoria de la máquina para curarse o atacar
        const decisionMaquina = Math.floor(Math.random() * 2); // 0 para curarse, 1 para atacar

        if (decisionMaquina === 0) {
            // Si la decisión es 0, la máquina se cura
            maquina.heal();
            console.log(`${maquina.nombre} ha decidido curarse.`);
        } else {
            // Si la decisión es 1, la máquina ataca
            const moveMaquina = Math.floor(Math.random() * maquina.moves.length);
            maquina.atacar(maquina.moves[moveMaquina], jugador);
            console.log(`${maquina.nombre} usa ${maquina.moves[moveMaquina].nombre}.`);
        }

        // Verificamos si el jugador ha sido derrotado
        if (jugador.hpActual <= 0) {
            console.log(`${jugador.nombre} ha sido derrotado. ¡${maquina.nombre} gana!`);
            break;
        }
    }while (!jugador.hpActual <= 0 || maquina.hpActual <= 0)
}

// Seleccionamos los Pokémon de manera aleatoria
const jugador = seleccionarPokemon();
const maquina = seleccionarPokemon();

// Iniciamos la batalla
batalla(jugador, maquina);
