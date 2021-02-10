import { User } from "../interfaces"
import { Lambda } from "../interfaces"

/** Dummy user data. */
export const sampleUserData: User[] = [
  { id: 101, name: "Alice" },
  { id: 102, name: "Bob" },
  { id: 103, name: "Caroline" },
  { id: 104, name: "Dave" },
]

/** Dummy user data. */
export const sampleLambdaData: Lambda[] = [{ funName: "hello", message: "qual è il messaggio?" }]
