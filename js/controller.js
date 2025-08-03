import gameState, * as model from './model.js';
import DOM, * as view from './view.js';

let currentModalConfirmAction = () => {};

function selectMode(mode) { 
    if (mode === 'prohibido') {
        currentModalConfirmAction = () => {
            view.hideModal();
            model.setMode(mode);
            view.applyTheme(mode);
            view.animateScreenTransition(DOM.sections.mode, DOM.sections.setup);
        };
        view.showConfirmationModal("⚠️ ADVERTENCIA: ¿ESTÁS SEGURO? ⚠️", "El 'Modo Prohibido' contiene desafíos de naturaleza extremadamente explícita. Todos los jugadores deben dar su consentimiento claro y entusiasta para participar.");
        DOM.modal.confirmBtn.innerText = 'Sí, aceptamos el riesgo';
        DOM.modal.cancelBtn.innerText = 'No, volver atrás';
    } else {
        model.setMode(mode);
        view.applyTheme(mode);
        view.animateScreenTransition(DOM.sections.mode, DOM.sections.setup);
    }
}

function startGame() {
    model.setCompetitive(DOM.inputs.enablePoints.checked);
    model.prepareGame();
    view.animateScreenTransition(DOM.sections.setup, DOM.sections.game, startTurn);
}

function startTurn() {
    const player = gameState.turnOrder[gameState.currentPlayerIndex];
    view.showTurn(player, gameState.isCompetitive, gameState.turnOrder);

    const finalBomb = model.getFinalBomb();
    if (finalBomb) {
        view.showFinalBombModal(finalBomb);
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
        currentModalConfirmAction = () => {
            model.addDrinkToCurrentPlayer();
            view.hideModal();
            nextPlayer();
        };
        view.showConfirmationModal( "¡Te has negado!", `Como castigo, ${punishment}.`);
        DOM.modal.cancelBtn.classList.add('hidden');
    }
}

function nextPlayer() {
    if (gameState.isCompetitive && gameState.turnOrder.some(p => p.points >= 10)) {
        endGame();
        return;
    }
    model.nextPlayer();
    startTurn();
}

function endGame() {
    const stats = model.calculateStats();
    view.showGameOverScreen(stats);
}

function resetAndGoToMenu() {
    model.reset();
    view.applyTheme('classic');
    const currentScreen = document.querySelector('#app-container > div:not(.hidden)');
    view.animateScreenTransition(currentScreen, DOM.sections.main);
    view.hideModal();
}

function handleFinalBomb(option) {
    const player = gameState.turnOrder[gameState.currentPlayerIndex];
    if (option === 'fail') {
        if (gameState.mode === 'prohibido') player.points = Math.floor(player.points / 2);
        else player.points -= 3;
        view.hideModal();
        nextPlayer();
    } else { // 'a' or 'b'
        view.hideModal();
        endGame();
    }
}

function handleClicks(e) {
    const target = e.target;
    const targetId = target.id;
    const targetDataset = target.dataset;

    // Navegación principal
    if (targetId === 'start-playing-btn') view.animateScreenTransition(DOM.sections.main, DOM.sections.intensityGuide);
    if (targetId === 'how-to-play-btn') view.animateScreenTransition(DOM.sections.main, DOM.sections.rules);
    if (targetId === 'my-packs-btn') view.animateScreenTransition(DOM.sections.main, DOM.sections.packs);
    if (targetId === 'continue-to-modes-btn') view.animateScreenTransition(DOM.sections.intensityGuide, DOM.sections.mode);
    if (targetId === 'back-to-guide-btn') view.animateScreenTransition(DOM.sections.mode, DOM.sections.intensityGuide);
    if (targetId === 'back-to-main-from-rules-btn' || targetId === 'back-to-main-menu-btn' || targetId === 'back-to-main-from-packs-btn') {
        const currentScreen = target.closest('.card-bg');
        view.animateScreenTransition(currentScreen, DOM.sections.main);
    }
    
    // Selección de modo
    if (target.parentElement && target.parentElement.id === 'mode-buttons' && targetDataset.mode) {
        selectMode(targetDataset.mode);
    }

    // Configuración de jugadores
    if (targetId === 'add-player-btn') {
        if(model.addPlayer(DOM.inputs.playerName.value, DOM.inputs.gender())) {
            view.renderPlayers(gameState.players);
            view.clearInput(DOM.inputs.playerName);
            view.setStartButtonState(gameState.players.length < 1);
        }
    }
    if (target.classList.contains('remove-player-btn')) {
        model.removePlayer(targetDataset.playerName);
        view.renderPlayers(gameState.players);
        view.setStartButtonState(gameState.players.length < 1);
    }
    if (targetId === 'start-game-btn') startGame();
    if (targetId === 'back-to-mode-btn') view.animateScreenTransition(DOM.sections.setup, DOM.sections.mode);

    // Juego
    if (targetId === 'truth-btn') getQuestion('truth');
    if (targetId === 'dare-btn') getQuestion('dare');
    if (targetId === 'success-btn') handleOutcome(true);
    if (targetId === 'fail-btn') handleOutcome(false);
    if (targetId === 'next-turn-btn') nextPlayer();
    if (targetId === 'add-drink-btn') {
        model.addDrinkToCurrentPlayer();
        view.showTurn(gameState.turnOrder[gameState.currentPlayerIndex], gameState.isCompetitive, gameState.turnOrder);
    }
    if (targetId === 'end-game-btn') {
        currentModalConfirmAction = resetAndGoToMenu;
        view.showConfirmationModal("¿Finalizar Juego?", "Todo el progreso se perderá. ¿Estás seguro?");
    }
    if (targetId === 'play-again-btn') resetAndGoToMenu();

    // Modal
    if (targetId === 'modal-cancel-btn') view.hideModal();
    if (targetId === 'modal-confirm-btn') {
        if (typeof currentModalConfirmAction === 'function') {
            currentModalConfirmAction();
        }
    }

    // Bombas finales
    if (targetId === 'final-bomb-option-a' || targetId === 'final-bomb-accept') handleFinalBomb('a');
    if (targetId === 'final-bomb-option-b') handleFinalBomb('b');
    if (targetId === 'final-bomb-fail') handleFinalBomb('fail');
}

document.addEventListener('DOMContentLoaded', () => {
    DOM.appContainer.addEventListener('click', handleClicks);
    view.showSection('main');
});