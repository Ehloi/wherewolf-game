import {Role} from './Role';
interface Player {
    id: string;
    name: string;
    playerType: PlayerType;
    role: Role | null;
}
enum PlayerType{
    PLAYER = "Player",
    NARRATOR = "Narrator",
}
export {PlayerType }
export type { Player };