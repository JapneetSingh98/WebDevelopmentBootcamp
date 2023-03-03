const numAttackMax = 3;
const numDefenceMax = 2;

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

function displayDice(numAttack, numDefence) {
    let attackRolls = getRolls(numAttack);
    let defenceRolls = getRolls(numDefence);

    let attackLose = 0;
    let defenceLose = 0;
    for (let i = 0; i < numDefence; i++) {
        if (attackRolls[i] > defenceRolls[i]) {
            defenceLose++;
        } else {
            attackLose++;
        }
    }
    let outcome1 = null;
    let outcome2 = null;
    if (attackLose === defenceLose) {
        outcome1 = "Both players lose " + attackLose + " army";
    } else {
        outcome1 = "Attacking player loses " + attackLose + " army."
        outcome2 = "Defending player loses " + defenceLose + " army."
    }
    document.querySelector(".outcome1").innerHTML = outcome1;
    document.querySelector(".outcome2").innerHTML = outcome2;

    showDice(".attackDice img", numAttackMax, numAttack, attackRolls);
    showDice(".defenceDice img", numDefenceMax, numDefence, defenceRolls);
}


let numAttack = null;
let numDefence = null;
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
    numDefence = 1;
} else {
    while (numDefence === null) {
        numDefence = prompt("1 or 2 Defence Dice?");
        if (numDefence == "1" || numDefence == "2") {
            numDefence = parseInt(numDefence);
        } else {
            numDefence = null;
            alert("You must enter 1 or 2");
        }
    }
}

displayDice(numAttack, numDefence);