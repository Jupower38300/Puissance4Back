import { Player } from './player';

export class Game {
  player1: Player;
  player2: Player;
  name: string;
  id: number;
  constructor(player1: Player, player2: Player, name: string, id: number) {
    this.player1 = player1;
    this.player2 = player2;
    this.name = name;
    this.id = id;
  }
}
