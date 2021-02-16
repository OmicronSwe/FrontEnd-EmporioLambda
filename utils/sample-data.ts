import { User } from "../interfaces"
import { Lambda } from "../interfaces"

/** Dummy user data. */
export const sampleUserData: User[] = [
  { id: 101, name: "Alice" },
  { id: 102, name: "Bob" },
  { id: 103, name: "Caroline" },
  { id: 104, name: "Dave" },
]

/** Dummy product data. */
export const sampleProductData: Product[] = [
{ id : 1, nome : "Pacchetto 10 Viti", prezzo : 5, disponibilita : 10, descrizione : "Belle ste viti" }, 
{ id : 2, nome : "Mela", prezzo : 0.50, disponibilita : 50, descrizione : "Buone ste mele" }
]

/** Dummy user data. */
export const sampleLambdaData: Lambda[] = [{ funName: "hello", message: "qual è il messaggio?" }]
