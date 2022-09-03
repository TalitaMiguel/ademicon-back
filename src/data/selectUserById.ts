import { connection } from "./connection";

export const selectUserById = async (id: string): Promise<any> => {
  return await connection("ademicon_users").select("*").where("id", id);
};
