import { User } from "../types/user";
import { connection } from "./connection";

export const createUser = async (newUser: User): Promise<any> => {
  try {
    return await connection("ademicon_users").insert({
      name_user: newUser.name_user,
      email_user: newUser.email_user,
      password_user: newUser.password_user,
    });
  } catch (error) {
    return null
  }
};
