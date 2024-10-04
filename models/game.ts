import { Player } from './player';

export class Game {
  players: Player[];
  name: string;
  id: number;
  constructor(players: Player[], name: string, id: number) {
    this.players = players;
    this.name = name;
    this.id = id;
  }
}
