/** possible endgames.
 * when board is not at endgame, 'EndgameType.none' is used */
export enum EndgameType {
  none = 0,
  win = 1,
  draw = 2,
}

/** returns whether the endgameType is of an actual end of the game */
export let isEndgame = (endgameType: EndgameType): boolean => {
  /** adsdadsd */
  return endgameType != EndgameType.none;
}

/** full information about endgame board status */
export interface EndgameStatus {
  /** type of endgame */
  type: EndgameType,  
  /** which player won.
   *  id 0 is the first player, 1 is the second and so on */
  playerId?: number,
}
