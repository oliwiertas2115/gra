// --- DANE GRY ---
let player = {
    trophies: 0,
    coins: 50,
    xp: 0,
    power: 1,
    charName: "SHELLY",
    roadProgress: 0
};

const roadRewards = [
    { trophies: 50, reward: "100 Monety", type: "coins", amount: 100 },
    { trophies: 150, reward: "Nowa Postać: COLT", type: "char", name: "COLT" },
    { trophies: 300, reward: "500 Monety", type: "coins", amount: 500 }
];

// --- SYSTEM WIDOKÓW ---
function switchView(viewId) {
    document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));
    document.getElementById(viewId).classList.remove('hidden');
    if(viewId === 'view-road') renderRoad();
}

// --- WALKA ---
let enemyHP = 1000;
function startBattle() {
    enemyHP = 1000 + (player.trophies * 2); // Trudniejsi wrogowie wraz z pucharami
    updateBattleUI();
    switchView('view-battle');
}

function clickEnemy() {
    enemyHP -= (10 * player.power);
    updateBattleUI();
    if(enemyHP <= 0) finishBattle(true);
}

function updateBattleUI() {
    let p = (enemyHP / (1000 + (player.trophies * 2))) * 100;
    document.getElementById('enemy-fill').style.width = Math.max(0, p) + "%";
}

function finishBattle(win) {
    if(win) {
        player.trophies += 10;
        player.coins += 15;
        player.xp += 25;
        alert("Wygrana! +10🏆 +15💰 +25XP");
    } else {
        let loss = Math.floor(Math.random() * 6) + 1;
        player.trophies = Math.max(0, player.trophies - loss);
        alert("Przegrana! -" + loss + "🏆");
    }
    updateTopBar();
    switchView('view-lobby');
}

// --- SKRZYNKI ---
function openBox() {
    if(player.coins >= 100) {
        player.coins -= 100;
        let r = Math.random();
        if(r > 0.7) {
            player.power++;
            alert("SKRZYNKA: Ulepszenie Mocy! Masz teraz poziom " + player.power);
        } else {
            let gift = Math.floor(Math.random() * 50) + 20;
            player.coins += gift;
            alert("SKRZYNKA: Znalazłeś " + gift + " monet!");
        }
        updateTopBar();
    } else {
        alert("Za mało monet!");
    }
}

// --- ALEJA PUCHARÓW ---
function renderRoad() {
    const roadDiv = document.getElementById('road-items');
    roadDiv.innerHTML = '';
    roadRewards.forEach((item, index) => {
        let div = document.createElement('div');
        div.className = `road-item ${player.trophies >= item.trophies ? 'unlocked' : ''}`;
        div.innerHTML = `<span>${item.trophies}🏆 - ${item.reward}</span>`;
        if(player.trophies >= item.trophies && player.roadProgress <= index) {
            let btn = document.createElement('button');
            btn.innerText = "ODBIERZ";
            btn.onclick = () => {
                if(item.type === 'coins') player.coins += item.amount;
                if(item.type === 'char') { player.charName = item.name; alert("Masz nową postać!"); }
                player.roadProgress++;
                renderRoad();
                updateTopBar();
            };
            div.appendChild(btn);
        }
        roadDiv.appendChild(div);
    });
}

function updateTopBar() {
    document.getElementById('tropy-val').innerText = player.trophies;
    document.getElementById('coin-val').innerText = player.coins;
    document.getElementById('xp-val').innerText = player.xp;
    document.getElementById('char-power').innerText = player.power;
    document.getElementById('current-name').innerText = player.charName;
    
    // Prosty pasek karnetu
    let progress = (player.xp % 100);
    document.getElementById('xp-fill').style.width = progress + "%";
}

updateTopBar();
