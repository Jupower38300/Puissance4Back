import { Request, Response } from 'express';
import { POOL } from '..';
import { getIdRoom } from './room-controller';
import { getId } from './player-controller';

export async function joinRoom(req: Request, res: Response) {
  try {
    const json = req.body;
    const db = await POOL.getConnection();
    const idRoom = await getIdRoom(json.nameRoom);
    const idPlayer = await getId(json.namePlayer);
    const [sizeRoom]: any = await db.execute(
      'SELECT id FROM room_player WHERE room_id = ?',
      [idRoom]
    );
    const [roomPlayer]: any = await db.execute(
      'SELECT player_id FROM room_player WHERE player_id = ? AND room_id = ?',
      [idPlayer, idRoom]
    );
    if (roomPlayer == 0) {
      if (sizeRoom.length == 0) {
        const row: any = db.execute(
          'INSERT INTO room_player(room_id, player_id, score, position) VALUES (?,?,?,?)',
          [idRoom, idPlayer, 0, 0]
        );
        res.send(row);
      } else if (sizeRoom.length == 1) {
        const row: any = db.execute(
          'INSERT INTO room_player(room_id, player_id, score, position) VALUES (?,?,?,?)',
          [idRoom, idPlayer, 0, 1]
        );
        res.send(row);
      } else {
        console.log("La room est complète ou n'existe pas.");
        res.send();
      }
    } else {
      console.log('Le joueur est deja dans la salle');
    }
  } catch (err) {
    console.error(err);
    res.status(400);
    res.send();
  }
}
