import { Component, OnInit } from '@angular/core';
import { DealerService } from '../../services/dealer.service';
import 'rxjs/add/operator/catch';
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  token: string = "";
  errorMessage: string;
  disableDeal: boolean = true;
  player1Cards: any[];
  player2Cards: any[];
  winner: string;
  player1Combination: string;
  player2Combination: string;
  highCards: any =
  {
    'A': 'ace', 'J': 'jack', 'Q': 'queen', 'K': 'king'
  }
  winnerDict: any =
  {
    1: 'Player 1 Wins',
    2: 'Player 2 Wins',
    0: 'It\'s a tie'
  }
  result: string = "";

  constructor(private _DealerService: DealerService) { }

  ngOnInit() {
    this.shuffle();
  }
  //actions  buttons
  deal() {
    this._DealerService.getGame()
      .subscribe(
      res => this.setResult(res)
      ,
      err => {
        console.log(err);
        this.errorMessage = err.message;
        this.disableDeal = true
      })
  }
  shuffle() {
    this._DealerService.getDeck()
      .do(
      (data) => {
        console.log('repartimos ya', data);
        this.token = data;
      })
      .flatMap(data =>
        this._DealerService.getGame()
      ).subscribe(
      res => {
        this.errorMessage = "";
        this.setResult(res);
        this.disableDeal = false;
      },
      err => {
        this.errorMessage = err.message;
      }
      )
  }
  //utils
  setResult(res) {
    console.log('result', res);
    //this.gameWinner = JSON.stringify(res);
    this.player1Cards = this.parseCards(res.player1.hand);
    this.player2Cards = this.parseCards(res.player2.hand);
    this.player1Combination = this.parseCombination(res.player1.game, res.player1.cards);
    this.player2Combination = this.parseCombination(res.player2.game, res.player2.cards);
    this.winner = this.winnerDict[res.winner];
  }
  parseCards(cards: any[]) {
    let ret = []
    for (let card of cards) {
      let cardName = this.highCards[card.number] ? this.highCards[card.number] : card.number
      cardName += '_of_' + card.suit + '.png';
      ret.push(cardName);
    }
    return ret;
  }
  parseCombination(game: string, cards: any[]) {
    if (cards.length == 1) {
      return `${game} of ${cards[0]}`;
    }
    else if (cards.length == 2) {
      return `${game} of ${cards[0]} and ${cards[1]}`
    }
    else return game;
  }
  isDisabledDeal() {
    return this.disableDeal;
  }



}
