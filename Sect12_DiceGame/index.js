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

function displayDice() {
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

function checkAttack(numAttackEntered) {
    numAttack = numAttackEntered;
    enableRoll();
}

function checkDefense(numDefenseEntered) {
    numDefense = numDefenseEntered;
    enableRoll();
}

function enableRoll() {
    if (numAttack != null && numDefense != null) {
        document.querySelector("button").removeAttribute("disabled");
    }
}