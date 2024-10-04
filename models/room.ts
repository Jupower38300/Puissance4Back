import { Game } from './game';
import { Player } from './player';

export class Room {
    id!: number;
    name!: string;
    players: Player[] = [];
}

