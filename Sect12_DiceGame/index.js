const numAttackMax = 3;
const numDefenseMax = 2;

function getRolls(numDice) {
    let rolls = [];
    for (let i = 0; i < numDice; i++) {
        rolls[i] = Math.floor(Math.random()*6) + 1;
    }
    rolls.sort();
    rolls.reverse();

    return rolls;
}

function showDice(selector, max, numDice, rolls) {
    console.log(selector, max, numDice);
    let dice = document.querySelectorAll(selector);
    console.log(dice);
    for (let i = 0; i < max; i++) {
        if (i+1 > numDice) {
            dice[i].style.display = "none";
        } else {
            let source = "images/dice" + String(rolls[i]) + ".png";
            console.log(dice[i]);
            dice[i].src = source;
        }
    }
}

function displayDice(numAttack, numDefense) {
    let attackRolls = getRolls(numAttack);
    let defenseRolls = getRolls(numDefense);

    let attackLose = 0;
    let defenseLose = 0;
    for (let i = 0; i < numDefense; i++) {
        if (attackRolls[i] > defenseRolls[i]) {
            defenseLose++;
        } else {
            attackLose++;
        }
    }
    let outcome1 = null;
    let outcome2 = null;
    if (attackLose === defenseLose) {
        outcome1 = "Both players lose " + attackLose + " army";
    } else {
        outcome1 = "Attacking player loses " + attackLose + " army."
        outcome2 = "Defending player loses " + defenseLose + " army."
    }
    document.querySelector(".outcome1").innerHTML = outcome1;
    document.querySelector(".outcome2").innerHTML = outcome2;

    showDice(".attackDice img", numAttackMax, numAttack, attackRolls);
    showDice(".defenseDice img", numDefenseMax, numDefense, defenseRolls);
}


let numAttack = null;
let numDefense = null;
while (numAttack === null) {
    numAttack = prompt("How many Attack Dice?");
    if (numAttack == "1" || numAttack == "2" || numAttack == "3") {
        numAttack = parseInt(numAttack);
    } else {
        numAttack = null;
        alert("You must enter 1, 2, or 3");
    }
}
if (numAttack === 1) {
    numDefense = 1;
} else {
    while (numDefense === null) {
        numDefense = prompt("1 or 2 Defense Dice?");
        if (numDefense == "1" || numDefense == "2") {
            numDefense = parseInt(numDefense);
        } else {
            numDefense = null;
            alert("You must enter 1 or 2");
        }
    }
}

displayDice(numAttack, numDefense);