let trophies = 0;
let enemyHP = 500;
let isBattleActive = false;

function startMatch() {
    enemyHP = 500; // Reset HP przeciwnika
    document.getElementById('enemy-hp').innerText = enemyHP;
    document.getElementById('lobby').style.display = 'none';
    document.getElementById('battle').style.display = 'block';
    isBattleActive = true;

    // Masz 10 sekund na pokonanie przeciwnika
    setTimeout(() => {
        if(isBattleActive) finishGame(false);
    }, 10000);
}

function dealDamage() {
    if(!isBattleActive) return;
    
    enemyHP -= 20; // Obrażenia za kliknięcie
    document.getElementById('enemy-hp').innerText = enemyHP;

    if(enemyHP <= 0) {
        finishGame(true);
    }
}

function finishGame(win) {
    isBattleActive = false;
    document.getElementById('lobby').style.display = 'block';
    document.getElementById('battle').style.display = 'none';

    if(win) {
        trophies += 10;
        alert("ZWYCIĘSTWO! +10 pucharów");
    } else {
        let loss = Math.floor(Math.random() * 6) + 1; // Strata 1-6
        trophies -= loss;
        if(trophies < 0) trophies = 0;
        alert("PRZEGRANA... Czas minął! Strata: -" + loss);
    }

    document.getElementById('trophy-count').innerText = trophies;
}
