document.addEventListener('DOMContentLoaded', () => {
    const gunImage = document.getElementById('gun-image');
    const resetBtn = document.getElementById('reset-btn');
    const chamberCountElement = document.getElementById('chamber-count');
    const resultElement = document.getElementById('result');
    const playerCardElement = document.getElementById('player-card');

    const spinSound = new Audio();
    const shotSound = new Audio();
    const emptySound = new Audio();

    const suits = ['黑桃', '紅心', '梅花', '方塊'];
    const numbers = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

    let chamberCount = 6;
    let bulletPosition = Math.floor(Math.random() * 6) + 1;
    let gameOver = false;

    function loadSounds() {
        spinSound.src = "cylinder_spin.mp3";
        shotSound.src = "gunshot.mp3";
        emptySound.src = "empty_trigger.mp3";
    }

    function getRandomCard() {
        const suit = suits[Math.floor(Math.random() * suits.length)];
        const number = numbers[Math.floor(Math.random() * numbers.length)];
        return `${suit}${number}`;
    }

    function assignPlayerCard() {
        const card = getRandomCard();
        playerCardElement.textContent = `你的牌是 ${card}`;
    }

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

    function pullTrigger() {
        if (gameOver) return;

        spinSound.currentTime = 0;
        spinSound.play();

        setTimeout(() => {
            chamberCount--;
            chamberCountElement.textContent = `剩餘機會: ${chamberCount}`;

            if (chamberCount === 0 || chamberCount === 6 - bulletPosition) {
                shotSound.currentTime = 0;
                shotSound.play();
                resultElement.textContent = 'BANG! Game Over!';
                resultElement.style.color = 'red';
                gameOver = true;
                gunImage.src = 'fire.png';

                setTimeout(() => {
                    gunImage.src = 'gun.png';
                    gunImage.style.opacity = '0.6';
                }, 1000);
            } else {
                emptySound.currentTime = 0;
                emptySound.play();
                resultElement.textContent = '扣扳機!... 什麼事都沒發生!';
                resultElement.style.color = 'green';
            }
        }, 800);
    }

    gunImage.addEventListener('click', pullTrigger);
    resetBtn.addEventListener('click', resetGame);

    loadSounds();
    assignPlayerCard();
});
