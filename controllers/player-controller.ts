import { Request, Response } from 'express';
import { POOL } from '..';

export async function signUp(request: Request, response: Response) {
  try {
    const json = request.body;
    if (json.name !== '') {
      const db = await POOL.getConnection();
      const [existingUser]: any = await db.query(
        'SELECT * FROM player WHERE name = ?',
        [json.name]
      );
      if (existingUser.length > 0) {
        response
          .status(400)
          .json({ error: `Le pseudo ${json.name} existe déjà.` });
        return;
      }
      const rows = db.query('INSERT INTO player(name) VALUES (?)', [json.name]);
      response.send();
    } else {
      response.status(400).json({ error: `Aucun pseudo.` });
      return;
    }
  } catch (err: any) {
    console.error(err.message);
    response.status(500);
    response.send();
  }
}
export async function signIn(request: Request, response: Response) {
  try {
    const json = request.body;
    const db = await POOL.getConnection();
    const [existingUser]: any = await db.query(
      'SELECT name FROM player WHERE name = ?',
      [json.name]
    );
    if (existingUser.length > 0) {
      response.send(true);
    } else {
      response.send(false);
    }
  } catch (err: any) {
    console.error(err.message);
    response.status(500);
    response.send();
  }
}
export async function getId(name: string): Promise<number | null> {
  const db = await POOL.getConnection();
  try {
    const [rows]: any = await db.query('SELECT id FROM player WHERE name = ?', [
      name,
    ]);
    if (rows.length > 0) {
      return rows[0].id;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Erreur lors de la récupération de l'ID du joueur:", error);
    throw error;
  }
}
