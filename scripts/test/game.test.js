/**
 * @jest-environment jsdom
 */

const { test, beforeAll } = require('@jest/globals');
const { game, newGame, showScore } = require('../game')

beforeAll(() => {
    let fs = require('fs');
    let fileContents = fs.readFileSync('./index.html', 'utf8');
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
});

describe("newGame works correctly", () => {
    beforeAll(() => {
        game.score = 42;
        game.currentGame = ['button1', 'button2'];
        game.playerMoves = ['button1', 'button2'];
        document.getElementById('score').innerText = '42';
        newGame();
    });

    test("score is set to zero", () => {
        expect(game.score).toEqual(0);
    });

    test("currentGame is set to empty array", () => {
        expect(game.currentGame).toEqual([]);
    });

    test("playerMoves is set to empty array", () => {
        expect(game.playerMoves).toEqual([]);
    });

    test("score element in DOM is set to zero", () => {
        expect(document.getElementById('score').innerText).toEqual(0);
    });
});