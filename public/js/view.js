const getEl = (id) => document.getElementById(id);

const DOM = {
    sections: { main: getEl('main-menu-section'), rules: getEl('rules-section'), mode: getEl('mode-selection-section'), custom: getEl('custom-questions-section'), setup: getEl('setup-section'), game: getEl('game-section') },
    gameSubSections: { turn: getEl('turn-section'), scoreboard: getEl('scoreboard') },
    buttons: { startPlaying: getEl('start-playing-btn'), howToPlayBtn: getEl('how-to-play-btn'), backToMainFromRulesBtn: getEl('back-to-main-from-rules-btn'), modeButtons: getEl('mode-buttons'), backToMain: getEl('back-to-main-menu-btn'), addCustomTruth: getEl('add-custom-truth-btn'), addCustomDare: getEl('add-custom-dare-btn'), continueToPlayers: getEl('continue-to-players-btn'), addPlayer: getEl('add-player-btn'), startGame: getEl('start-game-btn'), backToMode: getEl('back-to-mode-btn'), truthBtn: getEl('truth-btn'), dareBtn: getEl('dare-btn'), successBtn: getEl('success-btn'), failBtn: getEl('fail-btn'), nextTurnBtn: getEl('next-turn-btn'), endGameBtn: getEl('end-game-btn'), addDrinkBtn: getEl('add-drink-btn') },
    inputs: { customTruth: getEl('custom-truth-input'), customDare: getEl('custom-dare-input'), playerName: getEl('player-name-input'), gender: () => document.querySelector('input[name="gender"]:checked').value, enablePoints: getEl('enable-points-checkbox') },
    displays: { setupTitle: getEl('setup-title'), customTruthList: getEl('custom-truth-list'), customDareList: getEl('custom-dare-list'), playerList: getEl('player-list'), individualSetup: getEl('individual-player-setup'), scoreboardList: getEl('scoreboard-list'), currentPlayer: getEl('current-player-display'), drinkCount: getEl('drink-count'), question: getEl('question-display'), wildcard: getEl('wildcard-display'), wildcardTitle: getEl('wildcard-title'), wildcardDescription: getEl('wildcard-description'), },
    containers: { choiceButtons: getEl('choice-buttons'), outcomeButtons: getEl('outcome-buttons'), nextTurnButton: getEl('next-turn-button-container'), playerListContainer: getEl('player-list-container'), modalOptions: getEl('modal-options-container'), modalButtons: getEl('modal-buttons-container') },
    modal: { el: getEl('confirmation-modal'), title: getEl('modal-title'), text: getEl('modal-text'), confirmBtn: getEl('modal-confirm-btn'), cancelBtn: getEl('modal-cancel-btn'), }
};

function _renderPlayerTag(player, container, bgColor) {
    const genderIcon = player.gender === 'male' ? '♂️' : '♀️';
    const tag = document.createElement('div');
    tag.className = `player-tag ${bgColor} text-white text-sm font-semibold px-3 py-1 rounded-full flex items-center gap-2`;
    tag.innerHTML = `<span>${player.name} ${genderIcon}</span><button data-player-name="${player.name}" class="remove-player-btn text-red-300 hover:text-white font-bold">x</button>`;
    container.appendChild(tag);
}

export function showSection(sectionName) {
    Object.values(DOM.sections).forEach(s => s.classList.add('hidden'));
    if (DOM.sections[sectionName]) DOM.sections[sectionName].classList.remove('hidden');
}

export function setupPlayerScreen() {
    DOM.displays.individualSetup.style.display = 'block';
}

export function renderPlayers(players) {
    DOM.displays.playerList.innerHTML = '';
    players.forEach(p => _renderPlayerTag(p, DOM.displays.playerList, 'bg-gray-600'));
}

export function renderCustomQuestion(type, text) { const list = type === 'truth' ? DOM.displays.customTruthList : DOM.displays.customDareList; const li = document.createElement('li'); li.textContent = text; list.appendChild(li); }
export function clearInput(inputElement) { inputElement.value = ''; }
export function setStartButtonState(disabled) { DOM.buttons.startGame.disabled = disabled; }

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

export function showConfirmationModal(title, text, onConfirm) {
    DOM.modal.el.classList.remove('hidden');
    DOM.containers.modalOptions.innerHTML = '';
    DOM.containers.modalButtons.classList.remove('hidden');
    DOM.modal.title.innerText = title;
    DOM.modal.text.innerText = text;
    DOM.modal.confirmBtn.onclick = onConfirm;
    DOM.modal.cancelBtn.classList.remove('hidden');
    DOM.modal.confirmBtn.innerText = 'Aceptar';
}

export function showWinnerModal(winner, onConfirm) {
    DOM.modal.el.classList.remove('hidden');
    DOM.containers.modalOptions.innerHTML = '';
    DOM.containers.modalButtons.classList.remove('hidden');
    DOM.modal.title.innerText = "🏆 ¡Fin del Juego! 🏆";
    DOM.modal.text.innerText = `El ganador es ${winner.name} con ${winner.points} puntos. ¡Felicidades!`;
    DOM.modal.cancelBtn.classList.add('hidden');
    DOM.modal.confirmBtn.innerText = 'Volver al Menú';
    DOM.modal.confirmBtn.onclick = onConfirm;
}

export function hideModal() { DOM.modal.el.classList.add('hidden'); }

export function showFinalBombModal(bomb, onConfirmOptionA, onConfirmOptionB, onFail) {
    DOM.modal.el.classList.remove('hidden');
    DOM.modal.title.innerText = bomb.title;
    DOM.modal.text.innerText = bomb.description;
    DOM.containers.modalButtons.classList.add('hidden');
    
    const optionsContainer = DOM.containers.modalOptions;
    optionsContainer.innerHTML = '';

    if (bomb.options) {
        const btnA = document.createElement('button');
        btnA.textContent = bomb.options.a;
        btnA.className = 'w-full bg-rose-600 font-bold py-2 px-4 rounded-lg';
        btnA.onclick = () => onConfirmOptionA();
        
        const btnB = document.createElement('button');
        btnB.textContent = bomb.options.b;
        btnB.className = 'w-full bg-purple-600 font-bold py-2 px-4 rounded-lg';
        btnB.onclick = () => onConfirmOptionB();

        optionsContainer.appendChild(btnA);
        optionsContainer.appendChild(btnB);
        
        const failBtn = document.createElement('button');
        failBtn.textContent = 'Me niego';
        failBtn.className = 'w-full bg-gray-600 font-bold py-2 px-4 rounded-lg mt-2';
        failBtn.onclick = () => onFail();
        optionsContainer.appendChild(failBtn);

    } else {
        DOM.containers.modalButtons.classList.remove('hidden');
        DOM.modal.confirmBtn.classList.remove('hidden');
        DOM.modal.confirmBtn.textContent = 'Acepto el reto';
        DOM.modal.confirmBtn.onclick = onConfirmOptionA;
        DOM.modal.cancelBtn.textContent = 'Me niego';
        DOM.modal.cancelBtn.onclick = onFail;
    }
}

export default DOM;