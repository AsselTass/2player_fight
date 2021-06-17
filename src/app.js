//The game map 
var map = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

];
//The game objects map 
var gameObjects = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [4, 0, 0, 0, 0, 0, 0, 0, 0, 5]
];
//Map code   
var WATER = 0;
var ISLAND = 1;
var BLOCK = 2;
var WEAPON2 = 3;
var WEAPON3 = 6;
var WEAPON4 = 7;
var SHIP = 4;
var MONSTER = 5;

var move = 0;
var move2 = 0;
var alert0 = 0;
//The size of each cell 
var SIZE = 64;
//The number of rows and columns 
var ROWS = 10;
var COLUMNS = 10;
//Arrow key codes 
var UP = 38;
var DOWN = 40;
var RIGHT = 39;
var LEFT = 37;
//Fight/defend checking variables
var fight1 = 32;
var fight2 = 13;
var defend1 = 17;
var defend2 = 110;
var enemyIsNear = 0;
var have_shot1 = 0;
var have_shot2 = 0;
var have_defended1 = 0;
var have_defended2 = 0;
//Find the ship's start position 
var shipRow;
var shipColumn;
//Find the monster's position
var monsterRow;
var monsterColumn;
class User {
    constructor(weapon, life) {
        this.weapon = weapon;
        this.life = life;
    }
    changeWeapon(weapon) {
        this.weapon = weapon;
    }
    reduceLife(weapon) {
        this.life = this.life - weapon;
    }
}
var user1 = new User("10", "100");
var user2 = new User("10", "100");
var temp = 0;
$(function() {
    console.log("ready!");
    $('button').on('click', function() {
        $("p").remove();
        $('button').remove();
        init_game();
        mapGenerator();
        render();
        renderText();
    });
});
$(window).on('keydown', function(e) {
    keydownHandler(e);
});

function init_game() {
    //empty arrays map and gameObjects
    for (var row = 0; row < ROWS; row++) {
        for (var column = 0; column < COLUMNS; column++) {
            map[row][column] = 0;
        }
    }
    for (var row = 0; row < ROWS; row++) {
        for (var column = 0; column < COLUMNS; column++) {
            gameObjects[row][column] = 0;
        }
    }
    //Generate random position for user1
    for (x = 0; x < 1; x++) {
        val1 = getRandom(0, 10);
        val2 = getRandom(0, 10);
		if (map[val1][val2] == 0) {
            gameObjects[val1][val2] = 4;
        } else {
            var result = assignValue(val1, val2);
            gameObjects[result[0]][result[1]] = 4;
        }
    }
    //Generate random position for user2
    for (x = 0; x < 1; x++) {
        val1 = getRandom(0, 10);
        val2 = getRandom(0, 10);
		if (map[val1][val2] == 0) {
            gameObjects[val1][val2] = 5;
        } else {
            var result = assignValue(val1, val2);
            gameObjects[result[0]][result[1]] = 5;
        }
    }
    user1.life = 100;
    user2.life = 100;
    user1.weapon = 10;
    user2.weapon = 10;
    move = 0;
    move2 = 0;
}

function mapGenerator() {
	//Generating map without conflicts with other objects
    var val1, val2;
    for (x = 0; x < 1; x++) {
        val1 = getRandom(0, 10);
        val2 = getRandom(0, 10);
        if (map[val1][val2] == 0) {
			if (gameObjects[val1][val2]==4 || gameObjects[val1][val2]==5)
			{
				var result = assignValue(val1, val2);
				map[result[0]][result[1]] = 1;
			}else{
            map[val1][val2] = 1;
			}
        } else {
            var result = assignValue(val1, val2);
            map[result[0]][result[1]] = 1;
        }
    }
    for (x = 0; x < 1; x++) {
        val1 = getRandom(0, 10);
        val2 = getRandom(0, 10);
        if (map[val1][val2] == 0) {
            if (gameObjects[val1][val2]==4 || gameObjects[val1][val2]==5)
			{
				var result = assignValue(val1, val2);
				map[result[0]][result[1]] = 3;
			}else{
            map[val1][val2] = 3;
			}
        } else {
            var result = assignValue(val1, val2);
            map[result[0]][result[1]] = 3;
        }
    }
    for (x = 0; x < 1; x++) {
        val1 = getRandom(0, 10);
        val2 = getRandom(0, 10);
        if (map[val1][val2] == 0) {
			if (gameObjects[val1][val2]==4 || gameObjects[val1][val2]==5)
			{
				var result = assignValue(val1, val2);
				map[result[0]][result[1]] = 6;
			}else{
            map[val1][val2] = 6;
			}
        } else {
            var result = assignValue(val1, val2);
            map[result[0]][result[1]] = 6;
        }
    }
    for (x = 0; x < 1; x++) {
        val1 = getRandom(0, 10);
        val2 = getRandom(0, 10);
        if (map[val1][val2] == 0) {
            if (gameObjects[val1][val2]==4 || gameObjects[val1][val2]==5)
			{
				var result = assignValue(val1, val2);
				map[result[0]][result[1]] = 7;
			}else{
            map[val1][val2] = 7;
			}
        } else {
            var result = assignValue(val1, val2);
            map[result[0]][result[1]] = 7;
        }
    }
    for (x = 0; x < 8; x++) {
        val1 = getRandom(0, 10);
        val2 = getRandom(0, 10);
        if (map[val1][val2] == 0) {
            if (gameObjects[val1][val2]==4 || gameObjects[val1][val2]==5)
			{
				var result = assignValue(val1, val2);
				map[result[0]][result[1]] = 2;
			}else{
            map[val1][val2] = 2;
			}
        } else {
            var result = [];
            result = assignValue(val1, val2);
            console.log(result);
            var result1 = result[0];
            var result2 = result[1];
            map[result1][result2] = 2;
        }
    }
    for (var row = 0; row < ROWS; row++) {
        for (var column = 0; column < COLUMNS; column++) {
            if (gameObjects[row][column] === SHIP) {
                shipRow = row;
                shipColumn = column;
				console.log("ship row, column is:" + shipRow +shipColumn);
            }
            if (gameObjects[row][column] === MONSTER) {
                monsterRow = row;
                monsterColumn = column;
                console.log("monster column is:" + monsterColumn);
            }
        }
    }
}

function getRandom(min, max) {
    var x = Math.floor((Math.random() * max) + min);
    return x;
}

function assignValue(val1, val2) {
    if (map[val1][val2] == 0 && gameObjects[val1][val2] != 4 && gameObjects[val1][val2] != 5) {
        var arr = [val1, val2];
        console.log(arr);
        return arr;
    }else {
		console.log("Old array:" + val1+ ", "+ val2);
        val1 = getRandom(0, 10);
        val2 = getRandom(0, 10);
		console.log("Have visited reassigning recursion. New array:" + val1+ ", "+ val2);
        return assignValue(val1, val2);
    }
}
console.log("Everything is initialized!");
//window.addEventListener("keydown", keydownHandler, false);

function render() {
    console.log("Rendering process started");
    //Clear the stage of img cells from the previous turn 
    if ($('.main').children().length > 0) {
        for (var i = 0; i < ROWS * COLUMNS; i++) {
            //$("$main").removeChild(stage.firstChild); 
            $('.main').find(':first-child').remove();
        }
    }
    //Render the game by looping through the map arrays 
    for (var row = 0; row < ROWS; row++) {
        for (var column = 0; column < COLUMNS; column++) {
            //Create an img tag called cell 
            //Set its CSS class to "cell" 
            //Add the img tag to the <div id="stage"> tag 
            var cell = $('<img />').attr({
                'class': 'cell',
            }).appendTo('.main');

            //Find the correct image for this map cell 
            switch (map[row][column]) {
                case WATER:
                    cell.attr("src", "images/background.png");
                    break;
                case ISLAND:
                    cell.attr("src", "images/cut-lemon.png");
                    break;
                case BLOCK:
                    cell.attr("src", "images/blocks.png");
                    break;
                case WEAPON2:
                    cell.attr("src", "images/chili-pepper.png");
                    break;
                case WEAPON3:
                    cell.attr("src", "images/garlic.png");
                    break;
                case WEAPON4:
                    cell.attr("src", "images/apple-maggot.png");
                    break;
            }
            //Add the ship from the gameObjects array 
            switch (gameObjects[row][column]) {
                case SHIP:
                    cell.attr("src", "images/sailboat.png");
                    break;
                case MONSTER:
                    cell.attr("src", "images/monster.png");
                    break;
            }

            //Position the cell 

            cell.css({
                'top': row * SIZE + 40 + 'px'
            });

            cell.css({
                'left': column * SIZE + 440 + 'px'
            });

        }

    }
}

function renderText() {
    $('.aside-1').text("Life:" + user1.life);
    //Display the game message 
    // output.innerHTML = gameMessage; 
    //Display the player's food, gold, and experience 
    //output.innerHTML += "<br>Gold: " + gold + ", Food: " + food + ", Experience: " + experience; 
    $('.aside-1').append("<br>weapon power:" + user1.weapon);
    $('.aside-2').text("Life:" + user2.life);
    $('.aside-2').append("<br>weapon power:" + user2.weapon);
}

function keydownHandler(event) {
    console.log("Button pressed");

    switch (event.keyCode) {
        case UP:
            //Find out if the ship's move will be within the playing field 
            if (shipRow > 0) {
                if (move < 3) {
                    //If it is, clear the ship's current cell 
                    if (map[shipRow - 1][shipColumn] == BLOCK) {
                        console.log("P is near");
                        break;
                    } else if (gameObjects[shipRow - 1][shipColumn] == MONSTER) {
                        enemyIsNear = 1;
                        break;
                    } else {
                        gameObjects[shipRow][shipColumn] = 0;
                        //Subtract 1 from the ship's row to move it up one row on the map 
                        shipRow--;
                        //Apply the ship's new updated position to the array 
                        gameObjects[shipRow][shipColumn] = SHIP;
                        move++;
                        move2 = 0;
                        have_shot1 = 0;
                        have_defended1 = 0;
                        enemyIsNear = 0;
                        alert0 = 0;
                    }
                }
            }
            break;
        case DOWN:
            if (shipRow < ROWS - 1) {
                if (move < 3) {
                    if (map[shipRow + 1][shipColumn] == BLOCK) {
                        console.log("P is near");
                        break;
                    } else if (gameObjects[shipRow + 1][shipColumn] == MONSTER) {
                        console.log("That is position of ship");
                        enemyIsNear = 1;
                        break;
                    } else {
                        console.log(map[shipRow + 1][shipColumn]);
                        gameObjects[shipRow][shipColumn] = 0;
                        shipRow++;
                        gameObjects[shipRow][shipColumn] = SHIP;
                        move++;
                        move2 = 0;
                        have_shot1 = 0;
                        have_defended1 = 0;
                        enemyIsNear = 0;
                        alert0 = 0;
                    }
                }
            }
            break;
        case LEFT:
            if (shipColumn > 0) {
                if (move < 3) {
                    if (map[shipRow][shipColumn - 1] == BLOCK) {
                        console.log("P is near");
                        break;
                    } else if (gameObjects[shipRow][shipColumn - 1] == MONSTER) {
                        console.log("That is position of ship");
                        enemyIsNear = 1;
                        break;
                    } else {
                        console.log(map[shipRow][shipColumn - 1]);
                        gameObjects[shipRow][shipColumn] = 0;
                        shipColumn--;
                        gameObjects[shipRow][shipColumn] = SHIP;
                        move++;
                        move2 = 0;
                        have_shot1 = 0;
                        have_defended1 = 0;
                        enemyIsNear = 0;
                        alert0 = 0;
                    }
                }
            }
            break;
        case RIGHT:
            if (shipColumn < COLUMNS - 1) {
                if (move < 3) {
                    if (map[shipRow][shipColumn + 1] == BLOCK) {
                        console.log("P is near");
                        break;
                    } else if (gameObjects[shipRow][shipColumn + 1] == MONSTER) {
                        console.log("That is position of ship");
                        enemyIsNear = 1;
                        break;
                    } else {

                        console.log(map[shipRow][shipColumn + 1]);
                        gameObjects[shipRow][shipColumn] = 0;
                        shipColumn++;
                        gameObjects[shipRow][shipColumn] = SHIP;
                        move++;
                        move2 = 0;
                        have_shot1 = 0;
                        have_defended1 = 0;
                        enemyIsNear = 0;
                        alert0 = 0;
                    }
                }
            }
            break;
    }
    //Find out what kind of cell the ship is on 
    switch (map[shipRow][shipColumn]) {
        case WATER:
            gameMessage = "You sail the open seas."
            break;
        case ISLAND:
            user1.changeWeapon(15);
            renderText();
            break;
        case WEAPON2:
            user1.changeWeapon(20);
            renderText();
            break;
        case WEAPON3:
            user1.changeWeapon(25);
            renderText();
            break;
        case WEAPON4:
            user1.changeWeapon(30);
            renderText();
            break;

    }
    if (move < 4) {
        moveMonster(event);
    }
    //Render the game 
    render();
    if (check() == true) {
        fight(event);
        console.log("Check value: " + check());
    }
}

function moveMonster(event) {
    //The 4 possible directions that the monster can move 
    var UP = 104;
    var DOWN = 98;
    var LEFT = 100;
    var RIGHT = 102;

    switch (event.keyCode) {
        case UP:
            //Find out if the ship's move will be within the playing field 
            if (monsterRow > 0) {
                if (move2 < 3) {
                    if (map[monsterRow - 1][monsterColumn] == BLOCK) {
                        console.log("P is near");
                        break;
                    } else if (gameObjects[monsterRow - 1][monsterColumn] == SHIP) {
                        console.log("That is position of ship");
                        enemyIsNear = 1;
                        break;
                    } else {
                        //If it is, clear the ship's current cell 
                        gameObjects[monsterRow][monsterColumn] = 0;
                        //Subtract 1 from the ship's row to move it up one row on the map 
                        monsterRow--;
                        //Apply the ship's new updated position to the array 
                        gameObjects[monsterRow][monsterColumn] = MONSTER;
                        console.log("monster new position:row, col" + monsterRow + "," + monsterColumn);
                        move = 0;
                        move2++;
                        have_shot2 = 0;
                        have_defended2 = 0;
                        enemyIsNear = 0;
                        alert0 = 0;
                    }
                }
            }
            break;
        case DOWN:
            if (monsterRow < ROWS - 1) {
                if (move2 < 3) {
                    if (map[monsterRow + 1][monsterColumn] == BLOCK) {
                        console.log("P is near");
                        break;
                    } else if (gameObjects[monsterRow + 1][monsterColumn] == SHIP) {
                        console.log("That is position of ship");
                        enemyIsNear = 1;
                        break;
                    } else {
                        gameObjects[monsterRow][monsterColumn] = 0;
                        monsterRow++;
                        gameObjects[monsterRow][monsterColumn] = MONSTER;
                        console.log("monster new position:row, col" + monsterRow + "," + monsterColumn);
                        move = 0;
                        move2++;
                        have_shot2 = 0;
                        have_defended2 = 0;
                        enemyIsNear = 0;
                        alert0 = 0;
                    }
                }
            }
            break;
        case LEFT:
            if (monsterColumn > 0) {
                if (move2 < 3) {
                    if (map[monsterRow][monsterColumn - 1] == BLOCK) {
                        console.log("P is near");
                        break;
                    } else if (gameObjects[monsterRow][monsterColumn - 1] == SHIP) {
                        console.log("That is position of ship");
                        enemyIsNear = 1;
                        break;
                    } else {
                        gameObjects[monsterRow][monsterColumn] = 0;
                        monsterColumn--;
                        gameObjects[monsterRow][monsterColumn] = MONSTER;
                        console.log("monster new position:row, col" + monsterRow + "," + monsterColumn);
                        move = 0;
                        move2++;
                        have_shot2 = 0;
                        have_defended2 = 0;
                        enemyIsNear = 0;
                        alert0 = 0;
                    }
                }
            }
            break;
        case RIGHT:
            if (monsterColumn < COLUMNS - 1) {
                if (move2 < 3) {
                    if (map[monsterRow][monsterColumn + 1] == BLOCK) {
                        console.log("P is near");
                        break;
                    } else if (gameObjects[monsterRow][monsterColumn + 1] == SHIP) {
                        console.log("That is position of ship");
                        enemyIsNear = 1;
                        break;
                    } else {
                        gameObjects[monsterRow][monsterColumn] = 0;
                        monsterColumn++;
                        gameObjects[monsterRow][monsterColumn] = MONSTER;
                        console.log("monster new position:row, col" + monsterRow + "," + monsterColumn);
                        move = 0;
                        move2++;
                        have_shot2 = 0;
                        have_defended2 = 0;
                        enemyIsNear = 0;
                        alert0 = 0;
                    }
                }
            }
            break;
    }
    //Find out what kind of cell the ship is on 
    switch (map[monsterRow][monsterColumn]) {
        case WATER:
            gameMessage = "You sail the open seas."
            break;
        case ISLAND:
            user2.changeWeapon(15);
            renderText();
            break;
        case WEAPON2:
            user2.changeWeapon(20);
            renderText();
            break;
        case WEAPON3:
            user2.changeWeapon(25);
            renderText();
            break;
        case WEAPON4:
            user2.changeWeapon(30);
            renderText();
            break;
    }

}

function check() {
    var monsterColumnTemp1 = monsterColumn - 1;
    var monsterColumnTemp2 = monsterColumn + 1;
    var monsterRowTemp1 = monsterRow - 1;
    var monsterRowTemp2 = monsterRow + 1;
    console.log("checking!");
    //Find out if the ship is same row with the monster 
    if (shipRow == monsterRow && (shipColumn == monsterColumnTemp1)) {
        console.log("shipRow" + shipRow);
        console.log("monsterRow" + monsterRow);
        console.log("shipColumn" + shipColumn);
        console.log("monsterColumn-1:" + monsterColumnTemp1);
        enemyIsNear = 1;
        console.log("EnemyStatus:" + enemyIsNear + ".Thus sending to fight function!");
        return true;
    }
    if (shipRow == monsterRow && (shipColumn == monsterColumnTemp2)) {
        console.log("shipRow" + shipRow);
        console.log("monsterRow" + monsterRow);
        console.log("shipColumn" + shipColumn);
        console.log("monsterColumn+1:" + monsterColumnTemp2);
        enemyIsNear = 1;
        console.log("EnemyStatus:" + enemyIsNear + ".Thus sending to fight function!");
        return true;

    }
    //Find out if the ship is same column with the monster 
    if (shipColumn == monsterColumn && (shipRow == monsterRowTemp1)) {
        console.log("shipRow" + shipRow);
        console.log("monsterRow-1:" + monsterRowTemp1);
        console.log("shipColumn" + shipColumn);
        console.log("monsterColumn" + monsterRow);
        enemyIsNear = 1;
        console.log("EnemyStatus:" + enemyIsNear + ".Thus sending to fight function!");
        return true;
        ///}
    }
    if (shipColumn == monsterColumn && (shipRow == monsterRowTemp2)) {
        console.log("shipRow" + shipRow);
        console.log("monsterRow+1:" + monsterRowTemp1);
        console.log("shipColumn" + shipColumn);
        console.log("monsterColumn" + monsterColumn);
        enemyIsNear = 1;
        console.log("EnemyStatus:" + enemyIsNear + ".Thus sending to fight function!");
        return true;
    }
    return false;
}

var space = 0;

function fight(e) {

    if (alert0 == 0) {
        alert("Fight begun!");
        alert0 = 1;
    }
    console.log("in fight mode!");
    switch (e.keyCode) {
        case fight1:
            if (have_shot1 == 0 || have_shot2 == 1) {
                if (have_defended2 == 1) {
                    reduceHalfHealth(user1, user2);
                    have_defended2 = 0;
                } else {
                    reduceHealth(user1, user2);
                }
                have_shot1 = 1;
                have_shot2 = 0;
                space++;
                console.log("Presses space number" + space);
            }
            break;
        case defend1:
            have_defended1 = 1;
            break;
        case fight2:
            if (have_shot2 == 0 || have_shot1 == 1) {
                if (have_defended1 == 1) {
                    reduceHalfHealth(user2, user1);
                    have_defended1 = 0;
                } else {
                    reduceHealth(user2, user1);
                }
                have_shot2 = 1;
                have_shot1 = 0;
            }
            break;
        case defend2:
            have_defended2 = 1;
            break;
    }
}

function reduceHealth(u1, u2) {
    if (enemyIsNear == 1) {
        if (u2.life >= u1.weapon) {
            u2.reduceLife(u1.weapon);
            renderText();
        } else {
            u2.reduceLife(u2.life);
        }
        if (u2.life == 0) {
            renderText();
            gameOver();
        }
    }
}

function reduceHalfHealth(u1, u2) {
    if (enemyIsNear == 1) {
        if (u2.life >= u1.weapon / 2) {
            u2.reduceLife(u1.weapon / 2);
            renderText();
        } else {
            u2.reduceLife(u2.life);
        }
        if (u2.life == 0) {
            renderText();
            gameOver();
        }
    }

}

function gameOver() {
    if (have_shot1 == 0) {
        alert("USER1 won! Congradulations! Restart the game!");
    }
    if (have_shot2 == 0) {
        alert("USER2 won! Congradulations! Restart the game!");
    }
    $(".main").empty();
    $('.aside-1').empty();
    $('.aside-2').empty();
    $('img').removeAttr('src');
    $('img').remove();
    $('img.cell').remove();
    console.log("Main is empty:" + $('.main').is(':empty'));
    console.log("Img is empty:" + $('img').is(':empty'));
    console.log("Check if main contains img" + $('.main').has('img').length);
    console.log("Old map:");
    for (var row = 0; row < ROWS; row++) {
        for (var column = 0; column < COLUMNS; column++) {
            console.log(map[row][column]);
        }
    }
    init_game();
    console.log("Map after zero:");
    for (var row = 0; row < ROWS; row++) {
        for (var column = 0; column < COLUMNS; column++) {
            console.log(map[row][column]);
        }
    }
    mapGenerator();
    console.log("New map generating:");
    for (var row = 0; row < ROWS; row++) {
        for (var column = 0; column < COLUMNS; column++) {
            console.log(" " + map[row][column]);
        }
    }
    render();
    renderText();
}