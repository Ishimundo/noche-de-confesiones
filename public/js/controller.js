// --- CONTROLADOR (Controller) ---
// Conecta la Vista y el Modelo. Escucha los eventos y orquesta el juego.

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
    
    if (gameState.skipTurn) {
        gameState.skipTurn = false;
        view.showWildcard({ title: "Turno Saltado", description: "Te has librado... por ahora."});
        return;
    }
    
    // 25% de probabilidad de comodín
    if (Math.random() < 0.25) {
        const card = model.triggerWildcard();
        view.showWildcard(card);
        // Si el comodín afectó a todos, actualizar vista de todos los jugadores
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
    if(wasSuccessful) { model.updatePointsForCurrentPlayer(true); } 
    else { model.addDrinkToCurrentPlayer(); }
    nextPlayer();
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
            view.setStartButtonState(gameState.players.length < 2);
        }
    });
    DOM.buttons.addBoy.addEventListener('click', () => {
        if(model.addTeamPlayer(DOM.inputs.boyName.value, 'boys')) {
            view.renderPlayers(gameState.players, gameState.mode);
            view.clearInput(DOM.inputs.boyName);
            const boysCount = gameState.players.filter(p => p.team === 'boys').length;
            const girlsCount = gameState.players.filter(p => p.team === 'girls').length;
            view.setStartButtonState(boysCount < 1 || girlsCount < 1);
        }
    });
    DOM.buttons.addGirl.addEventListener('click', () => {
         if(model.addTeamPlayer(DOM.inputs.girlName.value, 'girls')) {
            view.renderPlayers(gameState.players, gameState.mode);
            view.clearInput(DOM.inputs.girlName);
            const boysCount = gameState.players.filter(p => p.team === 'boys').length;
            const girlsCount = gameState.players.filter(p => p.team === 'girls').length;
            view.setStartButtonState(boysCount < 1 || girlsCount < 1);
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

// --- Inicialización de la Aplicación ---
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    view.showSection('main');
});
