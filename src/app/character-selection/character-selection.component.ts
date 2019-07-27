import { Player } from './../player';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

interface SelectedCharacter {
  index: number,
  player: Player,
}

// component allow users to select characters
// emits event with SelectedCharacter
@Component({
  selector: 'app-character-selection',
  templateUrl: './character-selection.component.html',
  styleUrls: ['./character-selection.component.css']
})
export class CharacterSelectionComponent implements OnInit {
  // emits event when character is selected
  @Output() playerSelectedEvent = new EventEmitter<SelectedCharacter>();
  // if the character user selected is valid right now
  private isValidCharacterSelected_: boolean[];
  // number of players to select
  @Input() playerNo: number;
  // number of players to select
  private validCharacters_: string[][] = [["Spider", "Thanos", "Satella"], ["Subaru", "Felt", "Emilia"]];

  private players_: Player[];

  constructor() { }

  // fill arrays according to Input playerNo
  ngOnInit() {
    this.players_ = new Array<Player>(this.playerNo);
    for (let i = 0; i < this.players_.length; i++) {
      this.players_[i] = new Player("");
    }
    this.isValidCharacterSelected_ = new Array<boolean>(this.playerNo).fill(false);
  }

  onKeydown($event, playerNo){
    let characterName = $event.target.value;
    this.validateCharacter(playerNo, characterName);
    if (this.isValidCharacterSelected_[playerNo]){
      this.players_[playerNo].name = characterName;
      // TODO: get character url
    }
  }

  onConfirmSelection($event, playerNo: number) {
    let character: SelectedCharacter = { index: playerNo, player: this.players_[playerNo] };
    this.playerSelectedEvent.emit(character);
  }

  validateCharacter(playerNo: number, characterName: string){
    // TODO: validate character
    this.isValidCharacterSelected_[playerNo] = true;
  }

  get isValidCharacterSelected(){
    return this.isValidCharacterSelected_;
  }

  get players(){
    return this.players_;
  }

  get validCharacters(){
    return this.validCharacters_;
  }
}
