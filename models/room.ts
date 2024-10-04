import { Game } from './game';
import { Player } from './player';

export class Room {
    readonly id!: number;
    name!: string;
    players: Player[] = [];
}

