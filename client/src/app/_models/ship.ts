import { User } from "./user"

export interface Ship {
    id: number
    numero: string
    nom: string
    anneeConstruction: number
    longueur: number
    largeur: number
    tonnageBrut: number
    tonnageNet: number
    createdAt: string
    userId: number
    user: User
  }