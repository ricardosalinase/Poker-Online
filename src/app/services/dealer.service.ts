import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http,Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DealerService {

  baseUrl: string = "https://services.comparaonline.com/dealer/";
  constructor(private http:Http) { }
  deck: string;
  winnerDict:any =
  {
      1: 'Player 1 Wins',
      2: 'Player 2 Wins',
      0: 'It\'s a tie'
  }

  getGame(){
    return this.http.post('/api/game',{token:this.deck})
    .map(res => res.json())    
    .catch((err:Response) => {
      let details = err.json();
      return Observable.throw(details);
    });
  }
  getDeck(){
    
    let tryCount = 0;
    let query = `deck`;
    let url = this.baseUrl + query;
    
    return this.http.post(url,{})
      .map((res) => {
        this.deck = res.text();
        return res.text();
      })
     .catch((e) => {
       console.log('ERROR',e);
        const error = Observable.throw(
          new Error(`Failed after retrying ${tryCount} times`)
        );
        
        tryCount += 1;
        console.log(tryCount);
        
        return error;
      })
      .retry(10); 
  }
}
