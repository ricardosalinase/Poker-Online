import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
// Imports commented out for brevity
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { GameComponent } from './components/game/game.component';

import { DealerService } from './services/dealer.service';

// Define the routes
const ROUTES = [
  {
    path: '',
    redirectTo: 'game',
    pathMatch: 'full'
  },
  {
    path: 'game',
    component: GameComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    GameComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES) // Add routes to the app
  ],
  providers: [DealerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
