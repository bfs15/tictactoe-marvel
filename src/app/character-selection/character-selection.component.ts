import { CharacterService } from './../character.service';
import { Player } from './../player';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NgForm } from '@angular/forms';

export interface SelectedCharacter {
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
  private validCharacters_: string[][] = [[], []];

  private players_: Player[];
  // time for last keypress on any of the forms
  private lastKeypressTime_: number = -1;
  // interval to update autocomplete (API calls )
  private readonly autocompleteInterval_: number = 2000;
  private nameError_: string[];

  constructor(private characterService: CharacterService) { }

  // fill arrays according to @Input() playerNo
  ngOnInit() {
    this.players_ = new Array<Player>(this.playerNo);
    for (let i = 0; i < this.players_.length; i++) {
      this.players_[i] = new Player("");
    }
    this.isValidCharacterSelected_ = new Array<boolean>(this.playerNo).fill(false);
    this.nameError_ = new Array<string>(this.playerNo).fill("");
  }

  // updates autocomplete, only happens at most in a this.autocompleteInterval_
  // handles updates on last character the user inputs, waits until interval is satisfied
  onInputName($event, playerNo){
    let characterName = $event.target.value;
    // time since last event
    let elapsedTime = $event.timeStamp - this.lastKeypressTime_;

    // if time sice last event is bigger than interval, update
    if (elapsedTime > this.autocompleteInterval_){
      this.updateAutocomplete(playerNo, characterName);
    } else {
      // this could be the users last input for some time
      // let's check if thats the case after the interval has passed
      // remaining time for when you can update autocomplete again, according to autocompleteInterval_
      let remainingTime = this.autocompleteInterval_ - (elapsedTime);
      // execute code after this remainingTime
      setTimeout(() => {
          // if after some time, the lastKeypressTime_ is the same still,  update
          // this was the users' last character pressed
          if ($event.timeStamp == this.lastKeypressTime_) {
            this.updateAutocomplete(playerNo, characterName);
          }
        },
        // see if this was last event sent after the remaining time for the interval
        remainingTime
      )
    }

    // update timestamp
    this.lastKeypressTime_ = $event.timeStamp;
  }

  // makes request to service to return character names that start with 'characterName'
  updateAutocomplete(playerNo, characterName: string) {
    this.characterService.getNameStartsWith(characterName).subscribe(characterNameList =>
      this.validCharacters_[playerNo] = characterNameList);
  }
  
  // when user tries to confirm his selection
  onSubmit(form, playerNo: number) {
    let characterName = form.value.name;
    this.characterService.getByName(characterName).subscribe(
      (player) => {
        let character: SelectedCharacter = { index: playerNo, player: player };
        // emit character to let parent know
        this.playerSelectedEvent.emit(character);
        this.isValidCharacterSelected_[playerNo] = true;
        // clear error if user selects a valid character
        this.nameError_[playerNo] = "";
      },
      (error) => {
        // set error for user, this should be displayed in the template
        this.nameError_[playerNo] = error
      }
    );
  }
  
  // to display errors
  get nameError(){
    return this.nameError_;
  }
  // to display selection
  get players(){
    return this.players_;
  }
  // to autocomplete
  get validCharacters(){
    return this.validCharacters_;
  }
}
