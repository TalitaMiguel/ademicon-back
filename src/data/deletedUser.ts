import { connection } from "./connection";

export const deletedUser = async (id: string): Promise<any> => {
  return await connection("ademicon_users").where("id", id).del();
};
