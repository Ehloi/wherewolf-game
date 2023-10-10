interface Role {
    roleType: RoleName;
    description: string;
    isGood: boolean;
    isUnique: boolean;
}
enum RoleName {
    CITIZEN = "Citizen",
    WEREWOLF = "Werewolf",
    SEER = "Seer",
    DOCTOR = "Doctor",
}
export { RoleName }
export type { Role };