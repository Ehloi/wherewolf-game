interface Role {
    roleAttributes: RoleAttributes;
    assigned: boolean;
}
enum RoleDescription {
    CITIZEN = "You're useless basically",
    WEREWOLF = "Of course, the werewolf needs to act as sneakily and stealthily as possible. This is where strategy comes into play. Your goal is to deflect or deter villagers\' suspicions. For example, choose random villagers, and avoid victims that might be an obvious choice for you. Furthermore, during daytime deliberation, try to make the villagers believe you are one of them.",
    SEER = "Idrk",
    DOCTOR = "Healing abilities",
}
enum RoleName {
    CITIZEN = "Citizen",
    WEREWOLF = "Werewolf",
    SEER = "Seer",
    DOCTOR = "Doctor",
}
class RoleAttributes{
    private constructor(public readonly roleName: RoleName, public readonly roleDescription: RoleDescription, public readonly isGood: boolean, public readonly isUnique: boolean){
    }
    static readonly CITIZEN: RoleAttributes = {roleName:RoleName.CITIZEN, roleDescription:RoleDescription.CITIZEN, isGood: true, isUnique: false};
    static readonly WEREWOLF: RoleAttributes = {roleName:RoleName.WEREWOLF, roleDescription:RoleDescription.WEREWOLF, isGood: false, isUnique: false};
    static readonly SEER: RoleAttributes = {roleName:RoleName.SEER, roleDescription:RoleDescription.SEER, isGood: true, isUnique: false};
    static readonly DOCTOR: RoleAttributes = {roleName:RoleName.DOCTOR, roleDescription:RoleDescription.DOCTOR, isGood: false, isUnique: false};
}

export { RoleName, RoleDescription, RoleAttributes };
export type { Role };