// --- MODELO (Model) ---
// Gestiona todos los datos y la lógica del juego.

const questionsData = {
    rompehielos: { 
        truths: [
            "Si pudieras tener un superpoder, ¿cuál sería y por qué?",
            "¿Cuál es la comida más rara que has probado?",
            "Si pudieras cenar con cualquier personaje histórico, ¿quién sería?",
            "¿Cuál fue el último concierto al que fuiste?",
            "¿Qué es lo primero que harías si ganaras la lotería?",
            "¿Tienes algún talento oculto o inútil?",
            "¿Cuál es la película que puedes ver mil veces sin aburrirte?",
            "Si tu vida fuera una canción, ¿cuál sería el título?",
            "¿Cuál es tu lugar favorito del mundo al que has viajado?",
            "¿Qué personaje de ficción crees que se parece más a ti?",
            "¿Cuál es el mejor consejo que te han dado?",
            "Si pudieras hablar con los animales, ¿qué le preguntarías a tu mascota?",
            "¿Cuál es tu 'placer culposo' en cuanto a música o TV?",
            "Describe tu día perfecto de principio a fin.",
            "¿Qué es algo que te apasione y de lo que podrías hablar durante horas?",
            "¿Cuál es el sueño más extraño que recuerdes haber tenido?",
            "Si pudieras eliminar una palabra del diccionario, ¿cuál sería?",
            "¿Qué habilidad te gustaría aprender si tuvieras tiempo infinito?",
            "¿Cuál es el objeto más preciado que posees y por qué?",
            "Si fueras un sabor de helado, ¿cuál serías?"
        ], 
        dares: [
            "Describe tu película favorita usando solo emojis y que el resto lo adivine.",
            "Habla por un minuto sobre tu hobby sin usar la letra 'a'.",
            "Encuentra el objeto más azul en la habitación y preséntalo como si fuera un trofeo.",
            "Haz tu mejor imitación de un robot que se está quedando sin batería.",
            "Crea un rap corto sobre lo que has comido hoy.",
            "Intenta hacer malabares con tres objetos (que no se rompan).",
            "Camina como un cangrejo de un lado a otro de la habitación.",
            "Ponte los zapatos en las manos y úsalos como guantes por una ronda.",
            "Haz una personificación dramática del pronóstico del tiempo.",
            "Intenta lamerte el codo.",
            "Construye una torre con los objetos que tengas a tu alcance.",
            "Haz tu mejor grito de Tarzán.",
            "Habla con voz de ópera durante tu próximo turno.",
            "Haz una reverencia muy elaborada a cada persona en la sala.",
            "Intenta ponerte un calcetín sin usar las manos.",
            "Narra la acción de la persona a tu derecha como si fuera un documental de naturaleza.",
            "Dile un piropo cursi a la pared.",
            "Haz el baile del 'robot' durante 30 segundos.",
            "Presenta el objeto a tu izquierda como si fuera un producto de teletienda.",
            "Haz tu mejor risa malvada."
        ] 
    },
    classic: { 
        truths: [
            "¿Cuál es la cosa más vergonzosa que te ha pasado en una cita?",
            "¿Cuál es tu placer culposo que muy poca gente sabe?",
            "¿Cuál fue la última mentira que dijiste y por qué?",
            "¿Alguna vez has espiado el teléfono de alguien?",
            "Si tuvieras que salir con alguien de esta sala, ¿quién sería?",
            "¿Qué es lo más infantil que todavía haces?",
            "¿Alguna vez te han pillado haciendo algo que no debías?",
            "¿Cuál es el rumor más loco que has escuchado sobre ti?",
            "Describe tu primera borrachera.",

            "¿Te has hecho pasar por enfermo para no ir a trabajar o estudiar?",
            "¿Qué es lo más raro que has comido por un reto?",
            "¿Alguna vez has llorado en el cine? ¿Con qué película?",
            "¿Cuál es la excusa más patética que has usado para cancelar un plan?",
            "Si pudieras intercambiar tu vida con la de alguien en esta sala, ¿quién sería?",
            "¿Cuál es tu mayor miedo irracional?",
            "¿Alguna vez te ha gustado la pareja de un amigo/a?",
            "¿Qué es lo que más te molesta de la persona a tu izquierda?",
            "¿Has devuelto algo a una tienda después de haberlo usado?",
            "¿Cuál es tu apodo más vergonzoso?",
            "¿Qué es algo que finges que te gusta para encajar?"
        ], 
        dares: [
            "Habla con un acento extraño durante las próximas 3 rondas.",
            "Imita a alguien del grupo hasta que adivinen quién es.",
            "Publica 'echo de menos a mi ex' en tus redes sociales y bórralo en 5 minutos.",
            "Deja que el grupo revise tu historial de búsqueda de Google por un minuto.",
            "Llama a un contacto al azar de tu teléfono y cántale 'Feliz Cumpleaños'.",
            "Haz tu mejor paso de baile erótico en el centro de la sala.",
            "Intercambia una prenda de ropa con la persona de tu derecha.",
            "Deja que alguien te dibuje un bigote con un marcador (que se pueda borrar).",
            "Haz una llamada en broma a una pizzería.",
            "Cuenta un chiste. Si nadie se ríe, tomas un shot.",
            "Ponte de rodillas y pidele matrimonio al objeto más cercano.",
            "Intenta hacer twerking durante 30 segundos.",
            "Huele la axila de la persona a tu derecha y describe el olor.",
            "Haz una serenata dramática a otro jugador usando una canción de reguetón.",
            "Deja que el grupo te peine de la forma más ridícula posible.",
            "Come una cucharada de un condimento extraño de la nevera.",
            "Corre alrededor de la casa a cuatro patas mientras ladras como un perro.",
            "Haz una declaración de amor a la persona que menos te atrae del grupo.",
            "Intenta ponerte los pantalones sin usar las manos.",
            "Deja que el grupo te maquille como quiera."
        ] 
    },
    hot: { 
        truths: [
            "¿Con quién de los presentes tendrías una aventura de una noche?",
            "¿Cuál es el lugar más atrevido donde has tenido relaciones?",
            "Describe tu fantasía sexual más recurrente.",
            "¿Alguna vez has enviado 'nudes'? ¿A quién?",
            "¿Cuál es la parte del cuerpo que te parece más atractiva en el sexo opuesto?",
            "¿Qué es lo más pervertido que has buscado en internet?",
            "¿Has estado en un trío?",
            "Describe tu peor experiencia en la cama.",
            "¿Cuál es el número de personas con las que te has acostado?",
            "¿Has fingido un orgasmo? ¿Con quién?",
            "¿Qué es algo que te excita instantáneamente?",
            "¿Alguna vez te has grabado o te han grabado durante el sexo?",
            "¿Quién de la sala crees que es mejor en la cama?",
            "¿Has tenido un 'crush' con algún profesor o jefe?",
            "¿Cuál es la mentira más grande que le has dicho a una pareja?",
            "¿Has tenido alguna vez un 'amigo con derechos'?",
            "Describe el beso más memorable que has dado o recibido.",
            "¿Qué opinas del sexo en la primera cita?",
            "¿Has usado juguetes sexuales? ¿Cuál es tu favorito?",
            "Si tuvieras un 'pase libre' de una noche con alguien famoso, ¿quién sería?"
        ], 
        dares: [
            "Besa en el cuello a la persona de tu derecha durante 10 segundos.",
            "Quítate una prenda de ropa y juégala en la siguiente ronda.",
            "Baila de la forma más sexy que puedas durante un minuto para el grupo.",
            "Dale un beso francés de 20 segundos a la persona que elijas.",
            "Susúrrale algo atrevido al oído a la persona a tu izquierda.",
            "Elige a alguien y dale un masaje de 1 minuto en la parte del cuerpo que elija.",
            "Deja que el grupo elija un contacto de tu teléfono al que debas enviar el emoji de la berenjena 🍆 o el melocotón 🍑.",
            "Haz una pole dance imaginaria usando una escoba o una silla.",
            "Chúpale el dedo a la persona que te parezca más atractiva del grupo.",
            "Siéntate en el regazo de alguien hasta tu próximo turno.",
            "Deja que alguien te escriba una palabra en el cuello con los labios.",
            "Describe con detalles cómo sería tu cita perfecta y 'caliente'.",
            "Quítale lentamente un calcetín a la persona de enfrente usando solo los dientes.",
            "Hazle un 'lap dance' de 30 segundos a alguien del grupo.",
            "Elige a dos personas del grupo para que se den un beso (pico).",
            "Muerde suavemente el lóbulo de la oreja de la persona a tu derecha.",
            "Elige a alguien para que te dé una nalgada.",
            "Juega a 'piedra, papel o tijera' con alguien. El perdedor se quita una prenda.",
            "Métete un cubito de hielo en la ropa interior y espera a que se derrita.",
            "Deja que el grupo te esconda el móvil y solo te lo devolverán si cumples un reto extra."
        ] 
    },
    extreme: { 
        truths: [
            "¿Cuál es el secreto más oscuro que nunca le has contado a nadie aquí?",
            "Describe en detalle la última vez que te masturbaste pensando en alguien.",
            "¿Qué es lo más ilegal que has hecho y salido impune?",
            "¿Has engañado a alguna de tus parejas? Sé honesto y da detalles.",
            "¿Cuál es tu fetiche más 'tabú' o inconfesable?",
            "Si tuvieras que acostarte con una persona del grupo para salvar al mundo, ¿a quién elegirías y por qué?",
            "Muestra la última foto íntima que recibiste o enviaste en tu teléfono.",
            "¿Has participado en una orgía?",
            "¿Qué es lo más degradante que has hecho por dinero o por placer?",
            "¿Con cuántas personas de esta habitación te has imaginado teniendo sexo?",
            "¿Has pagado por sexo o te han pagado por ello?",
            "¿Cuál es el objeto más extraño que has usado como juguete sexual?",
            "Describe la conversación más sucia que has tenido por chat.",
            "¿Te has sentido atraído por algún familiar o familiar político?",
            "¿Cuál es la fantasía sexual que te da vergüenza admitir que tienes?",
            "¿Has grabado a alguien sin su consentimiento?",
            "Si pudieras, ¿te acostarías con la pareja de tu mejor amigo/a?",
            "¿Qué es algo que hiciste sexualmente de lo que te arrepientes profundamente?",
            "¿Has tenido alguna experiencia homosexual, aunque te consideres heterosexual?",
            "De todos los presentes, ¿a quién te llevarías a un cuarto oscuro ahora mismo?"
        ], 
        dares: [
            "Lame una parte del cuerpo (a elección del grupo) de la persona a tu izquierda.",
            "Intercambia una prenda de ropa interior con alguien del sexo opuesto por el resto del juego.",
            "Llama a tu ex, ponlo en altavoz y dile que todavía piensas en él/ella de forma sexual.",
            "Dale un beso francés apasionado de 30 segundos a la persona que el grupo elija para ti.",
            "Quítate dos prendas de ropa y quédate así durante las próximas 3 rondas.",
            "Simula un orgasmo de la forma más ruidosa y realista posible durante 20 segundos.",
            "Deja que la persona a tu derecha te ponga un cubito de hielo en la boca y lo mueva hasta que se derrita.",
            "Haz un striptease de 1 minuto para el grupo.",
            "Elige a dos personas y tienen que lamerse la cara mutuamente.",
            "Ve al baño con otro jugador (elegido por el grupo) y quédense ahí en silencio por 2 minutos.",
            "Deja que el grupo te ponga crema batida en alguna parte del cuerpo y que otro jugador la lama.",
            "Juega a 'verdad o reto' con la persona de tu derecha, pero solo pueden elegir reto extremo.",
            "Envía una 'nude' (puede ser una parte del cuerpo no explícita como la espalda o una pierna) al grupo de WhatsApp.",
            "Ponte a cuatro patas y deja que alguien te use como reposapiés durante una ronda.",
            "Besa cada dedo de la mano de la persona que te parezca más atractiva.",
            "Quítate la camisa/camiseta y deja que alguien te escriba una palabra en el pecho/espalda con un rotulador.",
            "Hazle un masaje erótico en los pies a alguien durante 2 minutos.",
            "Elige a la persona que peor te caiga del grupo y dale un beso en la boca.",
            "Graba un audio de gemidos y envíalo al décimo contacto de tu lista.",
            "El juego termina para ti si no te quitas toda la ropa hasta quedar en ropa interior."
        ] 
    },
    remoto: { 
        truths: [
            "Muestra la última foto de tu galería sin dar explicaciones.",
            "¿Cuál es tu historial de búsqueda más raro de la última semana? Comparte 3 búsquedas.",
            "Lee en voz alta el último DM que enviaste en Instagram.",
            "¿Qué llevas puesto de cintura para abajo ahora mismo? Muestra si te atreves.",
            "Abre tu nevera o despensa y muestra la comida más vergonzosa que tienes.",
            "¿Cuál es el fondo de pantalla de tu ordenador o móvil?",
            "¿Con quién fue tu última videollamada y de qué hablaron?",
            "Canta el estribillo de la canción que más te avergüenza que te guste.",
            "¿Cuál es la cosa más extraña que tienes a tu alcance ahora mismo?",
            "Describe tu habitación. ¿Está ordenada o es un caos?",
            "¿Alguna vez has stalkeado a alguien del grupo en redes sociales?",
            "¿Qué es lo más vergonzoso que ha visto tu cámara web por accidente?",
            "Muestra la pestaña que más tiempo lleva abierta en tu navegador.",
            "¿Cuál es el grupo de WhatsApp más raro en el que estás?",
            "¿Qué es algo que haces cuando crees que nadie te ve?",
            "Lee el último correo electrónico que recibiste.",
            "¿Cuál es la app que más usas en tu móvil?",
            "Describe el pijama que usas con más frecuencia.",
            "¿Has mentido sobre tus habilidades en tu currículum?",
            "¿Cuál es el mayor error que has cometido en una videollamada de trabajo/estudio?"
        ], 
        dares: [
            "Publica una historia en Instagram con un filtro vergonzoso que elija el grupo.",
            "Llama a un amigo en común (que no esté en el juego) y convéncelo de una noticia falsa.",
            "Usa un objeto de tu cuarto como sombrero durante las próximas 2 rondas.",
            "Cambia tu foto de perfil de WhatsApp por una foto de un vegetal durante 10 minutos.",
            "Envía un mensaje de voz a tu madre diciendo 'lo siento, no volverá a pasar' sin contexto.",
            "Haz 20 sentadillas frente a la cámara.",
            "Busca en Google 'cómo ser un buen...' y deja que el autocompletar elija tu destino. Lee los resultados.",
            "Ponte un calcetín en la mano y úsalo como un títere para presentarte de nuevo.",
            "Pide comida a domicilio a casa de otro jugador (con su permiso).",
            "Busca un tutorial de maquillaje en YouTube y trata de seguirlo durante 1 minuto.",
            "Cambia tu nombre en la videollamada por un apodo ridículo que elija el grupo.",
            "Dibuja un retrato de la persona a tu derecha en Paint y compártelo.",
            "Intenta hacer el paso de baile 'moonwalk' frente a la cámara.",
            "Come una galleta de la frente sin usar las manos.",
            "Envía un email a tu jefe o profesor con un solo emoji: 👽.",
            "Encuentra la prenda de ropa más fea que tengas y póntela.",
            "Haz un tour por tu habitación mostrando solo el suelo.",
            "Intenta hacer un beatbox durante 30 segundos.",
            "Ponte pintalabios sin usar un espejo.",
            "Apaga la cámara y solo puedes comunicarte con sonidos de animales hasta tu próximo turno."
        ] 
    }
};

const cardsData = [
    { type: 'wildcard', title: "El Imitador", description: "El grupo elige a otro jugador. Debes imitarlo durante 3 rondas. Si se te olvida, ¡bebes!", modes: ['all'] },
    { type: 'wildcard', title: "Mano de T-Rex", description: "Durante 2 rondas, debes mantener tus codos pegados a los costados para todo.", modes: ['all'] },
    { type: 'wildcard', title: "El Poeta Borracho", description: "Debes hablar en rima durante 3 rondas. Si no rimas, ¡bebes!", modes: ['all'] },
    { type: 'wildcard', title: "Salto de Turno", description: "¡Te salvaste! Pasas tu turno.", effect: (game) => { game.skipTurn = true; }, modes: ['all'] },
    { type: 'wildcard', title: "Intercambio de Identidad", description: "Elige a otro jugador. Intercambien sus nombres por 3 rondas. Quien se equivoque, ¡bebe!", modes: ['all'] },
    { type: 'wildcard', title: "El Narrador Deportivo", description: "Debes narrar todo lo que pasa en el juego como si fueras un comentarista de fútbol hasta tu próximo turno.", modes: ['all'] },
    { type: 'bomb', title: "Shot en Cadena", description: "¡Mala suerte! Tomas 1 shot puro. Luego, eliges a otro jugador para que tome 2.", modes: ['classic', 'hot', 'extreme'] },
    { type: 'bomb', title: "El Muro de la Vergüenza", description: "El grupo escribe un estado vergonzoso para que lo publiques en una de tus redes sociales.", modes: ['all'] },
    { type: 'bomb', title: "El Exiliado", description: "Durante la próxima ronda completa, no puedes hablar ni reír. Si lo haces, bebes.", modes: ['all'] },
    { type: 'bomb', title: "El Sirviente Real", description: "Durante las próximas 3 rondas, eres el sirviente de bebidas oficial del grupo.", modes: ['all'] },
    { type: 'bomb', title: "Teléfono sobre la Mesa", description: "Tu móvil desbloqueado sobre la mesa. El grupo tiene 1 minuto para enviar un mensaje gracioso a tu último contacto de WhatsApp.", modes: ['classic', 'hot', 'extreme'] },
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
export function triggerCard() {
    const available = cardsData.filter(w => w.modes.includes('all') || w.modes.includes(gameState.mode));
    const card = available[Math.floor(Math.random() * available.length)];
    if(card.effect) card.effect(gameState);
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
export function getSkipPunishment() {
    switch (gameState.mode) {
        case 'hot': return "Debes tomar 2 SHOTS PUROS.";
        case 'extreme': return "Debes tomar 3 SHOTS PUROS.";
        default: return "Debes tomar 1 SHOT PURO.";
    }
}
export function reset() {
    Object.assign(gameState, {
        mode: 'classic', players: [], turnOrder: [], currentPlayerIndex: 0, isCompetitive: false,
        customTruths: [], customDares: [], activeQuestions: { truth: [], dare: [] }, skipTurn: false
    });
}

export default gameState;
