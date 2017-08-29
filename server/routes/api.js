const express = require('express');
const poker = require('./game');   
const axios = require('axios')
const axiosRetry = require('axios-retry'); 

const router = express.Router();
axiosRetry(axios, { retries: 10 });
//when user click the button for play again::

const API = 'https://services.comparaonline.com/dealer/deck';
router.get('/', (req, res) => {
  console.log('welcome message');
  res.send('Poker Game') 
});

//append token get
router.post('/game',(req,res) =>{
  console.log('start game with deck',req.body.token);
  axios.get(`${API}/${req.body.token}/deal/10`, {
  })//success response, start a game
  .then(cards => {
     
    let dealedCards = cards.data;
    let p1Cards = dealedCards.slice(0,5);
    let p2Cards = dealedCards.slice(5,10);

    var ret =  poker.startGame(p1Cards,p2Cards);
    res.send(ret);
  })//error response with 405 or 404 send to client
  .catch(error => {
    res.status(error.response.status).send(error.response.data);
  })
})

module.exports = router;