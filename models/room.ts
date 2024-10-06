export class Room {
    id!: number;
    name: string;
    current_player_id!: number;
    constructor(id: number, name: string, current_player_id: number){
        this.id = id;
        this.name = name;
        this.current_player_id = current_player_id;
    }
}

