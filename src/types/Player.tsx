import { Role } from "./Role";
interface Player {
    id: string;
    name: string;
    playerType: PlayerType;
    role: Role | null;
    isAlive?: boolean;
}
enum PlayerType{
    PLAYER = "Player",
    NARRATOR = "Narrator",
}
export { PlayerType }
export type { Player };