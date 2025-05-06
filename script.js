document.addEventListener('DOMContentLoaded', () => {
    const gunImage = document.getElementById('gun-image');
    const resetBtn = document.getElementById('reset-btn');
    const chamberCountElement = document.getElementById('chamber-count');
    const resultElement = document.getElementById('result');

    // Sound effects
    const spinSound = new Audio();
    const shotSound = new Audio();
    const emptySound = new Audio();

    // Initialize game state
    let chamberCount = 6;
    let bulletPosition = Math.floor(Math.random() * 6) + 1;
    let gameOver = false;

    // Load sound effects
    function loadSounds() {
        spinSound.src = "cylinder_spin.mp3";
        shotSound.src = "gunshot.mp3";
        emptySound.src = "empty_trigger.mp3";
    }

    // Reset game function
    function resetGame() {
        chamberCount = 6;
        bulletPosition = Math.floor(Math.random() * 6) + 1;
        gameOver = false;
        chamberCountElement.textContent = `剩餘機會: ${chamberCount}`;
        resultElement.textContent = '';
        gunImage.style.opacity = '1'; // Reset the gun image opacity
    }

    // Pull trigger function
    function pullTrigger() {
        if (gameOver) return;

        // Play cylinder spin sound
        spinSound.currentTime = 0;
        spinSound.play();

        setTimeout(() => {
            chamberCount--;
            chamberCountElement.textContent = `剩餘機會: ${chamberCount}`;

            // Check if bullet is fired
            if (chamberCount === 0 || chamberCount === 6 - bulletPosition) {
                // Shot fired!
                shotSound.currentTime = 0;
                shotSound.play();
                resultElement.textContent = 'BANG! Game Over!';
                resultElement.style.color = 'red';
                gameOver = true;
                gunImage.src = 'fire.png'; // 切換成 fire.png
				
				//1秒切圖
				setTimeout(() => {
                gunImage.src = 'gun.png';
                gunImage.style.opacity = '0.6'; // Dim the gun image when game over
				}, 1000);
			} else {
                // Empty chamber
                emptySound.currentTime = 0;
                emptySound.play();
                resultElement.textContent = '扣扳機!... 什麼事都沒發生!';
                resultElement.style.color = 'green';
            }
        }, 800); // Wait for spin sound to play before showing result
    }

    // Event listeners
    gunImage.addEventListener('click', pullTrigger);
    resetBtn.addEventListener('click', resetGame);

    // Load sounds on page load
    loadSounds();
});