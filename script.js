document.addEventListener('DOMContentLoaded', () => {
    const gunImage = document.getElementById('gun-image');
    const resetBtn = document.getElementById('reset-btn');
    const chamberCountElement = document.getElementById('chamber-count');
    const resultElement = document.getElementById('result');
    const playerCardElement = document.getElementById('player-card');

    // Sound effects
    const spinSound = new Audio();
    const shotSound = new Audio();
    const emptySound = new Audio();

    // Card data
    const suits = ['黑桃', '紅心', '梅花', '方塊'];
    const numbers = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

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

    // Get random card
    function getRandomCard() {
        const suit = suits[Math.floor(Math.random() * suits.length)];
        const number = numbers[Math.floor(Math.random() * numbers.length)];
        return `${suit}${number}`;
    }

    // Assign card to player
    function assignPlayerCard() {
        const card = getRandomCard();
        playerCardElement.textContent = `你的牌是 ${card}`;
    }

    // Reset game function
    function resetGame() {
        chamberCount = 6;
        bulletPosition = Math.floor(Math.random() * 6) + 1;
        gameOver = false;
        chamberCountElement.textContent = `剩餘機會: ${chamberCount}`;
        resultElement.textContent = '';
        gunImage.style.opacity = '1';
        gunImage.src = 'gun.png';
        assignPlayerCard();
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
                gunImage.src = 'fire.png'; // 切換成開槍圖片

                // 1秒後切回原圖並淡化
                setTimeout(() => {
                    gunImage.src = 'gun.png';
                    gunImage.style.opacity = '0.6';
                }, 1000);
            } else {
                // Empty chamber
                emptySound.currentTime = 0;
                emptySound.play();
                resultElement.textContent = '扣扳機!... 什麼事都沒發生!';
                resultElement.style.color = 'green';
            }
        }, 800); // 等待 spin 音效後顯示結果
    }

    // Event listeners
    gunImage.addEventListener('click', pullTrigger);
    resetBtn.addEventListener('click', resetGame);

    // Load sounds on page load
    loadSounds();

    // Assign first card on page load
    assignPlayerCard();
});
