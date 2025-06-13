// --- MODELO (Model) ---
// Gestiona todos los datos y la lógica del juego.

const questionsData = {
    classic: { truths: ["¿Cuál es la cosa más vergonzosa que te ha pasado?", "¿Si pudieras ser invisible, qué harías?", "¿Cuál es tu placer culposo?"], dares: ["Llama a un contacto al azar y cántale 'Feliz Cumpleaños'.", "Habla con un acento extraño durante 3 rondas.", "Haz tu mejor imitación de alguien en la habitación."] },
    hot: { truths: ["¿Cuál es tu fantasía más secreta?", "¿Con quién de los presentes tendrías una aventura?", "¿Cuál es el lugar más atrevido donde lo has hecho?"], dares: ["Besa en el cuello a la persona de tu derecha.", "Quítate una prenda de ropa.", "Baila de la forma más sexy que puedas por un minuto."] },
    extreme: { truths: ["¿Cuál es el secreto más oscuro que nunca le has contado a nadie aquí?", "¿Qué es lo más ilegal que has hecho?", "Describe tu peor experiencia en la cama."], dares: ["Lame una parte del cuerpo de la persona a tu izquierda.", "Intercambia una prenda de ropa interior con alguien.", "Dale un beso francés de 20 segundos a la persona que el grupo elija para ti."] }
};
const wildcardsData = [
    { title: "Bebida para Todos", description: "¡Salud! Todos los jugadores deben tomar un trago.", effect: (game) => game.turnOrder.forEach(p => p.drinks++), modes: ['all'] },
    { title: "El Dedo Acusador", description: "Elige a alguien para que tome dos tragos. ¡El grupo decide!", effect: () => {}, modes: ['all'] },
    { title: "Salto de Turno", description: "¡Te salvaste! Pasas tu turno.", effect: (game) => { game.skipTurn = true; }, modes: ['all'] }
];

const gameState = {
    mode: 'classic', players: [], turnOrder: [], currentPlayerIndex: 0, isCompetitive: false,
    customTruths: [], customDares: [], activeQuestions: { truth: [], dare: [] }, skipTurn: false
};

function _shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function _reloadQuestions() {
    const truths = questionsData[gameState.mode]?.truths || [];
    const dares = questionsData[gameState.mode]?.dares || [];
    gameState.activeQuestions.truth = [...truths, ...gameState.customTruths];
    gameState.activeQuestions.dare = [...dares, ...gameState.customDares];
    _shuffleArray(gameState.activeQuestions.truth);
    _shuffleArray(gameState.activeQuestions.dare);
}

export function setMode(newMode) { gameState.mode = newMode; }
export function setCompetitive(isCompetitive) { gameState.isCompetitive = isCompetitive; }
export function addPlayer(name, gender) {
    if (name && !gameState.players.find(p => p.name === name)) {
        gameState.players.push({ name, gender, drinks: 0, points: 0, team: null });
        return true;
    }
    return false;
}
export function addTeamPlayer(name, team) {
    if (name && !gameState.players.find(p => p.name === name)) {
        const gender = team === 'boys' ? 'male' : 'female';
        gameState.players.push({ name, gender, drinks: 0, points: 0, team });
        return true;
    }
    return false;
}
export function removePlayer(name) { gameState.players = gameState.players.filter(p => p.name !== name); }
export function addCustomQuestion(type, text) {
    if (type === 'truth') gameState.customTruths.push(text);
    else gameState.customDares.push(text);
}
export function prepareGame() {
    if (gameState.mode === 'teams') {
        const boys = gameState.players.filter(p => p.team === 'boys');
        const girls = gameState.players.filter(p => p.team === 'girls');
        _shuffleArray(boys); _shuffleArray(girls);
        gameState.turnOrder = [];
        let i = 0;
        while (i < boys.length || i < girls.length) {
            if (i < boys.length) gameState.turnOrder.push(boys[i]);
            if (i < girls.length) gameState.turnOrder.push(girls[i]);
            i++;
        }
    } else {
        gameState.turnOrder = [...gameState.players];
        _shuffleArray(gameState.turnOrder);
    }
    _reloadQuestions();
}
export function nextPlayer() { gameState.currentPlayerIndex = (gameState.currentPlayerIndex + 1) % gameState.turnOrder.length; }
export function getQuestion(type) {
    let pool = gameState.activeQuestions[type];
    if (pool.length === 0) {
        _reloadQuestions();
        pool = gameState.activeQuestions[type];
    }
    return pool.pop();
}
export function triggerWildcard() {
    const available = wildcardsData.filter(w => w.modes.includes('all') || w.modes.includes(gameState.mode));
    const card = available[Math.floor(Math.random() * available.length)];
    card.effect(gameState);
    return card;
}
export function addDrinkToCurrentPlayer() {
    const player = gameState.turnOrder[gameState.currentPlayerIndex];
    if (player) player.drinks++;
}
export function updatePointsForCurrentPlayer(wasSuccessful) {
    const player = gameState.turnOrder[gameState.currentPlayerIndex];
    if (player && wasSuccessful) player.points += 2;
}
export function reset() {
    Object.assign(gameState, {
        mode: 'classic', players: [], turnOrder: [], currentPlayerIndex: 0, isCompetitive: false,
        customTruths: [], customDares: [], activeQuestions: { truth: [], dare: [] }, skipTurn: false
    });
}

export default gameState;
