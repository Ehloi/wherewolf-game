interface Role {
  attributes: RoleAttributes;
  assigned: boolean;
}
enum RoleDescription {
  VILLAGER = `Aims to defeat Werewolves through voting. Has no special abilities.`,

  WEREWOLF = `Targets villagers. Votes at night to eliminate one. Must blend in during the day.`,

  TALKATIVE_WOLF = `A Werewolf that must say the word "Werewolf" daily to survive.`,

  BLACK_WOLF = `A Werewolf that can turn a chosen victim into another Werewolf once per game.`,

  SEER = `Aims to defeat Werewolves. Can identify if a player is a werewolf each night.`,

  DRUNK_VILLAGER = `A Villager who can't speak and communicates only through gestures. If he speaks, he dies.`,

  WITCH = `Can either save a Werewolf's victim or kill a player at night. Has 1 kill and 1 save potion. Can't use both in 1 round.`,

  LITTLE_GIRL = `Can spy on Werewolves at night, but risks getting caught.`,

  HUNTER = `Upon death, has the ability to kill another player.`,

  THE_RED_RIDING_HOOD = `Protected from Werewolves as long as the Hunter is alive.`,

  GUARD = `Can protect a player from Werewolves each night but not twice the same player in a row.`,

  CUPID = `Designates two lovers the first night. If one lover dies, so does the other.`,

  DICTATOR = `Can override village vote once. Becomes Mayor if successful, dies if not.`,
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
