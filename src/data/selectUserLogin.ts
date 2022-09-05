import { connection } from "./connection";

export const selectUserLogin = async (
  email: string,
  password: string
): Promise<any> => {
  return await connection("ademicon_users")
    .select("*")
    .where("email_user", email)
    .andWhere("password_user", password);
};
