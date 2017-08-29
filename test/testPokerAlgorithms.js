var assert = require("chai").assert;
var compare = require("../server/routes/handcompare");
var handcalc = require("../server/routes/handcalc")
describe("Poker Hands calculation and compare winning tests using ASSERT interface from CHAI module: ", function () {
    describe("Check getWinner Function: ", function () {
        it("Check equal high card hands:", function () {

            let hand1 = [{ number: 'Q', suit: 'clubs' },
            { number: 'A', suit: 'clubs' },
            { number: '7', suit: 'hearts' },
            { number: '6', suit: 'hearts' },
            { number: 'J', suit: 'hearts' }]
            let hand2 = [{ number: '8', suit: 'diamonds' },
            { number: '2', suit: 'spades' },
            { number: 'A', suit: 'diamonds' },
            { number: '5', suit: 'clubs' },
            { number: '3', suit: 'clubs' }]

            handStr1 = handcalc.getHandStrength(hand1);
            handStr2 = handcalc.getHandStrength(hand2);
            result = compare.getWinner(handStr1, handStr2);
            assert.equal(result, 1);
        });
        it("Check greater pair p1 than p2 hands:", function () {

            let hand1 = [{ number: '9', suit: 'diamonds' },
            { number: '7', suit: 'diamonds' },
            { number: '2', suit: 'diamonds' },
            { number: '7', suit: 'clubs' },
            { number: '5', suit: 'clubs' }]
            let hand2 = [{ number: '2', suit: 'hearts' },
            { number: 'K', suit: 'spades' },
            { number: '4', suit: 'hearts' },
            { number: '2', suit: 'clubs' },
            { number: 'A', suit: 'diamonds' }]

            handStr1 = handcalc.getHandStrength(hand1);
            handStr2 = handcalc.getHandStrength(hand2);
            result = compare.getWinner(handStr1, handStr2);
            assert.equal(result, 1);
        });

        it("Check tie with one reference card in combination : ", function () {

            let hand1 = [{ number: '9', suit: 'diamonds' },
            { number: '7', suit: 'diamonds' },
            { number: '2', suit: 'diamonds' },
            { number: '7', suit: 'clubs' },
            { number: '5', suit: 'clubs' }]
            let hand2 = [{ number: '9', suit: 'clubs' },
            { number: '7', suit: 'clubs' },
            { number: '2', suit: 'clubs' },
            { number: '7', suit: 'diamonds' },
            { number: '5', suit: 'diamonds' }]

            handStr1 = handcalc.getHandStrength(hand1);
            handStr2 = handcalc.getHandStrength(hand2);
            console.log('handStr1', handStr1);
            console.log('handStr2', handStr2);
            result = compare.getWinner(handStr1, handStr2);
            assert.equal(result, 0);
        });

        it("Check a flush in hand calculation : ", function () {

            let hand = [{ number: '9', suit: 'diamonds' },
            { number: '7', suit: 'diamonds' },
            { number: '2', suit: 'diamonds' },
            { number: '4', suit: 'diamonds' },
            { number: '5', suit: 'diamonds' }]
            let numbers = hand.map(card => card.number);
            let suits = hand.map(card => card.suit);

            result = handcalc.getHandStrength(hand)
            console.log(result);
            assert.equal(result.power, 6);
        });
        it("Check a royal flush!!:", function () {

            let hand = [{ number: '10', suit: 'diamonds' },
            { number: 'J', suit: 'diamonds' },
            { number: 'Q', suit: 'diamonds' },
            { number: 'K', suit: 'diamonds' },
            { number: 'A', suit: 'diamonds' }]
            let numbers = hand.map(card => card.number);
            let suits = hand.map(card => card.suit);

            result = handcalc.getHandStrength(hand)
            console.log(result);
            assert.equal(result.power, 10);
        });
        it("Check a victory of full house over other full house", function () {

            let hand1 = [{ number: '10', suit: 'diamonds' },
            { number: '10', suit: 'clubs' },
            { number: '7', suit: 'hearts' },
            { number: '7', suit: 'clubs' },
            { number: '10', suit: 'spades' }]
            let hand2 = [{ number: 'J', suit: 'diamonds' },
            { number: 'J', suit: 'clubs' },
            { number: '5', suit: 'hearts' },
            { number: '5', suit: 'clubs' },
            { number: '5', suit: 'spades' }]

            handStr1 = handcalc.getHandStrength(hand1);
            handStr2 = handcalc.getHandStrength(hand2);
            console.log('handStr1', handStr1);
            console.log('handStr2', handStr2);
            result = compare.getWinner(handStr1, handStr2);
            assert.equal(result, 1);
        });
    });
});