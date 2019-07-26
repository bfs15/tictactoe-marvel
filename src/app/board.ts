// possible endgames
export enum EndgameType {
  none = 0,
  win = 1,
  draw = 2,
}
// when board is not at endgame, 'EndgameType.none' is used
export let isEndgameType = (endgameType: EndgameType): boolean => {
  return endgameType != EndgameType.none;
}

// full information about endgame board status
export interface EndgameStatus {
  type: EndgameType,  // type of endgame
  playerId?: number, // which player won
  // id 0 is the first player, 1 is the second and so on
}
