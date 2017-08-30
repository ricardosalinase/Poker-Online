var pokerUtils = require('./utils')

//return suit of flush
function getFlush(suits, numbers) {

    var allEqual = arr => arr.every(v => v == arr[0])
    return allEqual(suits) ? numbers[4] : false;
}

//return straight high card
function getStraight(numbers) {

    var strnumber = numbers.toString();
    var strOrder = pokerUtils.order.toString();
    return strOrder.indexOf(strnumber) != -1 ? numbers[4] : false;
}
//return the power and the card if flush,straight or both
function getFiveCombo(flush, straight) {
    if (flush && straight) {
        if (flush == 'A') {
            return [10, 'A'];
        }
        else return [9, flush]
    }
    else if (flush) {
        return [6, flush]
    }
    else if (straight) {
        return [5, straight]
    }
}
//count each freequency card and returned in json
function getHandCount(numbers) {
    var counts = {};
    numbers.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
    return counts;
}
//return if found some combo involucres a repeated card(pair, two pairs, three of a kind, full house, poker)
function getRepeatedCardCombos(handCount) {
    let nPair = 0;
    let pair = [];
    let nThree = 0;
    let three;
    console.log(handCount);
    //check handcount for cards repeateds
    for (var key in handCount) {
        if (handCount.hasOwnProperty(key)) {
            var val = handCount[key];
            if (val == 2) {
                nPair++;
                pair.push(key);
            }
            if (val == 3) {
                nThree++;
                three = key;
            }
            //found poker no need more iterations
            if (val == 4)
                return [8, key];
        }
    }

    //sets cases
    //a pair found
    if (nPair == 1 && nThree == 0) return [2, pair];
    //two pairs (returned in order for a better comparison)
    else if (nPair == 2) {
        if (pokerUtils.order.indexOf(pair[0]) > pokerUtils.order.indexOf(pair[1])) return [3, pair];
        else return [3, [pair[1], pair[0]]];
    }
    //three of a kind 
    else if (nThree == 1 && nPair == 0) return [4, three];
    //full-house
    else if (nPair == 1 && nThree == 1) return [7, [three, pair]];
    //no repeated cards
    else return false;
}
module.exports = {

    /*output: {

        power: the strength of hand{0:10}
        cards: the card(s) which identify the combination (p.e: pairs of 10 = 10, two pairs of 8 and 10) =[8,10]
        hand: the numbers in hands sorted (internal usage in compare hands stage)
    }*/
    getHandStrength: function (hand) {
        let numbers = hand.map(card => card.number);
        let suits = hand.map(card => card.suit);

        //sort numbers for a better handle of what hands is it
        numbers.sort(function (a, b) {
            return pokerUtils.order.indexOf(a) < pokerUtils.order.indexOf(b) ? -1 : 1;
        });

        //found combos with implies a repeated card
        let handCount = getHandCount(numbers);
        let combo = getRepeatedCardCombos(handCount);
        
        //if found some combo with card repeated, no flush or straight needed to calc and return the output
        if (combo)
            return {
                'power': combo[0],
                'cards': combo[1],
                'hand': numbers,
            }

        let flush = getFlush(suits, numbers);        //check a flush    
        let straight = getStraight(numbers);         //check a straight

        //if found a flush or straight get the combo for the output   
        if (flush || straight)
            combo = getFiveCombo(flush, straight); // 

        if (combo)
            return {
                'power': combo[0],
                'cards': combo[1],
                'hand': numbers
            }
        //no combo: high card
        return {
            'power': 1,
            'cards': [numbers[4]],
            'hand': numbers
        }
    }
}