import { Request, Response } from "express";
import { Game } from '../models/game';
import { Player } from "../models/player";

const GAMES: Game[] = [];

export function createGame(req: Request, res: Response) {
    const json = req.body;

    const game = new Game();

    game.id = 1 + Math.max(0, ...GAMES.map(game => game.id));
    game.name = json.name;
    game.player1 = json.player1;
    game.player2 = json.player2;

    GAMES.push(game);

    res.send();
}

export function getGames(req: Request, res: Response) {
    res.send(GAMES);
}