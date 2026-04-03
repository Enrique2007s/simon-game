/**
 * @jest-environment jsdom
 */

const { test, beforeAll } = require('@jest/globals');
const { game, newGame, showScore, addTurn, lightsOn, showTurns, playerTurn } = require('../game')

jest.spyOn(window, 'alert').mockImplementation(() => {});

beforeAll(() => {
    let fs = require('fs');
    let fileContents = fs.readFileSync('index.html', 'utf8');
    document.body.innerHTML = fileContents;
});

describe("Game object contains correct keys", () => {
    test("Score key exists", () => {
        expect ('score' in game).toBe(true);
    });

    test("currentGame key exists", () => {
        expect ('currentGame' in game).toBe(true);
    });

    test("playerMoves key exists", () => {
        expect ('playerMoves' in game).toBe(true);
    });

    test("choices key exists", () => {
        expect ('choices' in game).toBe(true);
    });

    test("choices contains correct buttons", () => {
        expect(game.choices).toEqual(['button1', 'button2', 'button3', 'button4']);
    });

    test("addTurn adds a valid turn to the game", () => {
        expect("turnNumber" in game).toBe(true);
    });
});

describe("newGame works correctly", () => {
    beforeAll(() => {
        game.score = 42;
        game.playerMoves = ['button1', 'button2'];
        game.currentGame = ['button1', 'button2'];

        document.getElementById('score').innerText = '42';
        newGame();
    });

    test("score is set to zero", () => {
        expect(game.score).toEqual(0);
    });

    test("Should be one move in the computers array", () => {
        expect(game.currentGame.length).toBe(1);
    });

    test("playerMoves is set to empty array", () => {
        expect(game.playerMoves.length).toBe(0);
    });

    test("score element in DOM is set to zero", () => {
        expect(Number(document.getElementById("score").innerText)).toBe(0);
    });

    test("expect data-listener to be true", () => {
        const elements = document.getElementsByClassName('circle');
        for (let element of elements) {
            expect(element.getAttribute('data-listener')).toBe('true');
        }
    });
});

describe("Gameplay works correctly", () => {
    beforeEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
        addTurn();
    });
    afterEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
    });

    test("addTurn adds a new turn to the game", () => {
        addTurn();
        expect(game.currentGame.length).toBe(2);
    });

    test("Should add correct class to light up the buttons", () => {
        let button = document.getElementById(game.currentGame[0]);
        lightsOn(game.currentGame[0]);
        expect(button.classList).toContain("light");
    });

    test("Showturns should update gameTurn number", () => {
        game.turnNumber = 42;
        showTurns();
        expect(game.turnNumber).toBe(0);
    });
    test("Should increment the score if the player move is correct", () => {
        game.playerMoves.push(game.currentGame[0]);
        playerTurn();
        expect(game.score).toBe(1);
    });

    test("Should call alert if the player move is wrong", () => {
        game.playerMoves.push('wrong');
        playerTurn();
        expect(window.alert).toHaveBeenCalledWith("Wrong move!");
    });
});
