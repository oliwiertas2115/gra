let points = 0;
let clickPower = 1;
let autoValue = 0;
let upgradeCost = 10;
let autoCost = 50;

const pointsDisplay = document.getElementById('points');
const targetImg = document.getElementById('target-img');
const upgradeBtn = document.getElementById('upgrade-click');
const autoBtn = document.getElementById('auto-clicker');

// Klikanie w obiekt
targetImg.addEventListener('click', () => {
    points += clickPower;
    updateUI();
});

// Kupowanie ulepszenia kliku
upgradeBtn.addEventListener('click', () => {
    if (points >= upgradeCost) {
        points -= upgradeCost;
        clickPower++;
        upgradeCost = Math.round(upgradeCost * 1.5);
        updateUI();
    } else {
        alert("Za mało Brain Points!");
    }
});

// Kupowanie auto-clickera
autoBtn.addEventListener('click', () => {
    if (points >= autoCost) {
        points -= autoCost;
        autoValue++;
        autoCost = Math.round(autoCost * 2);
        updateUI();
    }
});

// Pętla auto-clickera (co sekundę)
setInterval(() => {
    if (autoValue > 0) {
        points += autoValue;
        updateUI();
    }
}, 1000);

function updateUI() {
    pointsDisplay.innerText = points;
    upgradeBtn.innerText = `Lepsze kliknięcie (Koszt: ${upgradeCost})`;
    autoBtn.innerText = `Auto-Stealer (Koszt: ${autoCost})`;
}
