import { CharacterService } from './../character.service';
import { Player } from './../player';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NgForm } from '@angular/forms';

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

  constructor(private characterService: CharacterService) { }

  // fill arrays according to Input playerNo
  ngOnInit() {
    this.players_ = new Array<Player>(this.playerNo);
    for (let i = 0; i < this.players_.length; i++) {
      this.players_[i] = new Player("");
    }
    this.isValidCharacterSelected_ = new Array<boolean>(this.playerNo).fill(false);
  }

  onKeydown($event, playerNo){
    // TODO: update this.validCharacters_ list for autocomplete
    // let characterName = $event.target.value;
  }
  
  onSubmit(form, playerNo: number) {
    let characterName = form.value.name;
    this.characterService.getByName(characterName).subscribe((player) => {
      let character: SelectedCharacter = { index: playerNo, player: player };
      this.playerSelectedEvent.emit(character);
      this.isValidCharacterSelected_[playerNo] = true;
      // TODO: handle error
    });
  }

  get players(){
    return this.players_;
  }

  get validCharacters(){
    return this.validCharacters_;
  }
}
