import { Request, Response } from "express";
import { POOL } from "../index";
import { Room } from "../models/room";
import { getId } from "./player-controller";

export async function getRooms(request: Request, response: Response) {
    //TODO à faire 
    try {
        const db = await POOL.getConnection();
        const [rows] = await db.query("SELECT id, name, player FROM room");
        response.json(rows);
    } catch (error: any) {
        console.error(error.message);
        response.status(500);
        response.send();
    }
}

export async function postRooms(req: Request, res: Response) {
    const json = req.body;
    try {
        const db = await POOL.getConnection();
        const playerId = await getId(json.namePlayer)
        const [rows]: any = await db.execute("SELECT name FROM room WHERE name = ?", [json.name]);
        if(rows.length == 0){
            const [result]: any = await db.execute("INSERT INTO room(name, player) VALUES (?,?)", [json.name, playerId]);
            const id = +result.insertId;
            const [resultat]: any = await db.query("SELECT * FROM room WHERE id = ?", [id]);
            res.send(resultat[0]);
        }else{
            res.send()
        }
        
    } catch (error: any) {
        console.error(error.message);
        res.status(500);
        res.send();
    }
}

export async function getIdRoom(name: string){
    const db = await POOL.getConnection();
    try {
      const [rows]: any = await db.query('SELECT id FROM room WHERE name = ?', [
        name,
      ]);
      if (rows.length > 0) {
        return rows[0].id;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Erreur lors de la récupération de l'ID de la salle:", error);
      throw error;
    }
}
// export async function patchRooms(req: Request, res: Response) {
//     const json = req.body;
//     try {
//         const db = await POOL.getConnection();
//         const [existingRoom] = await db.query("SELECT * FROM room WHERE id = ?", [id]);
//         if (existingRoom.length === 0) {
//             return res.status(404).json({ message: "Room not found" });
//         }
//     } catch (error: any) {
//         console.error(error.message);
//         res.status(500);
//         res.send();
//     }
// }