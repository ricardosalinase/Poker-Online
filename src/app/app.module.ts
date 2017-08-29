import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
// Imports commented out for brevity
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';
import { GameComponent } from './components/game/game.component';

import { PostsService } from './posts.service';
import { DealerService } from './services/dealer.service';

// Define the routes
const ROUTES = [
  {
    path: '',
    redirectTo: 'game',
    pathMatch: 'full'
  },
  {
    path: 'posts',
    component: PostsComponent
  },
  {
    path: 'game',
    component: GameComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    GameComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES) // Add routes to the app
  ],
  providers: [PostsService,DealerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
