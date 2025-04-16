let Money = document.querySelector('.money-number');
let parsedMoney = parseFloat(Money.innerHTML);
let Clickercost = document.querySelector('.Clicker-cost');
let parsedClickercost = parseFloat(Clickercost.innerHTML);
let clickerLevel = document.querySelector(".clicker-level");
let clickerIncrease = document.querySelector(".clicker-increase");
let parsedClickerIncrease = parseFloat(clickerIncrease.innerHTML);
let emileLevel = 0;
let emileIncomePerLevel = 0.5;

let miloLevel = 0;
let miloIncomePerLevel = 0.1; // Tu peux ajuster ici !

let mpc = 1;

function incrementMoney() {
    let currentMoney = parseFloat(Money.innerHTML) || 0;
    currentMoney += mpc;
    Money.innerHTML = Math.round(currentMoney);
}

function buyClicker() {
    let currentMoney = parseFloat(Money.innerHTML) || 0;

    if (currentMoney >= parsedClickercost) {
        currentMoney -= parsedClickercost;
        Money.innerHTML = Math.round(currentMoney);

        let currentLevel = parseInt(clickerLevel.innerHTML) || 0;
        currentLevel += 1;
        clickerLevel.innerHTML = currentLevel;

        // Gérer le style Launis
        let upgradeBox = document.querySelector('.upgrade'); // La première upgrade = Launis
        if (currentLevel >= 50) {
            upgradeBox.classList.remove('level-10');
            upgradeBox.classList.add('level-50');
        } else if (currentLevel >= 10) {
            upgradeBox.classList.remove('level-50');
            upgradeBox.classList.add('level-10');
        } else {
            upgradeBox.classList.remove('level-10', 'level-50');
        }

        // 👉 Afficher Milo quand Launis atteint le niveau 10
        if (currentLevel === 10) {
            document.querySelector('.upgrade.milo').classList.remove('hidden');
        }

        // Améliorations
        parsedClickerIncrease = parseFloat((parsedClickerIncrease * 1.03).toFixed(2));
        clickerIncrease.innerHTML = parsedClickerIncrease;
        mpc += parsedClickerIncrease;

        parsedClickercost *= 1.2;
        Clickercost.innerHTML = Math.round(parsedClickercost);
    }
}

function buyMilo() {
    let currentMoney = parseFloat(Money.innerHTML) || 0;
    let miloCostElement = document.querySelector('.Milo-cost');
    let miloLevelElement = document.querySelector('.Milo-level');
    let miloIncreaseElement = document.querySelector('.Milo-increase');
    
    let miloBox = document.querySelector('.upgrade.milo');
    if (miloLevel >= 50) {
        miloBox.classList.remove('level-10');
        miloBox.classList.add('level-50');
    } else if (miloLevel >= 10) {
        miloBox.classList.remove('level-50');
        miloBox.classList.add('level-10');
    } else {
        miloBox.classList.remove('level-10', 'level-50');
    }
    
    let miloCost = parseFloat(miloCostElement.innerHTML) || 10;

    if (currentMoney >= miloCost) {
        // Paiement
        currentMoney -= miloCost;
        Money.innerHTML = Math.round(currentMoney);

        // Augmentation du niveau
        miloLevel += 1;
        miloLevelElement.innerHTML = miloLevel;

        // Faire apparaître Emile quand Milo atteint le niveau 50
        if (miloLevel === 50) {
            document.querySelector('.upgrade.emile').classList.remove('hidden');
        }

        // MAJ de l'affichage du gain par seconde
        miloIncreaseElement.innerHTML = (miloLevel * miloIncomePerLevel).toFixed(2);

        // Augmentation du coût
        miloCost *= 1.2;
        miloCostElement.innerHTML = Math.round(miloCost);
    }
}

// ✅ Interval EN DEHORS de la fonction
setInterval(() => {
    let income = miloLevel * miloIncomePerLevel;
    let currentMoney = parseFloat(Money.innerHTML) || 0;
    currentMoney += income;
    Money.innerHTML = Math.round(currentMoney);
}, 1000); // chaque seconde

setInterval(() => {
    let income = miloLevel * miloIncomePerLevel + emileLevel * emileIncomePerLevel;
    let currentMoney = parseFloat(Money.innerHTML) || 0;
    currentMoney += income;
    Money.innerHTML = Math.round(currentMoney);

    // MAJ affichage MPS (optionnel)
    document.getElementById("mps-display").innerText = income.toFixed(2);
}, 1000);

function mettreAJourStats() {
    document.getElementById('mpc-display').innerText = mpc.toFixed(2);
    let mps = miloLevel * miloIncomePerLevel;
    document.getElementById('mps-display').innerText = mps.toFixed(2);
}

setInterval(mettreAJourStats, 500); // met à jour toutes les 0.5 seconde

function buyEmile() {
    let currentMoney = parseFloat(Money.innerHTML) || 0;
    let emileCostElement = document.querySelector('.emile-cost');
    let emileLevelElement = document.querySelector('.emile-level');
    let emileIncreaseElement = document.querySelector('.emile-increase');

    let emileCost = parseFloat(emileCostElement.innerHTML) || 10;

    if (currentMoney >= emileCost) {
        // Paiement
        currentMoney -= emileCost;
        Money.innerHTML = Math.round(currentMoney);

        // Augmentation du niveau
        emileLevel += 1;
        emileLevelElement.innerHTML = emileLevel;

        // MAJ de l'affichage du gain par seconde
        emileIncreaseElement.innerHTML = (emileLevel * emileIncomePerLevel).toFixed(2);

        // Augmentation du coût
        emileCost *= 1.2;
        emileCostElement.innerHTML = Math.round(emileCost);

        // Styles comme Launis
        let emileBox = document.querySelector('.upgrade.emile');
        if (emileLevel >= 50) {
            emileBox.classList.remove('level-10');
            emileBox.classList.add('level-50');
        } else if (emileLevel >= 10) {
            emileBox.classList.remove('level-50');
            emileBox.classList.add('level-10');
        } else {
            emileBox.classList.remove('level-10', 'level-50');
        }
    }
}

// Ajout des revenus d'Emile chaque seconde
setInterval(() => {
    let income = emileLevel * emileIncomePerLevel;
    let currentMoney = parseFloat(Money.innerHTML) || 0;
    currentMoney += income;
    Money.innerHTML = Math.round(currentMoney);

    // MAJ MPS (argent par seconde total)
    let mps = miloLevel * miloIncomePerLevel + emileLevel * emileIncomePerLevel;
    document.getElementById("mps-display").innerHTML = mps.toFixed(2);
}, 1000);
