import { Request, Response } from "express";
import { POOL } from "../index";

export async function getRooms(request: Request, response: Response) {
    //TODO à faire 
    try {
        const db = await POOL.getConnection();
        const [rows, fields] = await db.query("SELECT * FROM room");
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
        const [result]: any = await db.execute("INSERT INTO room(name, player) VALUES (?,?)", [json.name, json.player]);
        const id = result.insertId;
        res.send();
    } catch (error: any) {
        console.error(error.message);
        res.status(500);
        res.send();
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