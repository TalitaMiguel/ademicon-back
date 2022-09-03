import { connection } from "./connection";

export const selectAllUsers = async(): Promise<any> => {
    return await connection("ademicon_users").select("*")
}