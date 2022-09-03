import { connection } from "./connection";

export const selectUserLogin = async (
  name: string,
  password: string
): Promise<any> => {
  return await connection("ademicon_users")
    .select("*")
    .where("name_user", name)
    .andWhere("password_user", password);
};
