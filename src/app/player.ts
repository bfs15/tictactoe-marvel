
export class Player {
	constructor(
	public name: string,
	public imageUrl?: string,
	public score: number = 0,
	public turn: number = -1,
	){

	}
}
