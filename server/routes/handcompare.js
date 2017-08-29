const pokerUtils = require('./utils') 
module.exports = {
    
    getWinner: function (strP1, strP2) {

        //first criteria the strength of hand
        if (strP1.power != strP2.power)
            return strP1.power > strP2.power ? 1 : 2;

        //second the card of the combination (strength are equals,
        // so we have the same structure of the cards)

        if (strP1.cards != strP2.cards) {
            //one card(high,pair,three,four,flush,straight,straight flush)
            if (strP1.cards.length == 1 && strP2.cards.length == 1) {
                if (pokerUtils.order.indexOf(strP1.cards[0]) != pokerUtils.order.indexOf(strP2.cards[0]))
                    return pokerUtils.order.indexOf(strP1.cards[0]) > pokerUtils.order.indexOf(strP2.cards[0]) ? 1 : 2;
            }
            //two cards(two pairs, full house)
            if (strP1.cards.length == 2 && strP2.cards.length == 2) {
                if (strP1.cards[0] != strP2.cards[0])
                    return pokerUtils.order.indexOf(strP1.cards[0]) > pokerUtils.order.indexOf(strP2.cards[0]) ? 1 : 2;
                else if (strP1.card[1] != strP2.card[1])
                    return pokerUtils.order.indexOf(strP1.cards[1]) > pokerUtils.order.indexOf(strP2.cards[1]) ? 1 : 2;
            }
        }
        //if still draw:: check the hand and compare each number individually
        //todo:(probably optimized with only the rest of hand)
        for (i = 4; i >= 0; i--) {
            if (pokerUtils.order.indexOf(strP1.hand[i]) != pokerUtils.order.indexOf(strP2.hand[i]))
                return pokerUtils.order.indexOf(strP1.hand[i]) > pokerUtils.order.indexOf(strP2.hand[i]) ? 1 : 2;
        }
        //no more criterias return draw:
        return 0;
    }
}