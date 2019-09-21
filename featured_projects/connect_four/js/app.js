const game = new Game();

// When the button with the ID begin-game is clicked, this will fire
document.getElementById('begin-game').addEventListener('click', function() {
    game.startGame();
    this.style.display = 'none';
    document.getElementById('play-area').style.opacity = '1';
});

// Listens for keypresses
document.addEventListener('keydown', function(event) {
    game.handleKeydown(event);
});
