import { Request, Response } from 'express';
import { Game } from '../models/game';
const GAMES: Game[] = [];

export function getGames(req: Request, res: Response) {
  res.send(GAMES);
}

export function createGame(req: Request, res: Response) {
  const json = req.body;

  const game = new Game(
    json.player1.name,
    json.player2.name,
    json.name,
    json.id
  );
  GAMES.push(game);

  res.send();
}
