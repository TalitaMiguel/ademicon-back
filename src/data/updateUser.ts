import { User } from "../types/user";
import { connection } from "./connection";

export const updateUser = async (
  updateUser: User,
  id: string
): Promise<any> => {
  try {
    return await connection("ademicon_users")
      .update({
        name_user: updateUser.name_user,
        email_user: updateUser.email_user,
        password_user: updateUser.password_user,
      })
      .where("id", id);
  } catch (error) {
    return null
  }
};
