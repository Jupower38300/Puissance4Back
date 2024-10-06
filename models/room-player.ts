export class Room_Player {
  id!: number;
  room_id: number;
  score: number;
  position: number;
  constructor(id:number, room_id: number, score: number, position: number) {
    this.id = id;
    this.room_id = room_id;
    this.score = score;
    this.position = position;
  }
}
