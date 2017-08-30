The Poker Online Project has the following structure:

1.0 Project main folders structure
Folders:
server
    | 
    routes-> Back-End Code for consume API-REST request and make the algorithms of poker
node_modules -> NodeJS Libraries dependences of the Project
dist -> The Front-End compiled code
test -> Back End test for validate next upgrades using mocha and chai testing tools
src -> Angular2 front end Code
    |
    app -> main app Components and services
    |   |
    |   components -> contains the game component for handle the poker client display (cards and some messages)
    |   services -> contain the dealer service for get the deck token for a client and communicate the front-end with the back-end server
    |
    assets -> contain the img of cards for display to the user


2. Brief Description of Poker-Algorithm:    

2.1 hand Strength calculation:

Input: A Json Object of Hand of 5 elements (requested by Poker Dealer Service)

The poker algorithm is my own creation and is based in my proper playing experience of poker(im appassionate of the game :) ).
First get the repeated number cards count and based on that check the corresponding 
combos with the card involved and return the corresponding strength(see below on the section).
If not found repeated cards try to get a straight or flush or both and return its corresponding strength.
If not found a high card hand returned with the less power and the max card is the involved

The output is handstrength: a JSONObject that consists in:
/*
handStr: {

        power: the strength of hand{0:10}
        cards: the card(s) which identify the combination (p.e: pairs of 10 = 10, two pairs of 8 and 10) =[8,10]
        hand: the numbers in hands sorted (internal usage in compare hands stage)
}*/

the strength of hands from numbers to words are:

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
    
2.2 Winning Hand Comparation Algorithm:

Input: two handStrength Object represent the strenght of each player hand

First criteria is the power of both handStrength, winning the most power.
If equal check the card involved in the combo, winning the most high.
If equal check the rest of the sorted hand and check one by one for a difference. The first highest card appeared, that hand wins.
If all are equals is a tie, nothing more to do.

2.3 Dealer Service 

Dealer service  You can reach the dealer service on this url: ​https://services.comparaonline.com/dealer/ (*)
The service can’t be changed​, so you might need to find workarounds for any issues you  might face.    
The service is designed to fail often​ (throw a 500 HTTP error), so you need to account for  that, 
the user experience should never be affected.    
Here you can find example calls to both endpoints:  https://gist.github.com/plataforma­co/57691938b63c3c29418a9bf5dca7b896  (won't work)
Using postman for make the calls.

POST /deck  Calling this method shuffles a new deck (52 cards). Decks expired after 5 minutes without being  used, so you should 
handle that possibility. It returns a 36 character token, plain text.    

GET /deck/{TOKEN}/deal/{AMOUNT}  This deals an {AMOUNT} of cards for the specified deck {TOKEN}. The result is a JSON array  
containing objects with ​“number” and “suit”  properties. “number” is a string that can be one of: 
A,  2, 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K. “suit” is also a string and can be either hearts, diamonds, clubs  or spades.  
If there aren’t enough cards to deal the amount requested, it will throw a 405 HTTP error.  
If the deck isn’t found (doesn’t exist, or expired) it will throw a 404 HTTP error.

3. Support and Mail:
All Question about development and functionality contact me :)
ricardo.salinase@gmail.com