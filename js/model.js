// --- MODELO (Model) ---
// Contiene todos los datos y la lógica pura del juego.

const questionsData = {
    rompehielos: { 
        truths: [
            "Si pudieras tener un superpoder, ¿cuál sería y por qué?", "Cuál es la comida más rara que has probado?", "Si pudieras cenar con cualquier personaje histórico, ¿quién sería?", "¿Cuál fue el último concierto al que fuiste?", "¿Qué es lo primero que harías si ganaras la lotería?", "¿Tienes algún talento oculto o inútil?", "¿Cuál es la película que puedes ver mil veces sin aburrirte?", "Si tu vida fuera una canción, ¿cuál sería el título?", "¿Cuál es tu lugar favorito del mundo al que has viajado?", "¿Qué personaje de ficción crees que se parece más a ti?", "¿Cuál es el mejor consejo que te han dado?", "Si pudieras hablar con los animales, ¿qué le preguntarías a tu mascota?", "¿Cuál es tu 'placer culposo' en cuanto a música o TV?", "Describe tu día perfecto de principio a fin.", "¿Qué es algo que te apasione y de lo que podrías hablar durante horas?", "¿Cuál es el sueño más extraño que recuerdes haber tenido?", "Si pudieras eliminar una palabra del diccionario, ¿cuál sería?", "¿Qué habilidad te gustaría aprender si tuvieras tiempo infinito?", "¿Cuál es el objeto más preciado que posees y por qué?", "Si fueras un sabor de helado, ¿cuál serías?",
            "¿Cuál es la aplicación de tu móvil que más usas?", "Si solo pudieras comer una cosa por el resto de tu vida, ¿qué sería?", "¿Cuál es tu recuerdo más feliz de la infancia?", "¿Qué es algo que siempre te hace reír sin importar qué?", "Si pudieras ser un experto instantáneo en cualquier campo, ¿cuál elegirías?", "¿Crees en fantasmas o en lo paranormal? ¿Has tenido alguna experiencia?", "¿Cuál es el trabajo de tus sueños?", "Si pudieras diseñar una atracción de un parque temático, ¿cómo sería?", "¿Qué es algo que la mayoría de la gente no sabe sobre ti?", "¿Prefieres la playa o la montaña? ¿Por qué?", "¿Cuál es tu serie favorita de todos los tiempos?", "¿Qué es lo que más te gusta de tu personalidad?", "Si pudieras tener cualquier coche, ¿cuál sería?", "¿Cuál es la cosa más loca que has comprado por internet?", "¿Qué es algo que te pone nervioso/a?", "Si fueras famoso/a, ¿por qué sería?", "¿Qué es algo que coleccionas o te gustaría coleccionar?", "¿Cuál es tu estación del año favorita?", "¿Qué es lo más aventurero que has hecho?", "Si pudieras aprender a tocar un instrumento, ¿cuál sería?",
            "¿Cuál es tu cita o frase favorita?", "¿Qué es algo que te da esperanza en el mundo?", "¿Qué es lo que más valoras en una amistad?", "Si tuvieras que describir tu sentido del humor, ¿cómo sería?", "¿Cuál es el mejor cumplido que has recibido?", "¿Qué es algo que te gustaría que se inventara en el futuro?", "¿Cuál es tu animal espiritual?", "¿Qué es algo que te gustaría cambiar de ti mismo/a?", "Si pudieras viajar en el tiempo, ¿irías al pasado o al futuro?", "¿Qué es lo que más esperas de este año?"
        ], 
        dares: [
            "Describe tu película favorita usando solo emojis y que el resto lo adivine.", "Habla por un minuto sobre tu hobby sin usar la letra 'a'.", "Encuentra el objeto más azul en la habitación y preséntalo como si fuera un trofeo.", "Haz tu mejor imitación de un robot que se está quedando sin batería.", "Crea un rap corto sobre lo que has comido hoy.", "Intenta hacer malabares con tres objetos (que no se rompan).", "Camina como un cangrejo de un lado a otro de la habitación.", "Ponte los zapatos en las manos y úsalos como guantes por una ronda.", "Haz una personificación dramática del pronóstico del tiempo.", "Intenta lamerte el codo.", "Construye una torre con los objetos que tengas a tu alcance.", "Haz tu mejor grito de Tarzán.", "Habla con voz de ópera durante tu próximo turno.", "Haz una reverencia muy elaborada a cada persona en la sala.", "Intenta ponerte un calcetín sin usar las manos.", "Narra la acción de la persona a tu derecha como si fuera un documental de naturaleza.", "Dile un piropo cursi a la pared.", "Haz el baile del 'robot' durante 30 segundos.", "Presenta el objeto a tu izquierda como si fuera un producto de teletienda.", "Haz tu mejor risa malvada.",
            "Intenta dibujar un círculo perfecto con tu mano no dominante.", "Hazle cosquillas a la persona a tu derecha durante 15 segundos.", "Canta el estribillo de la canción infantil que más recuerdes.", "Haz una imitación de tu emoji favorito.", "Intenta mantener el equilibrio sobre un pie con los ojos cerrados durante 30 segundos.", "Propón un brindis muy solemne por el objeto más insignificante de la mesa.", "Intenta hacer reír a la persona más seria del grupo. Tienes un minuto.", "Lee el último mensaje de texto que recibiste en voz alta.", "Haz diez saltos de tijera mientras cantas tu canción favorita.", "Habla como Yoda hasta tu próximo turno ('El reto cumplir debo')."
        ] 
    },
    classic: { 
        truths: [
            "¿Cuál es la cosa más vergonzosa que te ha pasado en una cita?", "¿Cuál es tu placer culposo que muy poca gente sabe?", "¿Cuál fue la última mentira que dijiste y por qué?", "¿Alguna vez has espiado el teléfono de alguien?", "Si tuvieras que salir con alguien de esta sala, ¿quién sería?", "¿Qué es lo más infantil que todavía haces?", "¿Alguna vez te han pillado haciendo algo que no debías?", "¿Cuál es el rumor más loco que has escuchado sobre ti?", "Describe tu primera borrachera.", "¿Te has hecho pasar por enfermo para no ir a trabajar o estudiar?", "¿Qué es lo más raro que has comido por un reto?", "¿Alguna vez has llorado en el cine? ¿Con qué película?", "¿Cuál es la excusa más patética que has usado para cancelar un plan?", "Si pudieras intercambiar tu vida con la de alguien en esta sala, ¿quién sería?", "¿Cuál es tu mayor miedo irracional?", "¿Alguna vez te ha gustado la pareja de un amigo/a?", "¿Qué es lo que más te molesta de la persona a tu izquierda?", "¿Has devuelto algo a una tienda después de haberlo usado?", "¿Cuál es tu apodo más vergonzoso?", "¿Qué es algo que finges que te gusta para encajar?",
            "¿Alguna vez te has meado en una piscina siendo adulto?", "¿Cuál es el regalo más feo que has recibido y has fingido que te encantaba?", "¿Has tenido alguna vez un sueño erótico con alguien presente?", "¿Qué es lo más vergonzoso que tus padres te han pillado haciendo?", "Si tuvieras que borrar una red social para siempre, ¿cuál sería?", "¿Alguna vez has culpado a alguien por algo que tú hiciste?", "¿Qué es lo más estúpido por lo que has discutido con una pareja?", "¿Revisas el perfil de tu ex en redes sociales?", "¿Cuál es tu 'Guilty Pleasure' musical?", "¿Te has comido algo que se te cayó al suelo aplicando la 'regla de los 5 segundos'?"
        ], 
        dares: [
            "Habla con un acento extraño durante las próximas 3 rondas.", "Imita a alguien del grupo hasta que adivinen quién es.", "Publica 'echo de menos a mi ex' en tus redes sociales y bórralo en 5 minutos.", "Deja que el grupo revise tu historial de búsqueda de Google por un minuto.", "Llama a un contacto al azar de tu teléfono y cántale 'Feliz Cumpleaños'.", "Haz tu mejor paso de baile erótico en el centro de la sala.", "Intercambia una prenda de ropa con la persona de tu derecha.", "Deja que alguien te dibuje un bigote con un marcador (que se pueda borrar).", "Haz una llamada en broma a una pizzería.", "Cuenta un chiste. Si nadie se ríe, tomas un shot.", "Ponte de rodillas y pídele matrimonio al objeto más cercano.", "Intenta hacer twerking durante 30 segundos.", "Huele la axila de la persona a tu derecha y describe el olor.", "Haz una serenata dramática a otro jugador usando una canción de reguetón.", "Deja que el grupo te peine de la forma más ridícula posible.", "Come una cucharada de un condimento extraño de la nevera.", "Corre alrededor de la casa a cuatro patas mientras ladras como un perro.", "Haz una declaración de amor a la persona que menos te atrae del grupo.", "Intenta ponerte los pantalones sin usar las manos.", "Deja que el grupo te maquille como quiera."
        ] 
    },
    sinfiltro: { 
        truths: [
            { text: "¿Cuál es el lugar más atrevido donde has tenido relaciones?", isFuego: false },
            { text: "Describe tu fantasía sexual más recurrente.", isFuego: false },
            { text: "¿Cuál es la parte del cuerpo que te parece más atractiva en el sexo opuesto?", isFuego: false },
            { text: "¿Qué es lo más pervertido que has buscado en internet?", isFuego: false },
            { text: "¿Has estado en un trío?", isFuego: false },
            { text: "Describe tu peor experiencia en la cama.", isFuego: false },
            { text: "¿Cuál es el número de personas con las que te has acostado?", isFuego: false },
            { text: "¿Qué es algo que te excita instantáneamente?", isFuego: false },
            { text: "¿Alguna vez te has grabado o te han grabado durante el sexo?", isFuego: false },
            { text: "¿Qué opinas del sexo en la primera cita?", isFuego: false },
            { text: "¿Con quién de los presentes tendrías una aventura de una noche?", isFuego: true },
            { text: "¿Has fingido un orgasmo? ¿Con quién?", isFuego: true },
            { text: "¿Quién de la sala crees que es mejor en la cama?", isFuego: true },
            { text: "¿Te has acostado con la ex pareja de un amigo/a?", isFuego: true },
            { text: "¿Alguna vez te han pillado masturbándote?", isFuego: true },
            { text: "Si tuvieras que calificar tus habilidades como amante del 1 al 10, ¿qué nota te pondrías?", isFuego: true },
            { text: "¿Has tenido sexo con alguien sin saber su nombre?", isFuego: true },
            { text: "¿Qué es lo más vergonzoso que te ha pasado durante el sexo?", isFuego: true },
            { text: "¿Has tenido alguna vez un 'sugar daddy' o 'sugar mommy'?", isFuego: true },
            { text: "Si tuvieras que describir tu vida sexual con un emoji, ¿cuál sería?", isFuego: true }
        ], 
        dares: [
            { text: "Baila de la forma más sexy que puedas durante un minuto para el grupo.", isFuego: false },
            { text: "Susúrrale algo atrevido al oído a la persona a tu izquierda.", isFuego: false },
            { text: "Elige a alguien y dale un masaje de 1 minuto en la parte del cuerpo que elija.", isFuego: false },
            { text: "Haz una pole dance imaginaria usando una escoba o una silla.", isFuego: false },
            { text: "Chúpale el dedo a la persona que te parezca más atractiva del grupo.", isFuego: false },
            { text: "Siéntate en el regazo de alguien hasta tu próximo turno.", isFuego: false },
            { text: "Muerde suavemente el lóbulo de la oreja de la persona a tu derecha.", isFuego: false },
            { text: "Elige a alguien para que te dé una nalgada.", isFuego: false },
            { text: "Huele el cuello de cada jugador y adivina qué perfume o loción llevan.", isFuego: false },
            { text: "Dale de comer algo a alguien en la boca de forma sensual.", isFuego: false },
            { text: "Dale un beso francés de 20 segundos a la persona que elijas.", isFuego: true },
            { text: "Quítate una prenda de ropa y juégala en la siguiente ronda.", isFuego: true },
            { text: "Hazle un 'lap dance' de 30 segundos a alguien del grupo.", isFuego: true },
            { text: "Elige a dos personas del grupo para que se den un beso (pico).", isFuego: true },
            { text: "Métete un cubito de hielo en la ropa interior y espera a que se derrita.", isFuego: true },
            { text: "Elige a una persona y quítale una prenda de ropa con la boca.", isFuego: true },
            { text: "Hazle un 'body shot' a alguien (sal, tequila/shot, limón).", isFuego: true },
            { text: "Quítate los pantalones y juega sin ellos durante 2 rondas.", isFuego: true },
            { text: "Haz un 'striptease' con una canción que elija el grupo.", isFuego: true },
            { text: "Deja que alguien te haga una marca de amor (chupetón) en el cuello.", isFuego: true }
        ] 
    },
    prohibido: { 
        truths: [
            { text: "¿Has espiado a alguien mientras se cambiaba o se duchaba?", isFuego: false },
            { text: "¿Cuál es la parte de tu propio cuerpo que más te excita?", isFuego: false },
            { text: "Si tuvieras que hacer un trío con dos personas de esta sala, ¿a quiénes elegirías?", isFuego: false },
            { text: "¿Has tenido sexo con más de una persona en un periodo de 24 horas?", isFuego: false },
            { text: "¿Has tenido alguna vez una fantasía con alguien del mismo sexo? Describe la fantasía.", isFuego: false },
            { text: "¿Has robado ropa interior a alguien?", isFuego: false },
            { text: "¿Qué es lo más extraño que te han dicho o te han pedido durante el sexo?", isFuego: false },
            { text: "¿Has usado alguna vez la posición o el dinero para tener una ventaja sexual?", isFuego: false },
            { text: "¿Has tenido alguna experiencia sexual que se podría considerar ilegal o peligrosa?", isFuego: false },
            { text: "¿Has pagado por sexo?", isFuego: false },
            { text: "Describe con detalle el cuerpo desnudo de la persona que más te atrae en esta sala.", isFuego: true },
            { text: "¿Cuál es el secreto de otro jugador que sabes que, si lo revelaras, cambiaría la dinámica del grupo?", isFuego: true },
            { text: "Muestra el historial de búsqueda de tu web de porno preferida.", isFuego: true },
            { text: "Si tuvieras que acostarte con una persona de esta sala para salvar tu propia vida, ¿a quién elegirías?", isFuego: true },
            { text: "¿Has tenido sexo con alguien que tuviera pareja?", isFuego: true },
            { text: "Muestra la conversación más caliente que tengas en tu móvil.", isFuego: true },
            { text: "¿Qué es lo más degradante que has hecho por placer?", isFuego: true },
            { text: "¿Cuál es la fantasía más tabú que tienes involucrando a alguien del grupo?", isFuego: true },
            { text: "Describe la última vez que te masturbaste: dónde estabas, en qué pensabas.", isFuego: true },
            { text: "¿Alguna vez has tenido un orgasmo pensando en alguien que no debías? ¿Quién era?", isFuego: true }
        ], 
        dares: [
            { text: "Siéntate en el regazo de la persona que te parezca más atractiva y dale un masaje en los hombros durante un minuto.", isFuego: false },
            { text: "Haz un 'body shot': alguien pone sal en tu cuello, bebe un shot de tu ombligo y chupa una rodaja de limón de tu boca.", isFuego: false },
            { text: "Elige a una persona. Ambos deben quitarse una prenda de ropa y ponérsela al otro.", isFuego: false },
            { text: "Besa a la persona de tu izquierda. El beso debe empezar en la mejilla y bajar hasta la clavícula.", isFuego: false },
            { text: "Elige a una persona. Tienes que quitarle los zapatos y los calcetines y masajearle los pies durante un minuto.", isFuego: false },
            { text: "Quítate la camiseta y deja que alguien dibuje algo en tu espalda con su dedo. Tienes que adivinar qué es.", isFuego: false },
            { text: "Elige a alguien. Tienen que darse de comer el uno al otro un trozo de fruta de la forma más erótica posible.", isFuego: false },
            { text: "Siéntate en el suelo. La persona a tu derecha tiene que pasar por encima de ti muy lentamente.", isFuego: false },
            { text: "Elige a alguien y dale un beso con los ojos vendados. El grupo te guiará hasta esa persona.", isFuego: false },
            { text: "Elige a la persona que peor te caiga del grupo y dale un beso en la boca.", isFuego: false },
            { text: "Intercambia una prenda de ropa interior con la persona de enfrente. Deben usarla por el resto del juego.", isFuego: true },
            { text: "Realiza un striptease corto (1 minuto) para el grupo hasta quedarte en ropa interior.", isFuego: true },
            { text: "Elige a un jugador. Tienes permiso para tocar sus genitales por encima de la ropa durante 20 segundos.", isFuego: true },
            { text: "Dale un beso francés a cada persona en la sala.", isFuego: true },
            { text: "Deja que el grupo te vende los ojos y te dé besos en el cuello. Tienes que adivinar quién fue.", isFuego: true },
            { text: "Quítate la ropa hasta quedar en ropa interior. Debes jugar así hasta tu próximo turno.", isFuego: true },
            { text: "Elige a dos jugadores. Deben meterse juntos en un armario o un espacio pequeño durante 3 minutos.", isFuego: true },
            { text: "Dale una lamida al cuello de cada jugador presente.", isFuego: true },
            { text: "Elige a una persona. Tienen que tener sexo (si ambos estáis de acuerdo).", isFuego: true },
            { text: "Deja que la persona a tu derecha te dé una nalgada fuerte. Tú eliges la mejilla.", isFuego: true }
        ] 
    }
};

const generalCards = [
    { type: 'wildcard', title: "El Imitador", description: "Elige a alguien y debes imitarlo durante 3 rondas. Si fallas, bebes." }, { type: 'wildcard', title: "Cascada", description: "¡Todos a beber! Empiezas tú y nadie para hasta que tú lo hagas." }, { type: 'wildcard', title: "Rey del Pulgar", description: "Eres el 'Thumb Master'. Pon tu pulgar en la mesa en cualquier momento. El último en copiarte, bebe." }, { type: 'bomb', title: "Shot en Cadena", description: "Tomas 1 shot puro. Luego, eliges a otro para que tome 2." }, { type: 'bomb', title: "Muro de la Vergüenza", description: "El grupo escribe un estado vergonzoso para que lo publiques en tus redes." }, { type: 'bomb', title: "El Exiliado", description: "No puedes hablar ni reír durante la próxima ronda. Si lo haces, bebes." }
];

const prohibitedCards = [
    { type: 'wildcard', title: "Círculo del Beso", description: "Empiezas tú, besas a la persona de tu derecha, y así sucesivamente. El último beso, de vuelta a ti, es con lengua." }, { type: 'wildcard', title: "Siete Minutos: Ropa Opcional", description: "Elige a alguien. Vayan a un cuarto por 7 minutos. Al menos una prenda principal debe ser retirada por cada uno." }, { type: 'wildcard', title: "Rey/Reina de la Noche", description: "Tienes el poder. Da UNA orden del Modo Prohibido a CUALQUIER jugador. No se puede negar." }, { type: 'bomb', title: "Confesión Forzada", description: "Entrega tu teléfono. El grupo tiene 3 minutos para leer en voz alta cualquier conversación que elijan." }, { type: 'bomb', title: "Ruleta de Ropa Interior", description: "Debes quitarte la ropa interior y dársela a la persona de tu izquierda. No la recuperas hasta el final." }, { type: 'bomb', title: "El Reto Definitivo", description: "El jugador anterior inventa un reto extremo para ti. No puedes negarte." }
];

const finalBombGeneral = {
    title: "El Camino del Campeón 🏆",
    description: "Para ganar, debes superar 3 mini-retos diseñados por los demás jugadores. Si fallas uno, pierdes 3 puntos y el juego continúa."
};

const finalBombProhibido = {
    title: "El Peaje del Placer 😈",
    description: "Para ganar, debes elegir una de dos opciones. Si te niegas a ambas, pierdes la mitad de tus puntos.",
    options: {
        a: "Opción A: La Ofrenda (Dar placer)",
        b: "Opción B: La Sumisión (Recibir placer)"
    }
};

const gameState = {
    mode: 'classic', players: [], turnOrder: [], currentPlayerIndex: 0, isCompetitive: false,
    activeQuestions: { truth: [], dare: [] }, skipTurn: false, currentChallenge: null
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
    gameState.activeQuestions.truth = [...truths];
    gameState.activeQuestions.dare = [...dares];
    _shuffleArray(gameState.activeQuestions.truth);
    _shuffleArray(gameState.activeQuestions.dare);
}

export function setMode(newMode) { gameState.mode = newMode; }
export function setCompetitive(isCompetitive) { gameState.isCompetitive = isCompetitive; }
export function addPlayer(name, gender) {
    if (name && !gameState.players.find(p => p.name === name)) {
        gameState.players.push({ name, gender, drinks: 0, points: 0 });
        return true;
    }
    return false;
}
export function removePlayer(name) { gameState.players = gameState.players.filter(p => p.name !== name); }
export function prepareGame() {
    gameState.turnOrder = [...gameState.players];
    _shuffleArray(gameState.turnOrder);
    _reloadQuestions();
}
export function nextPlayer() { 
    gameState.currentChallenge = null;
    gameState.currentPlayerIndex = (gameState.currentPlayerIndex + 1) % gameState.turnOrder.length; 
}
export function getQuestion(type) {
    let pool = gameState.activeQuestions[type];
    if (pool.length === 0) {
        _reloadQuestions();
        pool = gameState.activeQuestions[type];
    }
    const challenge = pool.pop();
    gameState.currentChallenge = challenge;
    return challenge;
}
export function triggerCard() {
    let pool = gameState.mode === 'prohibido' ? [...generalCards, ...prohibitedCards] : generalCards;
    const card = pool[Math.floor(Math.random() * pool.length)];
    if(card.effect) card.effect(gameState);
    return card;
}
export function getFinalBomb() {
    if (gameState.isCompetitive) {
        const player = gameState.turnOrder[gameState.currentPlayerIndex];
        if (player.points >= 18) {
            if (Math.random() < 0.75) {
                return gameState.mode === 'prohibido' ? finalBombProhibido : finalBombGeneral;
            }
        }
    }
    return null;
}
export function addDrinkToCurrentPlayer() {
    const player = gameState.turnOrder[gameState.currentPlayerIndex];
    if (player) player.drinks++;
}
export function updatePointsForCurrentPlayer(wasSuccessful) {
    const player = gameState.turnOrder[gameState.currentPlayerIndex];
    if (player && wasSuccessful) {
        player.points += gameState.currentChallenge?.isFuego ? 4 : 2;
    }
}
export function getSkipPunishment() {
    const isFuego = gameState.currentChallenge?.isFuego || false;
    switch (gameState.mode) {
        case 'sinfiltro': 
            return isFuego ? "Debes tomar 4 SHOTS PUROS." : "Debes tomar 2 SHOTS PUROS.";
        case 'prohibido': 
            return isFuego ? "El grupo elige un reto de la lista que DEBES CUMPLIR." : "Debes tomar 3 SHOTS PUROS.";
        default: 
            return "Debes tomar 1 SHOT PURO.";
    }
}
export function reset() {
    Object.assign(gameState, {
        mode: 'classic', players: [], turnOrder: [], currentPlayerIndex: 0, isCompetitive: false,
        activeQuestions: { truth: [], dare: [] }, skipTurn: false, currentChallenge: null
    });
}
export function calculateStats() {
    if (gameState.turnOrder.length === 0) {
        return { winner: {name: 'Nadie', points: 0}, loser: {name: 'Nadie', points: 0}, drunkard: {name: 'Nadie', drinks: 0} };
    }
    const winner = [...gameState.turnOrder].sort((a, b) => b.points - a.points)[0];
    const loser = [...gameState.turnOrder].sort((a, b) => a.points - b.points)[0];
    const drunkard = [...gameState.turnOrder].sort((a, b) => b.drinks - a.drinks)[0];
    
    return { winner, loser, drunkard };
}

export default gameState;