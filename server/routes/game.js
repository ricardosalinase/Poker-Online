let handCalculator = require('./handcalc')
let handCompare = require('./handcompare')

const pokerDict =
    {
        1: 'High Card',
        2: 'One Pair',
        3: 'Two pairs',
        4: 'Three of a Kind',
        5: 'Straight',
        6: 'Flush',
        7: 'Full-House',
        8: 'Poker',
        9: 'Straight-Flush',
        10: 'Royal Flush!!'
    }
    
function startGame(handP1, handP2) {
    let ret = {};
    console.log('Player 1 Cards', handP1);
    console.log('Player 2 Cards', handP2);
    
    //get strength
    let strengthHandP1 = handCalculator.getHandStrength(handP1);
    let strengthHandP2 = handCalculator.getHandStrength(handP2);

    ret = {
        'player1': {
            'hand': handP1,
            'game': pokerDict[strengthHandP1.power],
            'cards': strengthHandP1.cards
        },
        'player2': {
            'hand': handP2,
            'game': pokerDict[strengthHandP2.power],
            'cards': strengthHandP2.cards
        },
        //compare the strength of both hands
        'winner': handCompare.getWinner(strengthHandP1, strengthHandP2)
    }
    return ret;
}
module.exports = {
    startGame: startGame
}