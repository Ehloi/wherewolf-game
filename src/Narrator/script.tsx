import { Player } from "../types/Player";
import { Role, RoleName } from "../types/Role";
export function narratorScript(players: Player[]): string[] {
  let res: string[] = [];
  let alivePlayers = players.filter((player) => player.isAlive);
  let aliveRoles = alivePlayers.map((alivePlayer) => alivePlayer.role?.attributes.name);

  if (aliveRoles.includes(RoleName.CUPID)) res.push("#Round 1 only# Cupid wakes up, shoots his arrow by designating two players to fall in love. \n");

  if (aliveRoles.includes(RoleName.DICTATOR)) res.push("#When there is a mayor only# Dictator wakes up and nod his head to say if he want to commit a putch.");

  if (aliveRoles.includes(RoleName.SEER)) res.push("Seer wakes up and decides who to check. (you nod your head to say if they are werewolf) \n");

  if (aliveRoles.includes(RoleName.GUARD)) res.push("Guard wakes up and decides who to protect.(can't be the same person as last round)\n");

  if (aliveRoles.includes(RoleName.WEREWOLF)) res.push("Werewolves wake up and decide who to kill. \n");

  if (aliveRoles.includes(RoleName.WITCH))
    res.push("#If she still have at least 1 potion# Witch wakes up and decides whether to use her potions. (Heal/Kill, she has only one potion of each, can't use both in 1 round) \n");

  if (aliveRoles.includes(RoleName.BLACK_WOLF)) res.push("#If he hasn't infected already# The black wolf wakes up and decide weather to infect the targeted player. \n");

  return res;
}
