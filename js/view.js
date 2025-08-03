const getEl = (id) => document.getElementById(id);

const DOM = {
    appContainer: getEl('app-container'),
    sections: { 
        main: getEl('main-menu-section'), 
        rules: getEl('rules-section'), 
        mode: getEl('mode-selection-section'), 
        setup: getEl('setup-section'), 
        game: getEl('game-section'), 
        intensityGuide: getEl('intensity-guide-section'),
        packs: getEl('packs-section'),
        gameOver: getEl('game-over-section'),
        custom: getEl('custom-questions-section')
    },
    gameSubSections: { 
        turn: getEl('turn-section'), 
        scoreboard: getEl('scoreboard') 
    },
    inputs: { 
        playerName: getEl('player-name-input'), 
        gender: () => document.querySelector('input[name="gender"]:checked').value, 
        enablePoints: getEl('enable-points-checkbox') 
    },
    displays: { 
        playerList: getEl('player-list'), 
        currentPlayer: getEl('current-player-display'),
        drinkCount: getEl('drink-count'),
        question: getEl('question-display'),
        wildcard: getEl('wildcard-display'),
        wildcardTitle: getEl('wildcard-title'),
        wildcardDescription: getEl('wildcard-description'),
        scoreboardList: getEl('scoreboard-list'),
        gameSummary: getEl('game-summary')
    },
    containers: { 
        choiceButtons: getEl('choice-buttons'), 
        outcomeButtons: getEl('outcome-buttons'), 
        nextTurnButton: getEl('next-turn-button-container'), 
        playerListContainer: getEl('player-list-container'), 
        modalOptions: getEl('modal-options-container'), 
        modalButtons: getEl('modal-buttons-container') 
    },
    modal: { 
        el: getEl('confirmation-modal'), 
        title: getEl('modal-title'), 
        text: getEl('modal-text'), 
        confirmBtn: getEl('modal-confirm-btn'), 
        cancelBtn: getEl('modal-cancel-btn') 
    }
};

function _renderPlayerTag(player, container) {
    const genderIcon = player.gender === 'male' ? '♂️' : '♀️';
    const tag = document.createElement('div');
    tag.className = `player-tag bg-gray-600 text-white text-sm font-semibold px-3 py-1 rounded-full flex items-center gap-2`;
    tag.innerHTML = `<span>${player.name} ${genderIcon}</span><button data-player-name="${player.name}" class="remove-player-btn text-red-300 hover:text-white font-bold">x</button>`;
    container.appendChild(tag);
}

export function showSection(sectionName) {
    Object.values(DOM.sections).forEach(s => {
        if (s) s.classList.add('hidden');
    });
    if (DOM.sections[sectionName]) DOM.sections[sectionName].classList.remove('hidden');
}

export function animateScreenTransition(outScreen, inScreen) {
    if (outScreen) {
        outScreen.classList.add('screen-transition-out');
        setTimeout(() => {
            outScreen.classList.add('hidden');
            outScreen.classList.remove('screen-transition-out');
            if(inScreen) {
                inScreen.classList.remove('hidden');
                inScreen.classList.add('fade-in');
            }
        }, 300);
    } else if (inScreen) {
        inScreen.classList.remove('hidden');
        inScreen.classList.add('fade-in');
    }
}

export function renderPlayers(players) {
    DOM.displays.playerList.innerHTML = '';
    players.forEach(p => _renderPlayerTag(p, DOM.displays.playerList));
}

export function clearInput(inputElement) { inputElement.value = ''; }
export function setStartButtonState(disabled) { 
    const startGameBtn = document.getElementById('start-game-btn');
    if(startGameBtn) startGameBtn.disabled = disabled; 
}

export function showTurn(player, isCompetitive, allPlayers) {
    if (isCompetitive) {
        DOM.gameSubSections.scoreboard.classList.remove('hidden');
        showScoreboard(allPlayers);
    } else {
        DOM.gameSubSections.scoreboard.classList.add('hidden');
    }
    DOM.displays.currentPlayer.innerText = player.name;
    DOM.displays.drinkCount.innerText = player.drinks;
}

export function showScoreboard(players) {
    const list = DOM.displays.scoreboardList;
    list.innerHTML = '';
    if (!players) return;
    players.sort((a, b) => b.points - a.points).forEach(p => {
        const item = document.createElement('span');
        item.textContent = ` ${p.name}: ${p.points} `;
        list.appendChild(item);
    });
}

export function showNormalTurn() {
    DOM.displays.question.innerText = "Elige tu destino...";
    DOM.displays.question.classList.remove('hidden');
    DOM.displays.wildcard.classList.add('hidden');
    DOM.containers.choiceButtons.classList.remove('hidden');
    DOM.containers.outcomeButtons.classList.add('hidden');
    DOM.containers.nextTurnButton.classList.add('hidden');
}

export function showQuestion(question, isCompetitive) {
    DOM.displays.question.innerText = question || "¡No quedan más preguntas!";
    DOM.containers.choiceButtons.classList.add('hidden');
    if (isCompetitive) DOM.containers.outcomeButtons.classList.remove('hidden');
    else DOM.containers.nextTurnButton.classList.remove('hidden');
}

export function showCard(card) {
    DOM.displays.question.classList.add('hidden');
    DOM.displays.wildcard.classList.remove('hidden');
    if (card.type === 'bomb') {
        DOM.displays.wildcardTitle.innerText = `💣 ¡BOMBA! 💣\n${card.title}`;
        DOM.displays.wildcardTitle.className = 'text-3xl font-bold text-red-500 mb-2';
    } else {
        DOM.displays.wildcardTitle.innerText = `🃏 ¡COMODÍN! 🃏\n${card.title}`;
        DOM.displays.wildcardTitle.className = 'text-3xl font-bold text-yellow-400 mb-2';
    }
    DOM.displays.wildcardDescription.innerText = card.description;
    DOM.containers.choiceButtons.classList.add('hidden');
    DOM.containers.nextTurnButton.classList.remove('hidden');
}

export function showConfirmationModal(title, text) {
    DOM.modal.el.classList.remove('hidden');
    DOM.containers.modalOptions.innerHTML = '';
    DOM.containers.modalButtons.classList.remove('hidden');
    DOM.modal.title.innerText = title;
    DOM.modal.text.innerText = text;
    DOM.modal.cancelBtn.classList.remove('hidden');
    DOM.modal.confirmBtn.innerText = 'Aceptar';
}

export function showWinnerModal(winner) {
    DOM.modal.el.classList.remove('hidden');
    DOM.containers.modalOptions.innerHTML = '';
    DOM.containers.modalButtons.classList.remove('hidden');
    DOM.modal.title.innerText = "🏆 ¡Fin del Juego! 🏆";
    DOM.modal.text.innerText = `El ganador es ${winner.name} con ${winner.points} puntos. ¡Felicidades!`;
    DOM.modal.cancelBtn.classList.add('hidden');
    DOM.modal.confirmBtn.innerText = 'Volver al Menú';
}

export function hideModal() { DOM.modal.el.classList.add('hidden'); }

export function showFinalBombModal(bomb) {
    DOM.modal.el.classList.remove('hidden');
    DOM.modal.title.innerText = bomb.title;
    DOM.modal.text.innerText = bomb.description;
    DOM.containers.modalButtons.classList.add('hidden');
    
    const optionsContainer = DOM.containers.modalOptions;
    optionsContainer.innerHTML = '';

    if (bomb.options) {
        const btnA = document.createElement('button');
        btnA.id = 'final-bomb-option-a';
        btnA.textContent = bomb.options.a;
        btnA.className = 'w-full bg-rose-600 font-bold py-2 px-4 rounded-lg';
        
        const btnB = document.createElement('button');
        btnB.id = 'final-bomb-option-b';
        btnB.textContent = bomb.options.b;
        btnB.className = 'w-full bg-purple-600 font-bold py-2 px-4 rounded-lg';

        optionsContainer.appendChild(btnA);
        optionsContainer.appendChild(btnB);
        
        const failBtn = document.createElement('button');
        failBtn.id = 'final-bomb-fail';
        failBtn.textContent = 'Me niego';
        failBtn.className = 'w-full bg-gray-600 font-bold py-2 px-4 rounded-lg mt-2';
        optionsContainer.appendChild(failBtn);

    } else {
        DOM.containers.modalButtons.classList.remove('hidden');
        DOM.modal.confirmBtn.classList.remove('hidden');
        DOM.modal.cancelBtn.classList.remove('hidden');
        DOM.modal.confirmBtn.id = 'final-bomb-accept';
        DOM.modal.cancelBtn.id = 'final-bomb-fail';
        DOM.modal.confirmBtn.textContent = 'Acepto el reto';
        DOM.modal.cancelBtn.textContent = 'Me niego';
    }
}

export function applyTheme(mode) {
    document.body.className = `bg-gray-900 text-white min-h-screen flex items-center justify-center p-4 transition-colors duration-500 theme-${mode}`;
}

export function showGameOverScreen(stats) {
    const summaryDiv = DOM.displays.gameSummary;
    summaryDiv.innerHTML = `
        <p>👑 **Rey/Reina de la Noche:** ${stats.winner.name} (${stats.winner.points} pts)</p>
        <p>🤡 **Castigado/a Final:** ${stats.loser.name} (${stats.loser.points} pts)</p>
        <p>🍻 **Borracho/a Oficial:** ${stats.drunkard.name} (${stats.drunkard.drinks} tragos)</p>
    `;
    animateScreenTransition(DOM.sections.game, DOM.sections.gameOver);
}

export default DOM;