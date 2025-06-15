import gameState, * as model from './model.js';
import DOM, * as view from './view.js';

function selectMode(mode) { 
    model.setMode(mode); 
    view.showSection('custom'); 
}

function showPlayerSetup() { 
    view.showSection('setup'); 
    view.setupPlayerScreen(gameState.mode); 
}

function startGame() {
    model.setCompetitive(DOM.inputs.enablePoints.checked);
    model.prepareGame();
    view.showSection('game');
    startTurn();
}

function startTurn() {
    const player = gameState.turnOrder[gameState.currentPlayerIndex];
    view.showTurn(player, gameState.isCompetitive, gameState.turnOrder);

    const finalBomb = model.getFinalBomb();
    if (finalBomb) {
        view.showFinalBombModal(
            finalBomb,
            () => { // Opción A o Aceptar
                view.hideModal();
                view.showWinnerModal(player, resetAndGoToMenu);
            },
            () => { // Opción B
                view.hideModal();
                view.showWinnerModal(player, resetAndGoToMenu);
            },
            () => { // Fallar / Negarse
                if (gameState.mode === 'prohibido') player.points = Math.floor(player.points / 2);
                else player.points -= 3;
                view.hideModal();
                nextPlayer();
            }
        );
        return;
    }
    
    if (gameState.skipTurn) {
        gameState.skipTurn = false;
        view.showCard({ type: 'wildcard', title: "Turno Saltado", description: "Te has librado... por ahora."});
        return;
    }
    
    if (Math.random() < 0.25) {
        const card = model.triggerCard();
        view.showCard(card);
        if (card.title === "Bebida para Todos") view.showTurn(player, gameState.isCompetitive, gameState.turnOrder);
    } else {
        view.showNormalTurn();
    }
}

function getQuestion(type) {
    const question = model.getQuestion(type);
    view.showQuestion(question, gameState.isCompetitive);
}

function handleOutcome(wasSuccessful) {
    if(wasSuccessful) { 
        model.updatePointsForCurrentPlayer(true);
        nextPlayer();
    } else { 
        const punishment = model.getSkipPunishment();
        view.showConfirmationModal(
            "¡Te has negado!", 
            `Como castigo, ${punishment}.`, 
            () => {
                model.addDrinkToCurrentPlayer();
                view.hideModal();
                nextPlayer();
            }
        );
        DOM.modal.cancelBtn.classList.add('hidden');
    }
}

function nextPlayer() {
    if (gameState.isCompetitive && gameState.turnOrder.some(p => p.points >= 10)) {
        const winner = gameState.turnOrder.reduce((p, c) => c.points > p.points ? c : p);
        view.showWinnerModal(winner, resetAndGoToMenu);
        return;
    }
    model.nextPlayer();
    startTurn();
}

function resetAndGoToMenu() {
    model.reset();
    DOM.displays.customTruthList.innerHTML = ''; 
    DOM.displays.customDareList.innerHTML = '';
    view.showSection('main');
    view.hideModal();
}

function setupEventListeners() {
    DOM.buttons.startPlaying.addEventListener('click', () => view.showSection('mode'));
    DOM.buttons.howToPlayBtn.addEventListener('click', () => view.showSection('rules'));
    DOM.buttons.backToMainFromRulesBtn.addEventListener('click', () => view.showSection('main'));

    DOM.buttons.modeButtons.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') selectMode(e.target.dataset.mode);
    });
    DOM.buttons.backToMain.addEventListener('click', () => view.showSection('main'));
    DOM.buttons.addCustomTruth.addEventListener('click', () => {
        const text = DOM.inputs.customTruth.value;
        if (text) { model.addCustomQuestion('truth', text); view.renderCustomQuestion('truth', text); view.clearInput(DOM.inputs.customTruth); }
    });
    DOM.buttons.addCustomDare.addEventListener('click', () => {
        const text = DOM.inputs.customDare.value;
        if (text) { model.addCustomQuestion('dare', text); view.renderCustomQuestion('dare', text); view.clearInput(DOM.inputs.customDare); }
    });
    DOM.buttons.continueToPlayers.addEventListener('click', showPlayerSetup);
    DOM.buttons.addPlayer.addEventListener('click', () => {
        if(model.addPlayer(DOM.inputs.playerName.value, DOM.inputs.gender())) {
            view.renderPlayers(gameState.players, gameState.mode);
            view.clearInput(DOM.inputs.playerName);
            view.setStartButtonState(gameState.players.length < 1); // Se puede jugar solo
        }
    });
    
    DOM.containers.playerListContainer.addEventListener('click', (e) => {
        if(e.target.classList.contains('remove-player-btn')) {
            model.removePlayer(e.target.dataset.playerName);
            view.renderPlayers(gameState.players, gameState.mode);
        }
    });
    DOM.buttons.startGame.addEventListener('click', startGame);
    DOM.buttons.backToMode.addEventListener('click', () => view.showSection('mode'));
    DOM.buttons.truthBtn.addEventListener('click', () => getQuestion('truth'));
    DOM.buttons.dareBtn.addEventListener('click', () => getQuestion('dare'));
    DOM.buttons.successBtn.addEventListener('click', () => handleOutcome(true));
    DOM.buttons.failBtn.addEventListener('click', () => handleOutcome(false));
    DOM.buttons.nextTurnBtn.addEventListener('click', nextPlayer);
    DOM.buttons.addDrinkBtn.addEventListener('click', () => {
        model.addDrinkToCurrentPlayer();
        view.showTurn(gameState.turnOrder[gameState.currentPlayerIndex], gameState.isCompetitive, gameState.turnOrder);
    });
    DOM.buttons.endGameBtn.addEventListener('click', () => {
        view.showConfirmationModal("¿Finalizar Juego?", "Todo el progreso se perderá. ¿Estás seguro?", resetAndGoToMenu);
    });
    DOM.modal.cancelBtn.addEventListener('click', view.hideModal);
}

document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    view.showSection('main');
});
