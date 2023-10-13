interface Role {
  attributes: RoleAttributes;
  assigned: boolean;
}
// const CommonRoles = ["WEREWOLF", "TALKATIVE_WOLF", "BLACK_WOLF", "SEER", "DRUNK_VILLAGER", "WITCH", "LITTLE_GIRL", "HUNTER", "THE_RED_RIDING_HOOD", "GUARD", "CUPID", "DICTATOR"] as const;
// type CommonRole = typeof CommonRoles[number];
enum RoleDescription {
  VILLAGER = `
  Their objective is to defeat the Werewolves. His word is his only power of persuasion to eliminate them. Stay alert for hints, and identify the culprits.
  
  In the case of an equality during the daily vote and if no mayor is elected, no player dies.
  The votes of the Villagers can be decisive in the fight against the Werewolves.
`,
  WEREWOLF = `
  Defeating the villagers is their objective. During that night, the Werewolves join together and vote on who should be eliminated. During the day, they cannot be unmasked.
  
  The Werewolves are called once per night. They can discuss with other Wolves during their voting phase.
  If the vote leads to a tie, a player dies randomly among those who were targeted in the tie.
  No player will die if the Wolves don't target anyone.
  `,
  TALKATIVE_WOLF = `
  Defeating the Villagers is his objective. Every day, he needs to say the word "Werewolf" before the sun sets, if he wishes to stay alive.
  
  The Talkative Wolf is a Werewolf with an extra constraint.
  He dies at the end of the day if he has not said his word.
  `,
  BLACK_WOLF = `
  Defeating the villagers is his objective. During the night, he wakes up with all the other wolves. Once during the game, he can turn the chosen victim into a Werewolf.    This is a challenge, because everyone playing will need to actively avoid saying the word “Werewolf” in an attempt to root out the Alpha Werewolf, who must say it at least once.

  The Black Wolf is a Werewolf with a supplementary power.
  Once the victim has been chosen by the Werewolves, the Black Wolf has the possibility not to kill that person and to turn him into a Werewolf.
  The infected player keeps his original role and powers, and adds the Werewolf's characteristics: he wakes up at night with the other wolves to vote, and wins the game by eliminating the entirety of the village.
  The Seer cannot know that a person has been infected, which makes that player harder to identify and thus stronger.
  However, the Mentalist and the Gravedigger take in account his wolf identity via their powers.
  If at sunrise, it has not been proposed to the Black Wolf to infect a player even if no player has been infected yet, then the players can then conclude that there was no vote on the wolves' part, the Guard protected the Wolves' target, or the Red Riding Hood was the target.    
    `,
  SEER = `
  Her goal is to defeat the werewolves. Each night, she can learn the role of a player she has chosen. She must help the villagers without being found out.
  Use your power each night by clicking on the player of your choice to find out their role.
  `,
  DRUNK_VILLAGER = `
  Defeating the Werewolves is his objective. He can't talk. He can only communicate with gestures or noises.

  This role, while first and foremost taking on all the elements of a regular Villager throughout the game, also has the additional burden of only being able to communicate with gestures or noises.
  They may not talk during the day at all, and if they do, automatically die during that night.
  It may be the strategy of others (Werewolves, for instance) to pretend to be the Drunk, as the role is so unique and easily recognized.
    `,
  WITCH = `
  The Witch's objective is to defeat the Werewolves. The Witch wakes up every night and can use one of her two potion : save the Werewolves victim, or kill another player.

  The Witch can only use one potion every night. She can choose to do nothing.
  She only has one of each potion.
  Her potion overrides the Guard's protection.
    `,
  LITTLE_GIRL = `
  Defeating the Werewolves is her objective. She can spy on the werewolfs.

  She can spy on the Werewolves at night, but she must be careful not to be caught by them.
    `,
  HUNTER = `
  Defeating the Werewolves is his objective. His role has a direct impact on the village. When the Hunter dies he has the power to bring another player with him in his grave.

  The Hunter has the possibility to not kill a player when he dies if he finds that to be strategic.
    `,
  THE_RED_RIDING_HOOD = `
  Her goal is to defeat the Werewolves. As long as the Hunter is alive, she is protected from Werewolf attacks.

  When the wolves target the Red Riding Hood while the Hunter is alive, their vote is not taken into account.
  If the Hunter dies, then the Red Riding Hood becomes similar to a Villager.
      `,
  GUARD = `
  His objective is to defeat the Werewolves. Every night, he can protect a different player against the Werewolves' attacks.
  
  The Guard cannot protect the same person twice in a row
  He can protect himself.
  The protected player is still vulnerable to other attacks, such as the Witch's death potion.
    `,
  CUPID = `
  Defeating the Werewolves is his objective. The first night, he designate two lovers. If one of them dies, the other will follow them to their grave.
  
  Cupid only has the power to designate the two lovers. Once they've been named, he becomes similar to a Simple Villager.
  He can auto-designate himself as a lover.
  The two lovers can be in different party's. If a Wolf is coupled with a Villager, then they need to eliminate all the players to win the game.
  The two lovers can discuss at any moment through a private chat that you can activate via the button on the left of where you write messages.
  Copying the text indicating the information on your couple in the chat is considered as unfair gameplay.
    `,
  DICTATOR = `
  His objective is to defeat the Werewolves. He can take over the voting power of the village once in the game. If he executes a Werewolf, he becomes Mayor, otherwise he dies.

  After deciding to take revolution, the Dictator takes the vote at dawn.
  If he has targeted a Wolf and a Mayor is already elected, he becomes Mayor, if he has targeted a Villager, he dies.
  The Talkative Wolf does not need to place his word during the day if the Dictator takes power.
    `,
}
enum RoleName {
  VILLAGER = "Villager",
  WEREWOLF = "Werewolf",
  TALKATIVE_WOLF = "Talkative Wolf",
  BLACK_WOLF = "Black Wolf",
  SEER = "Seer",
  DRUNK_VILLAGER = "Drunk Villager",
  WITCH = "Witch",
  LITTLE_GIRL = "Little Girl",
  HUNTER = "Hunter",
  THE_RED_RIDING_HOOD = "The Red Riding Hood",
  GUARD = "Guard",
  CUPID = "Cupid",
  DICTATOR = "Dictator",
}

enum RoleIcon {
  VILLAGER = "https://i.ibb.co/cC5Wz5R/simplevillageoiswolfy-14kfm20.png",
  WEREWOLF = "https://i.ibb.co/McjvZbk/loupgarouwolfy-1q2yt0l.png",
  TALKATIVE_WOLF = "https://i.ibb.co/8jWTf02/loupbavardwolfy-160fj45.png",
  BLACK_WOLF = "https://i.ibb.co/Cttchbx/loupnoirwolfy-1jid6t4.png",
  SEER = "https://i.ibb.co/xGPkRYT/voyantewolfy-r9i9b2.png",
  DRUNK_VILLAGER = "https://i.ibb.co/cC5Wz5R/simplevillageoiswolfy-14kfm20.png",
  WITCH = "https://i.ibb.co/ZGhbKhX/sorcierewolfy-lu5487.png",
  LITTLE_GIRL = "https://i.ibb.co/CmfpQ9s/petitefillewolfy-8w42ho.png",
  HUNTER = "https://i.ibb.co/yydjxxn/chasseurwolfy-1d4e0kt.png",
  THE_RED_RIDING_HOOD = "https://i.ibb.co/NrqDXn7/chaperonrougewolfy-1s6yknu.png",
  GUARD = "https://i.ibb.co/N1pRBcL/gardewolfy-14hin1n.png",
  CUPID = "https://i.ibb.co/98jSWH0/cupidonwolfy-hg78vy.png",
  DICTATOR = "https://i.ibb.co/rw0C5nP/dictateurwolfy-y2x954.png",
}
class RoleAttributes {
  private constructor(public readonly name: RoleName, public readonly description: RoleDescription, public isGood: boolean, public readonly isUnique: boolean, public readonly iconUrl: RoleIcon) {}

  static readonly VILLAGER: RoleAttributes = { name: RoleName.VILLAGER, description: RoleDescription.VILLAGER, isGood: true, isUnique: false, iconUrl: RoleIcon.VILLAGER };
  static readonly WEREWOLF: RoleAttributes = { name: RoleName.WEREWOLF, description: RoleDescription.WEREWOLF, isGood: false, isUnique: false, iconUrl: RoleIcon.WEREWOLF };
  static readonly TALKATIVE_WOLF: RoleAttributes = { name: RoleName.TALKATIVE_WOLF, description: RoleDescription.TALKATIVE_WOLF, isGood: false, isUnique: true, iconUrl: RoleIcon.TALKATIVE_WOLF };
  static readonly BLACK_WOLF: RoleAttributes = { name: RoleName.BLACK_WOLF, description: RoleDescription.BLACK_WOLF, isGood: false, isUnique: true, iconUrl: RoleIcon.BLACK_WOLF };
  static readonly SEER: RoleAttributes = { name: RoleName.SEER, description: RoleDescription.SEER, isGood: true, isUnique: true, iconUrl: RoleIcon.SEER };
  static readonly DRUNK_VILLAGER: RoleAttributes = { name: RoleName.DRUNK_VILLAGER, description: RoleDescription.DRUNK_VILLAGER, isGood: true, isUnique: true, iconUrl: RoleIcon.DRUNK_VILLAGER };
  static readonly WITCH: RoleAttributes = { name: RoleName.WITCH, description: RoleDescription.WITCH, isGood: true, isUnique: true, iconUrl: RoleIcon.WITCH };
  static readonly LITTLE_GIRL: RoleAttributes = { name: RoleName.LITTLE_GIRL, description: RoleDescription.LITTLE_GIRL, isGood: true, isUnique: true, iconUrl: RoleIcon.LITTLE_GIRL };
  static readonly HUNTER: RoleAttributes = { name: RoleName.HUNTER, description: RoleDescription.HUNTER, isGood: true, isUnique: true, iconUrl: RoleIcon.HUNTER };
  static readonly THE_RED_RIDING_HOOD: RoleAttributes = {
    name: RoleName.THE_RED_RIDING_HOOD,
    description: RoleDescription.THE_RED_RIDING_HOOD,
    isGood: true,
    isUnique: true,
    iconUrl: RoleIcon.THE_RED_RIDING_HOOD,
  };
  static readonly GUARD: RoleAttributes = { name: RoleName.GUARD, description: RoleDescription.GUARD, isGood: true, isUnique: true, iconUrl: RoleIcon.GUARD };
  static readonly CUPID: RoleAttributes = { name: RoleName.CUPID, description: RoleDescription.CUPID, isGood: true, isUnique: true, iconUrl: RoleIcon.CUPID };
  static readonly DICTATOR: RoleAttributes = { name: RoleName.DICTATOR, description: RoleDescription.DICTATOR, isGood: true, isUnique: true, iconUrl: RoleIcon.DICTATOR };
}

export { RoleName, RoleDescription, RoleAttributes, RoleIcon };
export type { Role };
