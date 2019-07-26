import { Player } from './../player';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  players: Player[] = undefined;

  constructor() { }

  ngOnInit() {
  }

  onEndgameEvent(event){
    console.log(event);
  }

}
